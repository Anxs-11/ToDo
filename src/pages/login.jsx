import React, { useContext, useState } from 'react'
import { Link, Navigate } from "react-router-dom"

import "../styles/login.scss"
import { Context, server } from '../main'
import { toast } from 'react-hot-toast'
import axios from 'axios'

const login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { isAuthenticated, setisAuthenticated,loading,setloader } = useContext(Context);
    const submitHandler = async (e) => {
        e.preventDefault()
        setloader(true)
        try {
            const { data } = await axios.post(`${server}/user/login`, {
                email,
                password
            }, {
                headers: {
                    "Content-Type": "application/json",

                },
                withCredentials: true,
            }
            )
            toast.success(data.message)
            setisAuthenticated(true)
            setloader(false)
        } catch (error) {
            toast.error(error.response.data.message);
            
            setisAuthenticated(false)
            setloader(false)
        }
    }
    if (isAuthenticated) return <Navigate to="/" />

    return (
        <div className="login">
            <section>
                <form onSubmit={submitHandler}>
                    <input type="email" placeholder="Email" required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}  
                        disabled={loading}/>
                    <input type="password" required
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} 
                        disabled={loading} />
                    <button disabled={loading} type="submit">Login</button>
                    <h4>Or</h4>
                    <Link to="/register">Sign Up</Link>
                </form>
            </section>
        </div>
    )
}

export default login