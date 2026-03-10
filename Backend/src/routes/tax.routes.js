const express = require('express');
const { saveEstimate, getEstimate, markQuarterPaid } = require('../controllers/tax.controller');
const { protect } = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/estimate', protect, saveEstimate);
router.get('/estimate/:year', protect, getEstimate);
router.put('/payment', protect, markQuarterPaid);

module.exports = router;