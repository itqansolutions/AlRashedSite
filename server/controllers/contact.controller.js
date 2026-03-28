const db           = require('../db');
const emailService = require('../services/email.service');

// POST /api/contact
exports.send = async (req, res) => {
  try {
    const { name, contactInfo, message } = req.body;
    if (!name || !contactInfo || !message) {
      return res.status(400).json({ error: 'All fields are required.' });
    }
    
    // Save to DB
    await db('contacts').insert({ name, contactInfo, message });

    // Send email notification (non-blocking if it fails, though we await it here)
    await emailService.sendContactNotification({ name, contactInfo, message }).catch(e => console.error("Email failed:", e));
    
    res.status(200).json({ message: 'Message sent successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error. Please try again.' });
  }
};
