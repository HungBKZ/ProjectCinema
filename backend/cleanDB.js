const mongoose = require('mongoose');
require('dotenv').config();

const Seat = require('./models/Seat');
const Booking = require('./models/Booking');
const User = require('./models/User');

const cleanDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('Connected to MongoDB');

    // Delete all bookings
    await Booking.deleteMany({});
    console.log('✅ Deleted all bookings');

    // Reset all seats (release reservations and bookings)
    await Seat.updateMany(
      {},
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
    console.log('✅ Reset all seats');

    // Optional: Delete all users except admin
    const result = await User.deleteMany({ isAdmin: { $ne: true } });
    console.log(`✅ Deleted ${result.deletedCount} non-admin users`);

    console.log('\n🎉 Database cleaned successfully!');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error cleaning database:', error);
    process.exit(1);
  }
};

cleanDatabase();
