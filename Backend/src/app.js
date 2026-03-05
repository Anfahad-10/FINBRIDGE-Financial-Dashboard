const express = require("express")
const cookieParser = require("cookie-parser")
const authRouter = require("./routes/auth.routes")
const transactionRouter = require("./routes/transaction.routes")    

const cors = require("cors");
const app = express()


app.use(express.json())
app.use(cookieParser())


app.use("/api/auth", authRouter)
app.use("/api/transactions", transactionRouter);


app.use(cors({ origin: 'http://localhost:5173', credentials: true })); // Adjust port if needed
app.use(express.json());


module.exports = app 