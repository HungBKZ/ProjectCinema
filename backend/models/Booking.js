const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  seats: [{
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
      required: true
    }
  }],
  totalAmount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'expired'],
    default: 'pending'
  },
  reservedAt: {
    type: Date,
    default: Date.now
  },
  confirmedAt: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index for faster queries
bookingSchema.index({ user: 1 });
bookingSchema.index({ status: 1 });
bookingSchema.index({ reservationExpiry: 1 });

module.exports = mongoose.model('Booking', bookingSchema);
