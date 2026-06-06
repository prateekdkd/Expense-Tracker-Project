const Expense = require("../models/expense.model");
const user = require("../models/user.model");

// This is for addExpense
const addExpense = async (req,res)=>{

    try{
    const {title, amount, category, type} = req.body;

    const expense = await Expense.create({
         
        title,
        amount,
        category,
        type,
        user:req.user._id
    })
      res.status(201).json(expense);
   }
   catch(err){
    res.status(500).json({message:err.message})
   }
}

// This is for GetExpense
const getExpense = async (req,res)=>{
    try{
          const expense = await Expense.find({
            user:req.user._id
          }).sort({createdAt:-1})

          res.status(201).json(expense);
    }
    catch(err)
    {
       res.status(500).json({message:err.message})
    }
}


// This is for DeleteExpense
const deleteExpense = async (req,res)=>{
  try{
    const expense  = await Expense.findById(req.params.id);

    if(!expense)
    {
        res.status(404).json({
            message:"Expense not found"
        })
    }
    if(expense.user.toString() !== req.user._id.toString()){
        res.status(401).json({
            message:"Not authorized"
        })
    }

    await Expense.findByIdAndDelete(req.params.id);

    res.status(200).json({
        message:"Expense deleted succesfully"
    })
  }
  catch(err){
    res.status(500).json({message:err.message});
  }
}


// This is for UpdateExpense
const updateExpense = async (req,res)=>{
     try{
        const expense = Expense.findById(req.params.id);

        if(!expense)
        {
            res.status(404).json({
                message:"Expense not found"
            })
        }

        if(expense.user.toString() !== req.user._id.toString())
        {
            res.status(401).json({
                message:"Not authorized"
            })
        }

       const updatedExpense =  await Expense.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true,runValidators:true}
        );

        res.status(200).json(updatedExpense)

     }
     catch(err)
     {
        res.status(500).json({message:err.message});
     }
}
module.exports = {addExpense,getExpense,deleteExpense,updateExpense};