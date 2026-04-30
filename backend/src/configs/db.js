import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      // Gives the driver more time to find the server (useful for Vercel/slow networks)
      serverSelectionTimeoutMS: 5000, 
      // Prevents the "Socket timed out" error during long operations
      socketTimeoutMS: 45000,
      // Ensures Mongoose doesn't try to run queries before the connection is ready
      bufferCommands: false, 
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);

    // Optional: Event listeners for better monitoring
    mongoose.connection.on('error', (err) => {
      console.error(`Mongoose connection error: ${err}`);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('Mongoose disconnected. Attempting to reconnect...');
    });

  } catch (error) {
    console.error(`Initial Connection Error: ${error.message}`);
    // Only exit the process if this is a fatal startup error
    process.exit(1); 
  }
};

export default connectDB;