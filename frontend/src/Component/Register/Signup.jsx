import React, { useState } from "react";
import styles from "../Task/AddTask.module.css";
import { Link, useNavigate } from "react-router-dom";
import {API_URL} from "../../config";


const Signup = () => {
    const [error, setError] = useState("");
    const [info, setInfo] = useState("");

    const navigate = useNavigate();

    const [data, setdata] = useState({
        name:"",
        email:"",
        pass:"",
    });

    const handleChange = (e) =>{
        setdata({...data, [e.target.name]:e.target.value})
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();

        const register = await fetch(`${API_URL}/signup`, {
            method:"POST",
            headers:{"Content-Type":"Application/Json"},
            body:JSON.stringify(data),
        });

        const result = await register.json();

        if(result.success){
            setInfo("user created, Redirecting to login page...");

            setTimeout(()=>{
                navigate("/login");
            },800);
            
        } else{
            setError(result.message || "some unexpected error occured while signup");
        }

    }


    return(
    <div className={styles.main}>
    <h1>Signup</h1>

    {error && <p>{error}</p>}
    {info && <p>{info}</p>}

    <div className={styles.container} >

        <form className={styles.data} onSubmit={handleSubmit}>

            <label htmlFor="name">Name</label>
            <input type="name" id="name" name="name" placeholder="Enter Your Name" value={data.name} onChange={handleChange}/>

            <label htmlFor='email'>Email</label>
            <input type='email' id='email' name='email' placeholder='Enter Your Email' value={data.email} onChange={handleChange}/>

            <label htmlFor='pass'>Password</label>
            <input type='password' id='pass' name='pass' placeholder='Enter Your Password' value={data.pass} onChange={handleChange}/>
             
            <div className={styles.btn}>
            <button className={styles.submit}> Add </button>
            </div>

            <Link to="/login" className={styles.link}>Login</Link>

        </form>

    </div>
    </div>
    )
}

export default Signup;