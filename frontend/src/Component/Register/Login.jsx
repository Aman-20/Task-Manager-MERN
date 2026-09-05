import React, { useState } from 'react'
import styles from "../Task/AddTask.module.css"
import { Link, useNavigate } from "react-router-dom";

import {useAuth} from "../Context/AuthContext";
import {API_URL} from "../../config";

const Login = () => {
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
        console.log(data);

        const register = await fetch(`${API_URL}/login`, {
            method:"POST",
            headers:{"Content-Type":"Application/Json"},
            body:JSON.stringify(data),
            credentials:"include",
        });

        const result = await register.json();

        if(result.success){
            console.log(result);
            await fetchAuth();
            navigate("/")
        } else {
            console.log("unable to login! Some error occured");
        }
    }

  return (
    <div className={styles.main}>
    <h1>Login</h1>
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