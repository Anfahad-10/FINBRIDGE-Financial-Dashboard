const express = require("express")
const cookieParser = require("cookie-parser")
const authRouter = require("./routes/auth.routes")
const transactionRouter = require("./routes/transaction.routes")   
const budgetRouter = require("./routes/budget.routes")
const taxRouter = require("./routes/tax.routes")
const aiRouter = require("./routes/ai.routes")

const cors = require("cors");
const app = express()


app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());


app.use("/api/auth", authRouter);
app.use("/api/transactions", transactionRouter);
app.use("/api/budgets", budgetRouter);
app.use("/api/taxes", taxRouter);
app.use("/api/ai", aiRouter);


app.use(cors({ 
    origin: process.env.FRONTEND_URL || 'http://localhost:5173', 
    credentials: true 
}));
app.use(express.json());


module.exports = app 