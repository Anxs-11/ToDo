import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from "./pages/home.jsx"
import Profile from "./pages/profile.jsx"
import Login from "./pages/login.jsx"
import Register from "./pages/register.jsx"
import Header from "./components/header.jsx"

import { useContext, useEffect } from "react"
import {  Toaster } from "react-hot-toast"
import axios from "axios"
import { Context, server } from "./main.jsx"

function App() {
  
  const {setuser,setisAuthenticated,setloader} = useContext(Context);
  
  useEffect(()=>{
    setloader(true)
    axios.get(`${server}/user/me`,{
      withCredentials:true,
    }).then(res=>{
      setuser(res.data.user);
      setisAuthenticated(true)
      setloader(false)
    }).catch((error)=>{
    setuser({});
    setisAuthenticated(false)
    setloader(false)
    })
  },[])

  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>} />
      </Routes>
      <Toaster/>
    </Router>
  )
}

export default App
