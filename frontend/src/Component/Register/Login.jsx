import React, { useState } from 'react'
import styles from "../Task/AddTask.module.css"
import { Link, useNavigate } from "react-router-dom";

import {useAuth} from "../Context/AuthContext";
import {API_URL} from "../../config";

const Login = () => {
    const [error, setError] = useState("");
    const [info, setInfo] = useState("");

    const navigate = useNavigate();
    const {fetchAuth} = useAuth();

    const [data, setdata] = useState({
        email:"",
        pass:"",
    });

    const handleChange = (e) =>{
        setdata({...data, [e.target.name]:e.target.value})
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();

        const register = await fetch(`${API_URL}/login`, {
            method:"POST",
            headers:{"Content-Type":"Application/Json"},
            body:JSON.stringify(data),
            credentials:"include",
        });

        const result = await register.json();

        if(result.success){
            setInfo("user verified, Redirecting to home page...");
            await fetchAuth();
            
            setTimeout(() => {
                navigate("/");
            },800);

        } else {
            setError(result.message || "some unexpected error occured while login");
        }
    }

  return (
    <div className={styles.main}>
    <h1>Login</h1>

    {error && <p>{error}</p>}
    {info && <p>{info}</p>}

    <div className={styles.container} >

        <form className={styles.data} onSubmit={handleSubmit}>

            <label htmlFor='email'>Email</label>
            <input type='email' id='email' name='email' placeholder='Enter Your Email' onChange={handleChange}/>

            <label htmlFor='pass'>Password</label>
            <input type='password' id='pass' name='pass' placeholder='Enter Your Password' onChange={handleChange}/>
             
            <div className={styles.btn}>
            <button className={styles.submit}> Login </button>
            </div>

            <Link to="/signup" className={styles.link}>Signup</Link>
            
        </form>

    </div>
    </div>
  )
}

export default Login