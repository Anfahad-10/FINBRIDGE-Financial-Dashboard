const mongoose = require('mongoose');

const taxSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    financialYear: { type: String, required: true }, // e.g., "2025-26"
    employmentType: { type: String, default: 'Business' },
    
         // Here storing the inputs
    grossIncome: { type: Number, default: 0 },
    businessExpenses: { type: Number, default: 0 },
    medicalInsurance: { type: Number, default: 0 },
    lifeInsurance: { type: Number, default: 0 },
    otherDeductions: { type: Number, default: 0 },
    tdsDeducted: { type: Number, default: 0 },
    

      // Storing result that we calculated
    totalTax: { type: Number, default: 0 },
    finalTaxPayable: { type: Number, default: 0 },
    
    payments: {
        q1: { isPaid: { type: Boolean, default: false }, amount: { type: Number, default: 0 } },
        q2: { isPaid: { type: Boolean, default: false }, amount: { type: Number, default: 0 } },
        q3: { isPaid: { type: Boolean, default: false }, amount: { type: Number, default: 0 } },
        q4: { isPaid: { type: Boolean, default: false }, amount: { type: Number, default: 0 } }
    }
}, { timestamps: true });

module.exports = mongoose.model('TaxEstimate', taxSchema);