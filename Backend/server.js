const express = require("express")
const dotenv = require("dotenv")
const connectDB = require("./config/db")
const authroute = require("./routes/auth.route")
const expenseroute = require("./routes/expense.route");
dotenv.config();
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5000

app.use("/api/auth", authroute)
app.use("/api/expense",expenseroute)

connectDB();

app.listen(PORT, ()=>{
    console.log(`Server is runing in Port ${PORT}`)
})