require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const path = require('path');

const Shoe = require('./models/Shoe');
const Order = require('./models/Order');

const app = express();
const port = process.env.PORT || 3001; 

// Middleware
app.use(cors());
app.use(express.json());
app.use('/assets', express.static(path.join(__dirname, '..', 'frontend', 'src', 'assets')));

mongoose.connect(process.env.MONGO_URI, {
  // Remove deprecated options completely
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));
// Configure nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

transporter.verify(function(error, success) {
  if (error) {
    console.log('Email configuration error:', error);
  } else {
    console.log('Server is ready to send emails');
  }
});

// Endpoint to get all shoes
// In server.js, modify the /api/shoes endpoint
app.get('/api/shoes', async (req, res) => {
  try {
    const shoes = await Shoe.find();
    
    const transformedShoes = shoes.map(shoe => {
      console.log('Original Image Path:', shoe.image);
      console.log('Transformed Image Path:', shoe.image.replace('/src/assets/', '/assets/'));
      
      return {
        ...shoe.toObject(),
        image: shoe.image.replace('/src/assets/', '/assets/'),
        additionalImages: shoe.additionalImages.map(img => 
          img.replace('/src/assets/', '/assets/')
        )
      };
    });

    res.json(transformedShoes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Place order endpoint
app.post('/api/place-order', async (req, res) => {
  try {
    console.log('Received order request:', req.body);
    const { orderDetails, soldProducts } = req.body;
    
    if (!orderDetails || !soldProducts) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required data' 
      });
    }

    // Update shoes to sold out
    await Shoe.updateMany(
      { id: { $in: soldProducts } },
      { $set: { isSoldOut: true } }
    );

    // Create new order
    const newOrder = new Order({
      ...orderDetails,
      id: Date.now(),
      orderDate: new Date()
    });
    await newOrder.save();

    // Send email
    try {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'matexshoes@gmail.com',
        subject: 'New Order Received - MATex Shoes',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #2dd4bf;">New Order Received!</h1>
            
            <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h2>Customer Details</h2>
              <p><strong>Name:</strong> ${orderDetails.name}</p>
              <p><strong>Email:</strong> ${orderDetails.email}</p>
              <p><strong>Phone:</strong> ${orderDetails.phone}</p>
              <p><strong>Address:</strong> ${orderDetails.address}</p>
              <p><strong>City:</strong> ${orderDetails.city}</p>
              <p><strong>Additional Notes:</strong> ${orderDetails.notes || 'None'}</p>
            </div>

            <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h2>Ordered Items</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <thead>
                  <tr style="background-color: #e5e7eb;">
                    <th style="padding: 12px; text-align: left; border-bottom: 2px solid #cbd5e1;">Shoe ID</th>
                    <th style="padding: 12px; text-align: left; border-bottom: 2px solid #cbd5e1;">Name</th>
                    <th style="padding: 12px; text-align: right; border-bottom: 2px solid #cbd5e1;">Price</th>
                  </tr>
                </thead>
                <tbody>
                  ${orderDetails.items.map(item => `
                    <tr style="border-bottom: 1px solid #e5e7eb;">
                      <td style="padding: 12px;">${item.id}</td>
                      <td style="padding: 12px;">${item.name}</td>
                      <td style="padding: 12px; text-align: right;">Rs. ${item.price}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
              <h2>Order Summary</h2>
              <p><strong>Total Amount:</strong> Rs. ${orderDetails.total}</p>
              <p><strong>Payment Method:</strong> ${orderDetails.paymentMethod}</p>
            </div>
          </div>
        `
      };

      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent successfully:', info);

    } catch (emailError) {
      console.error('Email error:', emailError);
    }

    res.json({ 
      success: true, 
      message: 'Order placed successfully',
      orderId: newOrder.id
    });

  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error processing order',
      error: error.message
    });
  }
});

// Start server
app.listen(port, '0.0.0.0', () => {  // Bind to all network interfaces
  console.log(`Server is running on port ${port}`);
});