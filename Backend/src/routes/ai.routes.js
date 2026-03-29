const express = require('express');
const { chatAssistant, scanReceipt } = require('../controllers/ai.controller'); // Added scanReceipt
const { protect } = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/chat', protect, chatAssistant);
router.post('/scan-receipt', protect, scanReceipt); // Added this line

module.exports = router;