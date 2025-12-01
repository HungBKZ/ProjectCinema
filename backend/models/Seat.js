const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
  row: {
    type: String,
    required: true
  },
  number: {
    type: Number,
    required: true
  },
  seatId: {
    type: String,
    required: true,
    unique: true
  },
  isBooked: {
    type: Boolean,
    default: false
  },
  isReserved: {
    type: Boolean,
    default: false
  },
  reservedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  reservationExpiry: {
    type: Date
  },
  bookedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  booking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking'
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Index for faster queries
seatSchema.index({ seatId: 1 });
seatSchema.index({ isBooked: 1 });
seatSchema.index({ isReserved: 1, reservationExpiry: 1 });

module.exports = mongoose.model('Seat', seatSchema);
