const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/database');
const User = require('./models/User');
const Seat = require('./models/Seat');

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
const allowedOrigins = [
  'http://localhost:3000',
  'https://project-cinema-pied.vercel.app',
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/seats', require('./routes/seats'));
app.use('/api/bookings', require('./routes/bookings'));

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Initialize seats and admin user
const initializeData = async () => {
  try {
    // Create admin user if not exists
    const adminExists = await User.findOne({ username: 'admin123' });
    if (!adminExists) {
      const admin = new User({
        firstName: 'Admin',
        lastName: 'System',
        username: 'admin123',
        password: 'Admin123@',
        email: 'admin@cinema.com',
        phone: '0000000000',
        isAdmin: true
      });
      await admin.save();
      console.log('Admin user created successfully');
    }

    // Create seats if not exists
    const seatCount = await Seat.countDocuments();
    if (seatCount === 0) {
      const seats = [];
      const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'];
      
      // Define seat layout based on the image
      const seatLayout = {
        'A': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 16, 17, 18, 19, 20, 21], // Không có ghế 14, 15
        'B': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
        'C': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
        'D': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
        'E': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
        'F': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
        'G': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
        'H': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
        'I': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
        'J': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
        'K': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21]
      };

      for (const row in seatLayout) {
        for (const number of seatLayout[row]) {
          seats.push({
            row,
            number,
            seatId: `${row}${number}`,
            isBooked: false,
            isReserved: false
          });
        }
      }

      await Seat.insertMany(seats);
      console.log('Seats initialized successfully');
    }
  } catch (error) {
    console.error('Error initializing data:', error);
  }
};

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await initializeData();
});

module.exports = app;
