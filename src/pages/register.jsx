import React, { useContext } from 'react'
import "../styles/login.scss"
import { Link,Navigate } from "react-router-dom"
import { useState } from 'react'
import axios from "axios"
import { Context, server } from "../main"
import toast from "react-hot-toast"


const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { isAuthenticated, setisAuthenticated,loading,setloader } = useContext(Context);

    const submitHandler = async (e) => {
        e.preventDefault()
        setloader(true)
        try {
            const { data } = await axios.post(`${server}/user/new`, {
                name,
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
   if(isAuthenticated) return <Navigate to="/"/>

   
    return (

        <div className="login">
            <section>
                <form onSubmit={submitHandler}>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        placeholder="Name"
                        required
                        disabled={loading}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={loading}
                    />
                    <input
                        type="password"
                        required
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={loading}
                    />
                    <button disabled={loading} type="submit">Sign Up</button>
                    <h4>Or</h4>
                    <Link to="/login">Log In</Link>
                </form>
            </section>
        </div>
    )
}

export default Register