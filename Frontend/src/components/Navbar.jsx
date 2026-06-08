import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';

export default function Navbar({setUser}) {

  const userData =localStorage.getItem("user")
  const user = userData
  ? JSON.parse(userData)
  : null;
  const nevigate = useNavigate();
  const handleLogout = ()=>{
    localStorage.removeItem("token") 
    localStorage.removeItem("user") 
   setUser(null);
   toast.success("Logout Succesful")
   nevigate("/")
  }
  return (
    <>
    <div className='navbar'>
       <div className='usernamenav'>
       <h2>Welcome, {user?.username}</h2> 
       </div>
       <div className='btndiv'>
      <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
    </>
  )
}
