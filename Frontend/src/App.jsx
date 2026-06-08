import { useEffect, useState } from 'react'
import {BrowserRouter as Router, Routes, Route, Navigate} from  "react-router-dom"
import Navbar from "./components/Navbar"
import Login from "./pages/Login"
import Home from "./pages/Home"
import Register from "./pages/Register"
import axios from "axios"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_URL } from './config'
function App() {
   const [user, setUser] = useState(null);
   const [error, steError] = useState(" ");

   useEffect(()=>{
        const fetchUser = async () =>{

          const token = localStorage.getItem("token");
          if(token)
          {
            try{
                const res = await axios.get(`${API_URL}/api/auth/me`,{
                  headers:{Authorization:`Bearer ${token}`}
                })
                setUser(res.data)
            }
            catch (err) {
                 steError("Failed to fetch user data")
                 localStorage.removeItem("token")
                 setUser(null);
            }
          }
        }
        fetchUser();
   },[])

  return (
    <>
    <Router>
     <Routes>
      <Route path="/home" element={<Home user={user} error= {error} setUser={setUser} />}/>
      <Route path="/" element={user ? <Navigate to="/home"/> : <Login setUser={setUser}/>}/>
      <Route path="/register" element={user ? <Navigate to = "/home"/> : <Register setUser={setUser}/>}/>
     </Routes>
    </Router>
      <ToastContainer position="top-right" autoClose={2000}/>
      </>
  
  )
}

export default App
