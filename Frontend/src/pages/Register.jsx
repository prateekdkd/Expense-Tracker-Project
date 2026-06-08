import axios from 'axios';
import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API_URL } from '../config';

export default function Register({setUser}) {

      const [formData, setFormData] = useState({
        username:"",
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
            const res = await axios.post(`${API_URL}/api/auth/register`, formData)
            localStorage.setItem("token", res.data.token)
            setUser(res.data)
            toast.success("Account Created");
            navigate("/")
        }
        catch (err) {
             setError(err.response?.data?.message || "Registration fails")
        }
    }
  return (
    <div className='main-container'>
    <div className="auth-container">
        <div className="auth-box">
            <h2>Create an Account</h2>
            <p className="subtitle">Join us today! Please fill  your details.</p>

            <form onSubmit={handleSumit} autoComplete="off">
                <div className="input-group">
                    <label>Full Name</label>
                    <input type="text" id="username" name="username" placeholder="Enter your name" required value={formData.username} onChange={handleChange}/>
                </div>

                <div className="input-group">
                    <label htmlFor="email">Email</label>
                     <input type="username" id="email" name="email" placeholder="Enter your email" required value={formData.email} onChange={handleChange}/> 
                </div>

                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" placeholder="Create a password" required value={formData.password} onChange={handleChange}/>
                </div>

                <div className="options">
                    <label className="checkbox-label">
                       
                    </label>
                </div>

                <button type="submit" className="auth-btn">Sign Up</button>
            </form>

            <p className="redirect-link">Already have an account? <a href="/">Sign in</a></p>
        </div>
    </div>
    </div>
  )
}
