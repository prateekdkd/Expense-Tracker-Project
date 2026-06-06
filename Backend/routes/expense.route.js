const express = require("express");
const expense = require("../models/expense.model");
const {protect} = require("../middleware/auth.middleware")
const {addExpense,getExpense,deleteExpense,updateExpense} = require("../controllers/expense.controller")
const router = express.Router();

router.post("/add",protect,addExpense)
router.get("/all",protect,getExpense)
router.delete("/:id",protect,deleteExpense)
router.put("/:id",protect,updateExpense)

module.exports = router;