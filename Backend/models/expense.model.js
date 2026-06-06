const mongoose = require("mongoose")

const expenseSchema = new mongoose.Schema({

    title:{
        type:String,
        require:true,
    },
    amount:{
        type:String,
        require:true,
    },
    category:{
        type:String,
        require:true,
    },
    type:{
        type:String,
        enum:["income", "expense"],
        require:true,
    },
    user:{
         type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }

},{timestamps:true})

const expense = mongoose.model("expense", expenseSchema);

module.exports = expense;