import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI as string;
    const dbName = 'trading-journal-dev';

    await mongoose.connect(uri,{dbName});

    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit the process on connection failure
  }
};

export default connectDB;
