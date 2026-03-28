require('dotenv').config();
const express   = require('express');
const path      = require('path');
const helmet    = require('helmet');
const morgan    = require('morgan');
const cors      = require('cors');
const rateLimit = require('express-rate-limit');

const app = express();

// ── Security Middleware ────────────────────────────────────────────────────
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc:  ["'self'", "'unsafe-inline'", "cdnjs.cloudflare.com", "kit.fontawesome.com"],
      styleSrc:   ["'self'", "'unsafe-inline'", "fonts.googleapis.com", "cdnjs.cloudflare.com"],
      fontSrc:    ["'self'", "fonts.gstatic.com", "cdnjs.cloudflare.com"],
      imgSrc:     ["'self'", "data:", "*.google.com", "*.googleapis.com"],
      frameSrc:   ["'self'", "*.google.com"],
    },
  },
}));

app.use(morgan('combined'));

app.use(cors({
  origin: process.env.ALLOWED_ORIGIN || '*',
}));

app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 100,
  message: { error: 'Too many requests. Please try again later.' },
}));

// ── Body Parser ────────────────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Static Files ───────────────────────────────────────────────────────────
app.use(express.static(path.join(__dirname, '../public')));

// ── API Routes ─────────────────────────────────────────────────────────────
app.use('/api/bookings', require('./routes/bookings.routes'));
app.use('/api/contact',  require('./routes/contact.routes'));

// ── Catch-all: serve index.html for any unmatched route ───────────────────
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// ── Start ──────────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Al-Rashed server running on port ${PORT}`));
