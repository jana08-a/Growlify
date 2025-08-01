const express = require("express");
const Razorpay = require("razorpay");
const nodemailer = require("nodemailer");
const router = express.Router();
require("dotenv").config(); // ✅ Load environment variables
const logger = require('../utils/logger'); // Import logger
// 🔐 Razorpay Setup
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ✉ Email Setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ✅ Route 1: Create Razorpay Order
router.post("/create-order", async (req, res) => {
  const { amount } = req.body;

  if (!amount || typeof amount !== "number" || amount <= 0) {
    return res.status(400).json({ error: "Invalid amount." });
  }

  const options = {
    amount,
    currency: "INR",
    receipt: `receipt_${Date.now()}`,
    payment_capture: 1,
  };

  try {
    const order = await razorpay.orders.create(options);
    res.status(200).json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      message: "Razorpay order created successfully.",
    });
  } catch (error) {
    logger.error("❌ Razorpay order creation failed:", error);
    res.status(500).json({ error: "Order creation failed. " + error.message });
  }
});

// ✅ Route 2: Send Order Confirmation Email
router.post("/send-confirmation", async (req, res) => {
  const { formData, cart, paymentResponse } = req.body;

  if (!formData || !cart || !paymentResponse) {
    return res.status(400).json({ error: "Missing required data." });
  }

  let totalAmount = 0;
  let cartHtml = `
    <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
      <thead style="background-color: #e6f4ea;">
        <tr>
          <th style="padding: 10px; text-align: left;">🌿 Product</th>
          <th style="padding: 10px; text-align: left;">Option</th>
          <th style="padding: 10px; text-align: right;">Qty</th>
          <th style="padding: 10px; text-align: right;">Price</th>
          <th style="padding: 10px; text-align: right;">Subtotal</th>
        </tr>
      </thead>
      <tbody>
  `;

  cart.forEach(item => {
    const subtotal = item.price * item.quantity;
    if (!item.comingSoon) totalAmount += subtotal;

    cartHtml += `
      <tr style="border-bottom: 1px solid #ddd;">
        <td style="padding: 10px;">${item.name} ${item.comingSoon ? '(Coming Soon)' : ''}</td>
        <td style="padding: 10px;">${item.selectedOption || 'N/A'}</td>
        <td style="padding: 10px; text-align: right;">${item.quantity}</td>
        <td style="padding: 10px; text-align: right;">${item.comingSoon ? '—' : `₹${item.price.toFixed(2)}`}</td>
        <td style="padding: 10px; text-align: right;">${item.comingSoon ? '—' : `₹${subtotal.toFixed(2)}`}</td>
      </tr>
    `;
  });

  cartHtml += `
      </tbody>
      <tfoot>
        <tr style="font-weight: bold;">
          <td colspan="4" style="padding: 10px; text-align: right;">Grand Total:</td>
          <td style="padding: 10px; text-align: right;">₹${totalAmount.toFixed(2)}</td>
        </tr>
      </tfoot>
    </table>
  `;

  const htmlContent = `
    <div style="font-family: 'Segoe UI', sans-serif; color: #333; background: #ffffff; padding: 30px; border-radius: 12px; box-shadow: 0 5px 20px rgba(0,0,0,0.05); max-width: 700px; margin: auto;">
      <h2 style="text-align: center; color: #2e7d32;">🌱 Growlify Essentials – Order Confirmation</h2>
      <p>Hello <strong>${formData.fullName}</strong>,</p>
      <p>Thank you for shopping with <strong>Growlify Essentials</strong>! Your green goodies are on their way 🌿</p>

      <h3 style="color: #2e7d32;">📦 Shipping Details</h3>
      <p><strong>Email:</strong> ${formData.email}</p>
      <p><strong>Phone:</strong> ${formData.phone}</p>
      <p><strong>Address:</strong> ${formData.address}, ${formData.area}, ${formData.city}, ${formData.state} – ${formData.pincode}</p>

      <h3 style="color: #2e7d32;">🛍️ Your Order</h3>
      ${cartHtml}

      <h3 style="color: #2e7d32;">💳 Payment Details</h3>
      <p><strong>Razorpay Payment ID:</strong> ${paymentResponse.razorpay_payment_id}</p>
      <p><strong>Razorpay Order ID:</strong> ${paymentResponse.razorpay_order_id}</p>
      <p><strong>Status:</strong> ✅ Payment Successful</p>

      <hr style="margin: 30px 0;" />

      <p style="font-style: italic; color: #444;">“The love of gardening is a seed once sown that never dies.”</p>
      <p style="color: #2e7d32;">We hope our products bring more green and joy to your space 🌼</p>

      <div style="margin-top: 30px; text-align: center;">
        <a href="https://growlify.shop" style="background-color: #2e7d32; color: white; padding: 10px 20px; text-decoration: none; border-radius: 6px;">🛒 Shop More Organic Products</a>
      </div>

      <footer style="margin-top: 40px; font-size: 0.85em; color: #777; text-align: center;">
        <p>Growlify Essentials &copy; ${new Date().getFullYear()} – Nurture Naturally</p>
      </footer>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: `${formData.email}, ${process.env.EMAIL_USER}`,
      subject: "🌿 Your Growlify Essentials Order is Confirmed!",
      html: htmlContent,
    });

    res.status(200).json({ message: "Confirmation email sent." });
  } catch (error) {
    logger.error("❌ Email send failed:", error.message);
    res.status(500).json({ error: "Failed to send email. " + error.message });
  }
});

module.exports = router;
