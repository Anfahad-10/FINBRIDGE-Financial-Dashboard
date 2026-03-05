const { TransactionModel: Transaction } = require("../models/user.model");

exports.createTransaction = async (req, res) => {
    try {
        const { type, amount, category, description, date } = req.body;

        const transaction = await Transaction.create({
            user: req.user._id, // get it from auth.middleware
            type,
            amount,
            category,
            description,
            date: date || Date.now()
        });

        res.status(201).json({ success: true, data: transaction });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

//                       DASHBOARD STATS (alltime)
exports.getDashboardStats = async (req, res) => {
    try {
        const userId = req.user._id;

        const totals = await Transaction.aggregate([
            { $match: { user: userId } },
            { $group: { _id: "$type", totalAmount: { $sum: "$amount" } } }
        ]);

        let totalIncome = 0;
        let totalExpense = 0;

        totals.forEach(t => {
            if (t._id === 'income') totalIncome = t.totalAmount;
            if (t._id === 'expense') totalExpense = t.totalAmount;
        });

        const netIncome = totalIncome - totalExpense;

        // Expenses grouped by Category (For the Donut Chart)
        const expenseBreakdown = await Transaction.aggregate([
            { $match: { user: userId, type: 'expense' } },
            { $group: { _id: "$category", total: { $sum: "$amount" } } }
        ]);

        // 5 Most Recent Transactions (For the Table)
        const recentTransactions = await Transaction.find({ user: userId })
            .sort({ date: -1 })
            .limit(5);

        // Sending everything to the frontend
        res.status(200).json({
            success: true,
            data: {
                totalIncome,
                totalExpense,
                netIncome,
                expenseBreakdown,
                recentTransactions
            }
        });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};