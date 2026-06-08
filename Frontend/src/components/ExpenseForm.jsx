import axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { API_URL } from '../config'
export default function ExpenseForm({fetchExpenses}) {

    const [formData, setformData] = useState({
        title : '',
        amount : '',
        category : '',
        type : 'expense'
    })
     const [loading , setLoading] = useState(false);

    const handleChange = (e) =>{
         setformData({
            ...formData,[e.target.name]:e.target.value
         })
    }
    const handleSubmit = async(e)=>{
        e.preventDefault();

        try{
            setLoading(true);
            const token = localStorage.getItem("token");

            const res = await axios.post(
                `${API_URL}/api/expense/add`,
                formData,
                {
                   headers:{
                    Authorization: `Bearer ${token} `
                   }
                }
            );
           
            fetchExpenses();

            setformData({ 
            title: "",
            amount: "",
            category: "",
            type: "expense"
        });
        }
        catch(err){
            console.log(err);
        }
        finally{
            setLoading(false);
        }
    }

  return (

    <>
     <form className="expense-form" onSubmit={handleSubmit}>

        <h2>Add Transaction</h2>

        <input
        type='text'
        name='title'
        placeholder='Title'
        value={formData.title}
        onChange={handleChange}
        required
        />

         <input
        type='number'
        name='amount'
        placeholder='Enter amount'
        value={formData.amount}
        onChange={handleChange}
        required
        />

         <input
        type='text'
        name='category'
        placeholder='Category'
        value={formData.category}
        onChange={handleChange}
        required
        />

        <select name='type' value={formData.type} onChange={handleChange}>
            <option value='expense'>Expense</option>
            <option value='income'>Income</option>
        </select>

        <button type='submit'>Add Transaction</button>
     </form>
     
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
