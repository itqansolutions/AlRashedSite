const express = require('express');
const router  = express.Router();
const ctrl    = require('../controllers/bookings.controller');

router.post('/',            ctrl.create);
router.get('/',             ctrl.list);          // admin-only (add auth later)
router.get('/status',       ctrl.statusByPhone); // ?phone=XXXX
router.patch('/:id/status', ctrl.updateStatus);

module.exports = router;
