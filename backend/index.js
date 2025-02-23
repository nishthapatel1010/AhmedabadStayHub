import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectAdminDatabase, connectUserDatabase } from './config/database.js';
import UserRoutes from './routes/UserRoutes/AuthRoute.js';

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 8100;

// Middleware
app.use(express.json()); // Parse JSON body
app.use(cors()); // Enable CORS

// Database connection and server start
const startServer = async () => {
  try {
    console.log('Starting database connections...');

    await Promise.all([connectAdminDatabase(), connectUserDatabase()]); // Connect both databases

    // Routes
    app.use('/api/users', UserRoutes); // Mount user routes

    // Handle 404 - Not Found
    app.use((req, res) => {
      res.status(404).json({ message: 'Route not found' });
    });

    // Start server
    const server = app.listen(PORT, () => {
      console.log(`✅ Server is running on port ${PORT}`);
    });

    // Handle server errors
    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.error(`❗ Port ${PORT} is already in use. Trying another port...`);
        server.listen(PORT + 1); // Use next available port
      } else {
        console.error('❗ Server error:', err);
      }
    });
  } catch (error) {
    console.error('❗ Error while setting up the server:', error.message);
    process.exit(1); // Exit the process if setup fails
  }
};

// Start the server
startServer();
