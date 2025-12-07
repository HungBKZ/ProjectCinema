const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const Seat = require('../models/Seat');
const Booking = require('../models/Booking');

// @route   GET /api/seats
// @desc    Get all seats with their status
// @access  Public
router.get('/', async (req, res) => {
  try {
    // Clean up expired reservations first
    await Seat.updateMany(
      {
        isReserved: true,
        reservationExpiry: { $lt: new Date() }
      },
      {
        $set: {
          isReserved: false,
          reservedBy: null,
          reservationExpiry: null
        }
      }
    );

    const seats = await Seat.find().select('-__v');
    res.json(seats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/seats/reserve
// @desc    Reserve seats for 10 minutes
// @access  Private
router.post('/reserve', auth, async (req, res) => {
  try {
    const { seatIds } = req.body;

    if (!seatIds || seatIds.length === 0) {
      return res.status(400).json({ message: 'Vui lòng chọn ít nhất 1 ghế' });
    }

    // Check for gaps (empty seats between selected seats in same row)
    const seats = await Seat.find({ seatId: { $in: seatIds } });
    const seatsByRow = {};
    
    seats.forEach(seat => {
      if (!seatsByRow[seat.row]) {
        seatsByRow[seat.row] = [];
      }
      seatsByRow[seat.row].push(seat.number);
    });

    // Check for gaps in each row
    for (const row in seatsByRow) {
      const numbers = seatsByRow[row].sort((a, b) => a - b);
      for (let i = 0; i < numbers.length - 1; i++) {
        if (numbers[i + 1] - numbers[i] > 1) {
          // Check if seats between are available
          const gapSeats = await Seat.find({
            row: row,
            number: { $gt: numbers[i], $lt: numbers[i + 1] },
            $or: [{ isBooked: false }, { isBooked: { $exists: false } }]
          });
          
          if (gapSeats.length > 0) {
            return res.status(400).json({ 
              message: 'Không thể để trống ghế giữa các ghế đã chọn trong cùng một hàng' 
            });
          }
        }
      }
    }

    // Check if seats are available
    const availableSeats = await Seat.find({
      seatId: { $in: seatIds },
      isBooked: false,
      $or: [
        { isReserved: false },
        { reservationExpiry: { $lt: new Date() } }
      ]
    });

    if (availableSeats.length !== seatIds.length) {
      return res.status(400).json({ message: 'Some seats are already booked or reserved' });
    }

    // Reserve seats (không có thời gian hết hạn - giữ cho đến khi booking được tạo hoặc hủy)
    await Seat.updateMany(
      { seatId: { $in: seatIds } },
      {
        $set: {
          isReserved: true,
          reservedBy: req.user._id,
          reservationExpiry: null,
          updatedAt: new Date()
        }
      }
    );

    res.json({
      message: 'Seats reserved successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/seats/release
// @desc    Release reserved seats
// @access  Private
router.post('/release', auth, async (req, res) => {
  try {
    const { seatIds } = req.body;

    await Seat.updateMany(
      {
        seatId: { $in: seatIds },
        reservedBy: req.user._id,
        isReserved: true
      },
      {
        $set: {
          isReserved: false,
          reservedBy: null,
          reservationExpiry: null,
          updatedAt: new Date()
        }
      }
    );

    res.json({ message: 'Seats released successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
