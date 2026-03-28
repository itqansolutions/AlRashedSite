const db           = require('../db');
const emailService = require('../services/email.service');

// POST /api/bookings
exports.create = async (req, res) => {
  try {
    const { name, phone, brand, model, year, service, date } = req.body;
    if (!name || !phone || !brand || !model || !year || !service || !date) {
      return res.status(400).json({ error: 'All fields are required.' });
    }
    const [id] = await db('bookings').insert({ name, phone, brand, model, year, service, date });
    
    // Send email without blocking
    await emailService.sendBookingConfirmation({ id, name, phone, brand, model, year, service, date }).catch(e => console.error("Email failed:", e));
    
    res.status(201).json({ message: 'Booking received successfully.', id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error. Please try again.' });
  }
};

// GET /api/bookings
exports.list = async (req, res) => {
  try {
    const rows = await db('bookings').orderBy('created_at', 'desc');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error.' });
  }
};

// GET /api/bookings/status?phone=XXXX
exports.statusByPhone = async (req, res) => {
  try {
    const { phone } = req.query;
    if (!phone) return res.status(400).json({ error: 'Phone number is required.' });
    const rows = await db('bookings').where({ phone }).orderBy('created_at', 'desc');
    res.json({ success: true, data: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server error.' });
  }
};

// PATCH /api/bookings/:id/status
exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const allowed = ['pending', 'confirmed', 'cancelled'];
    if (!allowed.includes(status)) {
      return res.status(400).json({ error: 'Invalid status.' });
    }
    await db('bookings').where({ id }).update({ status });
    res.json({ message: 'Status updated.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error.' });
  }
};
