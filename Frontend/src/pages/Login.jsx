import axios from 'axios';
import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API_URL } from '../config';
function Login({setUser}){

    const [formData, setFormData] = useState({
        email:"",
        password:"",
    });
    const navigate = useNavigate()
    const [error, setError] = useState("")

    const handleChange = (e)=>{
           setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSumit = async (e)=>{
        e.preventDefault();
        try{
            const res = await axios.post(`${API_URL}/api/auth/login`, formData)
            localStorage.setItem("token", res.data.token)
            localStorage.setItem( "user",JSON.stringify(res.data.user));
            setUser(res.data)
            toast.success("Login Successful");
            navigate("/home")
        }
        catch (err) {
             const message = (err.response?.data?.message || "Login fails")

             toast.error(message,{
                 style:{width:"200px" } 
                });

             setError(message);
        }
    }
  return (
    <>
    <div className='main-container'>
    <div className = "login-container">
        <div className="login-box">
            <h2>Welcome Back</h2>
            <p className="subtitle">Please enter your details to sign in.</p>

            <form onSubmit={handleSumit}>
                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" placeholder="Enter your email" required value={formData.email} onChange={handleChange}/>
                </div>

                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" placeholder="Enter youir password" required value={formData.password} onChange={handleChange}/>
                </div>

                <div className="options">
                  

                </div>

                <button type="submit" className="login-btn">Sign In</button>
            </form>
            <p className="register-link">Don't have an account? <a href="/register">Sign up</a></p>
        </div>
    </div>
    </div>
    </>
  )
}

export default Login