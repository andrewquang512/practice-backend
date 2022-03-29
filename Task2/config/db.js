const mongoose = require('mongoose');
const db =
  'mongodb+srv://chanvi123:iFpO0MBN7kEkAHRk@cluster0.7s7th.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const connectDB = async () => {
  //? practice using try catch
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
    });
    console.log('MongoDB Connected...');
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
