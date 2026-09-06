import React, { useState } from 'react'
import styles from "./AddTask.module.css";
import {useNavigate} from 'react-router-dom';
import {API_URL} from "../../config";

const AddTask = () => {

  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  const [data, setdata] = useState({
    title:"",
    desc:"",
  });

  const navigate = useNavigate(); 

  const handleChange = (e) =>{
    setdata({...data, [e.target.name]:e.target.value});
  }

  const handleSubmit = async(e) => {
    e.preventDefault();

    let result = await fetch(`${API_URL}/task/add`, {
      method:"Post",
      body:JSON.stringify(data),
      headers:{
        "Content-Type" : "Application/Json",
      },
      credentials:"include",
    });

    const resultData = await result.json();
    
    if(resultData.success){
      setInfo( resultData.message || "Task Created Successfully!");

      setTimeout(()=>{
        navigate("/");
      },800);
    
    } else {
      setError( resultData.message || "Unable to create task!");
    }
  }


  return (
    <div className={styles.main}>
      <h1>Add New Task</h1>

      {error && <p>{error}</p>}
      {info && <p>{info}</p>}

    <div className={styles.container} >

        <form className={styles.data} onSubmit={handleSubmit}>

            <label htmlFor='title'>Title</label>
            <input type='text' id='title' name='title' placeholder='Enter Title' value={data.title} onChange={handleChange}/> 

            <label htmlFor='desc'>Task</label>
            <textarea id='desc' name='desc' placeholder='Enter Task' rows={4} value={data.desc} onChange={handleChange}/>
             
            <div className={styles.btn}>
            <button className={styles.submit}> Add-Task </button>
            </div>
            
        </form>

    </div>
    </div>
  )
}

export default AddTask