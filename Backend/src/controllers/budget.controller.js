const Budget = require("../models/budget.model");
const { TransactionModel: Transaction } = require("../models/user.model");


exports.createBudget = async (req, res) => {
    try {
        const { category, limit, month } = req.body;
        
        
        let budget = await Budget.findOne({ user: req.user._id, category, month });
        
        if (budget) {
            budget.limit = limit;
            await budget.save();
        } else {
            budget = await Budget.create({
                user: req.user._id,
                category,
                limit,
                month
            });
        }

        res.status(201).json({ success: true, data: budget });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getBudgets = async (req, res) => {
    try {
        const userId = req.user._id;
        
        const now = new Date();
        const targetMonth = req.query.month || `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
        
        const budgets = await Budget.find({ user: userId, month: targetMonth });

        const[year, monthStr] = targetMonth.split('-');
        const startOfMonth = new Date(year, parseInt(monthStr) - 1, 1);
        const endOfMonth = new Date(year, parseInt(monthStr), 0, 23, 59, 59);

        const expensesThisMonth = await Transaction.aggregate([
            { 
                $match: { 
                    user: userId, 
                    type: 'expense',
                    date: { $gte: startOfMonth, $lte: endOfMonth }
                } 
            },
            { $group: { _id: "$category", totalSpent: { $sum: "$amount" } } }
        ]);

        const budgetProgress = budgets.map(budget => {
            const expenseItem = expensesThisMonth.find(e => e._id === budget.category);
            return {
                _id: budget._id,
                category: budget.category,
                limit: budget.limit,
                spent: expenseItem ? expenseItem.totalSpent : 0
            };
        });

        res.status(200).json({ success: true, data: budgetProgress });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};