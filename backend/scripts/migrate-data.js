require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Shoe = require('../models/Shoe');

// Enhanced logging
console.log('Attempting to connect to MongoDB...');
console.log('URI:', process.env.MONGO_URI.replace(/<[^>]+>/g, '****')); // Mask sensitive parts

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('MongoDB connected successfully');
  
  try {
    // Read data from db.json
    const dbPath = path.join(__dirname, '../db.json');
    const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

    // Clear existing shoes
    await Shoe.deleteMany({});

    // Insert shoes without modifying paths
    const result = await Shoe.insertMany(data.shoes);

    console.log(`Successfully inserted ${result.length} shoes`);
  } catch (insertError) {
    console.error('Error during insertion:', insertError);
  }

  mongoose.connection.close();
})
.catch(err => {
  console.error('MongoDB Connection Error:', err);
  process.exit(1); // Exit with failure
});
