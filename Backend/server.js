const express = require("express")
const dotenv = require("dotenv")
const connectDB = require("./config/db")
const authroute = require("./routes/auth.route")
const expenseroute = require("./routes/expense.route");
const cors = require("cors")
dotenv.config();
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5000

app.use(cors({
  origin: "https://expensetrackerp.netlify.app",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}));
app.use(express.json());
app.use("/api/auth", authroute)
app.use("/api/expense",expenseroute)

connectDB();

app.listen(PORT, ()=>{
    console.log(`Server is runing in Port ${PORT}`)
})