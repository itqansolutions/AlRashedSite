const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.sendBookingConfirmation = async ({ id, name, phone, brand, model, year, service, date }) => {
  await transporter.sendMail({
    from   : `"Al-Rashed Service Center" <${process.env.EMAIL_USER}>`,
    to     : process.env.EMAIL_TO,
    subject: `📅 New Booking #${id} – ${name}`,
    html   : `
      <h2>New Booking Received</h2>
      <table>
        <tr><td><strong>Name</strong></td><td>${name}</td></tr>
        <tr><td><strong>Phone</strong></td><td>${phone}</td></tr>
        <tr><td><strong>Vehicle</strong></td><td>${brand} ${model} (${year})</td></tr>
        <tr><td><strong>Service</strong></td><td>${service}</td></tr>
        <tr><td><strong>Date</strong></td><td>${date}</td></tr>
      </table>
    `,
  });
};

exports.sendContactNotification = async ({ name, contactInfo, message }) => {
  await transporter.sendMail({
    from   : `"Al-Rashed Website" <${process.env.EMAIL_USER}>`,
    to     : process.env.EMAIL_TO,
    subject: `📩 New Contact Message – ${name}`,
    html   : `
      <h2>New Contact Message</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Contact:</strong> ${contactInfo}</p>
      <p><strong>Message:</strong><br>${message}</p>
    `,
  });
};
