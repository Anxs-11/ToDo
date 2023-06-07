import React, { useContext } from 'react'
// import "../styles/header.scss"
import '../styles/header.scss'
import {Link} from "react-router-dom"
import { Context, server } from '../main'
import axios from 'axios'
import { toast } from 'react-hot-toast'

const Header = () => {
  const {isAuthenticated,setisAuthenticated,loading,setloader}=useContext(Context);
  
  const logoutHandler = async () => {
    setloader(true);
    try {
      await axios.get(`${server}/user/logout`, 
       { withCredentials: true,}
      )
      toast.success("Logged Out Successfully")
      setisAuthenticated(false)
      setloader(false)
    } catch (error) {
      toast.error(error.response.data.message);
      setisAuthenticated(true)
      setloader(false)
    }
  }
  return (
    <nav className="header">
        <div>
            <h2>ToDo</h2>
        </div>
        <article>
            <Link to={"/"}>Home</Link>
            <Link to={"/profile"}>Profile</Link>
           {
           isAuthenticated ? <button disabled={loading} onClick={logoutHandler} className="btn">Logout</button> :
            <Link to={"/login"}>Login</Link>
            
           }
           
        </article>
    </nav>
  )
}

export default Header