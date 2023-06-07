import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/app.scss'
import {createContext} from "react"
export const server ="https://todoapp-f0yg.onrender.com/api/v1";
export const Context=createContext({isAuthenticated:false})
const Appwrapper=()=>{
  const [isAuthenticated,setisAuthenticated]=useState(false);
  const [loading,setloader]=useState(false);
  const [user,setuser]=useState(false);

  return (
    <Context.Provider value={{
      isAuthenticated,
      setisAuthenticated, loading, setloader, user, setuser

    }}>
      <App />
    </Context.Provider>
  )
}
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Appwrapper/>
  </React.StrictMode>,
)
