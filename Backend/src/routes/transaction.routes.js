const express = require("express");
const { createTransaction, getDashboardStats } = require("../controllers/transaction.controller");
const { protect } = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/", protect, createTransaction);
router.get("/dashboard-stats", protect, getDashboardStats);

module.exports = router;