import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import Navbar from '../components/Navbar';
import { API_URL } from '../config';
export default function Home({setUser}) {

  const [expenses, setExpenses] = useState([]);

  const navigate = useNavigate();

  const fetchExpenses = async (req,res)=>{

        const token = localStorage.getItem("token");

        if(!token)
        {
         return;
        }

    try{
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `${API_URL}/api/expense/all`,
          {
           headers:{  
          Authorization: `Bearer ${token}`,
           },
        }
      )
      setExpenses(res.data);
      console.log(expenses);
    }
  
    catch(err){
        console.log(err);
     }
    
  }
  const totalIncome = expenses
  .filter(item => item.type === "income")
  .reduce((acc, item) => acc + Number(item.amount), 0);

  const totalExpense = expenses
  .filter(item => item.type === "expense")
  .reduce((acc, item) => acc + Number(item.amount),0);

  useEffect(()=>{
    const token = localStorage.getItem("token");

      if (!token) 
      {
         navigate("/");
         return;
      }
    fetchExpenses();
  },[])

    return (
    <>
       <Navbar  setUser={setUser}/>
      
      <div className="summary-container">
      <div className="summary-card income-card">
      <h4>Total Income</h4>
       <p>₹{totalIncome}</p>
       </div>
  
      <div className="summary-card expense-card">
      <h4>Total Expense</h4>
       <p>₹{totalExpense}</p>
       </div>
       </div>

     <ExpenseForm fetchExpenses={fetchExpenses}/>
     <ExpenseList expenses={expenses} fetchExpenses={fetchExpenses} /> 
    </>
  )
}


