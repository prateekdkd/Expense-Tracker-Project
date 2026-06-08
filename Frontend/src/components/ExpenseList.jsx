import axios from 'axios';
import React, { useState } from 'react'
import { API_URL } from '../config';
export default function ExpenseList({expenses,fetchExpenses}){

  const [loading, setLoading] = useState(false);

  const handleDelete = async (id)=>{
      
    try{
       setLoading(true)
      const token = localStorage.getItem("token");

      await axios.delete(`${API_URL}/api/expense/${id}`,
        {
          headers:{
            Authorization: `Bearer ${token}`
          }
        }
      );
      fetchExpenses();
    }
    catch(err)
    {
        console.log(err)
    }
  finally{
    setLoading(false)
  }
  }
  return (
    <>
    <div>
     {expenses.map((expense)=> (

      <div className="transaction-list"  key={expense._id}>
  {/* Aapka map function yahan aayega */}
  <div className="transaction-item expense"> 
    {/* .expense ya .income class condition ke hisaab se lagayein */}
    
    <div className="item-info">
      <h4 className="item-title">{expense.title}</h4>
      <span className="item-category">{expense.category}</span>
    </div>

    <div className="item-details">
      <span className={`item-amount ${expense.type === 'income' ? 'amt-income' : 'amt-expense'}`}>
      ₹{expense.amount}
    </span>
      <span className="item-badge">{expense.type}</span>
    </div>
    <div className="action-btns">
      <button className="btn-sm2 " onClick={() => handleDelete(expense._id)}>Delete</button>
    </div>
  </div>
</div>
        
     ) )}
     </div>
      {loading && (
  <div style={{
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "rgba(0,0,0,0.2)"
  }}>
    ⏳ Loading...
  </div>
)}
    </>
  )
}
