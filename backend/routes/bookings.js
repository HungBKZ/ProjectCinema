const express = require('express');
const router = express.Router();
const { auth, adminAuth } = require('../middleware/auth');
const Booking = require('../models/Booking');
const Seat = require('../models/Seat');
const User = require('../models/User');
const { sendBookingConfirmationEmail } = require('../config/email');

const TICKET_PRICE = 99000; // 99,000 VND

// @route   POST /api/bookings
// @desc    Create a new booking
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const { seatIds } = req.body;

    if (!seatIds || seatIds.length === 0) {
      return res.status(400).json({ message: 'Please select at least one seat' });
    }

    if (seatIds.length > 2) {
      return res.status(400).json({ message: 'Maximum 2 seats can be booked at once' });
    }

    // Check total seats already booked by user (pending or confirmed)
    const userBookings = await Booking.find({
      user: req.user._id,
      status: { $in: ['pending', 'confirmed'] }
    });

    const totalSeatsBooked = userBookings.reduce((sum, booking) => sum + booking.seats.length, 0);
    
    if (totalSeatsBooked + seatIds.length > 2) {
      return res.status(400).json({ 
        message: `Bạn đã đặt ${totalSeatsBooked} ghế. Mỗi tài khoản chỉ được đặt tối đa 2 ghế!` 
      });
    }

    // Check if seats are available (not booked)
    const seats = await Seat.find({
      seatId: { $in: seatIds }
    });

    if (seats.length !== seatIds.length) {
      return res.status(400).json({ 
        message: 'Some seats do not exist' 
      });
    }

    // Check if any seat is already booked
    const bookedSeats = seats.filter(seat => seat.isBooked);
    if (bookedSeats.length > 0) {
      return res.status(400).json({ 
        message: 'Some seats are already booked' 
      });
    }

    // Check if any seat is reserved by another user
    const reservedByOthers = seats.filter(
      seat => seat.isReserved && seat.reservedBy && seat.reservedBy.toString() !== req.user._id.toString()
    );
    if (reservedByOthers.length > 0) {
      return res.status(400).json({ 
        message: 'Some seats are reserved by other users' 
      });
    }

    // Create booking
    const totalAmount = seats.length * TICKET_PRICE;

    const booking = new Booking({
      user: req.user._id,
      seats: seats.map(seat => ({
        row: seat.row,
        number: seat.number,
        seatId: seat.seatId
      })),
      totalAmount,
      status: 'pending' // Waiting for payment confirmation
    });

    await booking.save();

    // Khóa ghế ngay lập tức (reserve cho user này)
    await Seat.updateMany(
      { seatId: { $in: seatIds } },
      {
        $set: {
          isReserved: true,
          reservedBy: req.user._id,
          booking: booking._id,
          updatedAt: new Date()
        }
      }
    );

    res.status(201).json({
      message: 'Booking created successfully',
      booking: {
        id: booking._id,
        seats: booking.seats,
        totalAmount: booking.totalAmount,
        status: booking.status
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/bookings
// @desc    Get all bookings (Admin only)
// @access  Private/Admin
router.get('/', [auth, adminAuth], async (req, res) => {
  try {
    const bookings = await Booking.find()
      .sort({ createdAt: -1 })
      .populate('user', 'firstName lastName email phone username');

    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/bookings/my-bookings
// @desc    Get current user's bookings
// @access  Private
router.get('/my-bookings', auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .populate('user', 'firstName lastName email phone');

    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/bookings/:id/confirm
// @desc    Confirm a booking (Admin only)
// @access  Private/Admin
router.put('/:id/confirm', [auth, adminAuth], async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (booking.status === 'confirmed') {
      return res.status(400).json({ message: 'Booking already confirmed' });
    }

    // Update booking status
    booking.status = 'confirmed';
    booking.confirmedAt = new Date();
    await booking.save();

    // Mark seats as booked
    const seatIds = booking.seats.map(seat => seat.seatId);
    await Seat.updateMany(
      { seatId: { $in: seatIds } },
      {
        $set: {
          isBooked: true,
          isReserved: false,
          bookedBy: booking.user,
          reservedBy: null,
          reservationExpiry: null,
          updatedAt: new Date()
        }
      }
    );

    // Send confirmation email
    try {
      const user = await User.findById(booking.user);
      if (user && user.email) {
        await sendBookingConfirmationEmail(user.email, {
          seats: seatIds,
          totalAmount: booking.totalAmount,
          bookingId: booking._id
        });
      }
    } catch (emailError) {
      console.error('Error sending confirmation email:', emailError);
      // Don't fail the request if email fails
    }

    res.json({
      message: 'Booking confirmed successfully',
      booking
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/bookings/:id/cancel-confirmation
// @desc    Cancel a confirmed booking (Admin only)
// @access  Private/Admin
router.put('/:id/cancel-confirmation', [auth, adminAuth], async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Set booking status to cancelled
    booking.status = 'cancelled';
    await booking.save();

    // Release seats
    const seatIds = booking.seats.map(seat => seat.seatId);
    await Seat.updateMany(
      { seatId: { $in: seatIds } },
      {
        $set: {
          isBooked: false,
          isReserved: false,
          bookedBy: null,
          reservedBy: null,
          reservationExpiry: null,
          booking: null,
          updatedAt: new Date()
        }
      }
    );

    res.json({
      message: 'Booking cancelled successfully',
      booking
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/bookings/:id
// @desc    Cancel a booking
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Check if user owns this booking or is admin
    if (booking.user.toString() !== req.user._id.toString() && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    if (booking.status === 'confirmed') {
      return res.status(400).json({ message: 'Cannot cancel confirmed booking' });
    }

    // Update booking status
    booking.status = 'cancelled';
    await booking.save();

    // Release seats
    const seatIds = booking.seats.map(seat => seat.seatId);
    await Seat.updateMany(
      { seatId: { $in: seatIds } },
      {
        $set: {
          isReserved: false,
          reservedBy: null,
          reservationExpiry: null,
          booking: null,
          updatedAt: new Date()
        }
      }
    );

    res.json({ message: 'Booking cancelled successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/bookings/:id
// @desc    Delete a booking (for when user goes back from payment)
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Only allow user to delete their own booking
    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    // Only allow deleting pending bookings
    if (booking.status !== 'pending') {
      return res.status(400).json({ message: 'Can only delete pending bookings' });
    }

    // Release seats
    const seatIds = booking.seats.map(seat => seat.seatId);
    await Seat.updateMany(
      { seatId: { $in: seatIds } },
      {
        $set: {
          isReserved: false,
          reservedBy: null,
          isBooked: false,
          booking: null,
          updatedAt: new Date()
        }
      }
    );

    // Delete booking
    await Booking.findByIdAndDelete(req.params.id);

    res.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
