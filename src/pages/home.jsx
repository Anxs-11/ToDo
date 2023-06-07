import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Context, server } from '../main';
import { toast } from 'react-hot-toast';
import Todoitem from "../components/task"
import { Navigate } from 'react-router-dom';

function home() {
    const [title, settitle] = useState("");
    const [description, setdescription] = useState("");
    const [taskloading, settaskloader] = useState(false);
    const [refresh, setrefresh] = useState(false);
    const [Tasks, setTask] = useState([]);
    const { isAuthenticated} = useContext(Context);
    if(!isAuthenticated) return <Navigate to="/login"/>
    const updateHandler=async(id)=>{
        try {
          const{data}= await axios.put(`${server}/task/${id}`,{},
            {
                withCredentials:true 
            }
         )
            toast.success(data.message)
            setrefresh(prev => !prev)
        } catch (error) {
            toast.error(error.response.data.message)
        }
       
    }
    const deleteHandler=async(id)=>{
        try {
            const { data } = await axios.delete(`${server}/task/${id}`,
                {
                    withCredentials: true
                }
            )
            toast.success(data.message)
            setrefresh(prev => !prev)
        } catch (error) {
            toast.error(error.response.data.message)
        }

    }
    const submitHandler = async (e) => {
        e.preventDefault();
        settaskloader(true);
        try {
            const { data } = await axios.post(`${server}/task/new`, {
                title,
                description
            }, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                }
            }

            )

            toast.success(data.message);
            settitle("")
            setdescription("")
            settaskloader(false);
            setrefresh(prev=>!prev)
        } catch (error) {
            toast.error(error.response.data.message)
            settaskloader(false);
        }
    }
    useEffect(() => {
        axios.get(`${server}/task/my`, {
            withCredentials: true,
        })
            .then((res) => {
                setTask(res.data.tasks);
            }).catch((e) => {
                toast.error(e.response.data.message)
            })
    }, [refresh]);
    return (
        <div className="container">
            <div className="login">
                <section>
                    <form onSubmit={submitHandler}>
                        <input

                            value={title}
                            onChange={(e) => settitle(e.target.value)}
                            type="text"
                            placeholder="Title"
                            required
                        />
                        <input

                            value={description}
                            onChange={(e) => setdescription(e.target.value)}
                            type="text"
                            placeholder="Description"
                            required
                        />
                        <button disabled={taskloading} type="submit">Add Task</button>


                    </form>
                </section>
            </div>
            <section className="todosContainer">
                {
                    Tasks.map(i => (
                        <div key={i._id}>
                            <Todoitem title={i.title} description={i.description} iscompleted={i.isCompleted}
                            updateHandler={updateHandler} deleteHandler={deleteHandler} id={i._id}/>
                        </div>
                    ))
                }
            </section>
        </div>
    )
}

export default home