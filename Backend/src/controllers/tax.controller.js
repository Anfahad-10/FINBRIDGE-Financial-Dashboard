const TaxEstimate = require('../models/tax.model');

exports.saveEstimate = async (req, res) => {
    try {
        const userId = req.user._id;
        const { financialYear, formData, calculatedData } = req.body;

        let estimate = await TaxEstimate.findOne({ user: userId, financialYear });

        if (estimate) {
            // Update existing (but keep the payment status intact)
            estimate.employmentType = formData.employmentType;
            estimate.grossIncome = formData.grossIncome || 0;
            estimate.businessExpenses = formData.businessExpenses || 0;
            estimate.medicalInsurance = formData.medicalInsurance || 0;
            estimate.lifeInsurance = formData.lifeInsurance || 0;
            estimate.otherDeductions = formData.otherDeductions || 0;
            estimate.tdsDeducted = formData.tdsDeducted || 0;
            estimate.totalTax = calculatedData.totalTax;
            estimate.finalTaxPayable = calculatedData.finalTaxPayable;
            
                        // Update quarter amounts (but don't touch isPaid)
            estimate.payments.q1.amount = calculatedData.q1;
            estimate.payments.q2.amount = calculatedData.q2;
            estimate.payments.q3.amount = calculatedData.q3;
            estimate.payments.q4.amount = calculatedData.q4;
            
            await estimate.save();
        } else {
                    // create new
            estimate = await TaxEstimate.create({
                user: userId,
                financialYear,
                ...formData,
                totalTax: calculatedData.totalTax,
                finalTaxPayable: calculatedData.finalTaxPayable,
                payments: {
                    q1: { amount: calculatedData.q1 },
                    q2: { amount: calculatedData.q2 },
                    q3: { amount: calculatedData.q3 },
                    q4: { amount: calculatedData.q4 }
                }
            });
        }

        res.status(200).json({ success: true, data: estimate });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


exports.getEstimate = async (req, res) => {
    try {
        const { year } = req.params;
        const estimate = await TaxEstimate.findOne({ user: req.user._id, financialYear: year });
        res.status(200).json({ success: true, data: estimate });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.markQuarterPaid = async (req, res) => {
    try {
        const { financialYear, quarter, isPaid } = req.body; // quarter = 'q1', 'q2', etc.
        
        const estimate = await TaxEstimate.findOne({ user: req.user._id, financialYear });
        if (!estimate) return res.status(404).json({ success: false, message: "Estimate not found" });

        estimate.payments[quarter].isPaid = isPaid;
        await estimate.save();

        res.status(200).json({ success: true, data: estimate });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};