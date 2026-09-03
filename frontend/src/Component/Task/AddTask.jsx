import React, { useState } from 'react'
import styles from "./AddTask.module.css";
import {useNavigate} from 'react-router-dom';

const AddTask = () => {

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
    console.log(data);

    let result = await fetch("http://localhost:3000/task/add", {
      method:"Post",
      body:JSON.stringify(data),
      headers:{
        "Content-Type" : "Application/Json",
      }
    });

    const resultData = await result.json();
    
    if(resultData){
      console.log("Task Created Successfully!");
      navigate("/");
    }
  }


  return (
    <div className={styles.main}>
      <h1>Add New Task</h1>
    <div className={styles.container} >

        <form className={styles.data} onSubmit={handleSubmit}>

            <label htmlFor='title'>Title</label>
            <input type='text' id='title' name='title' placeholder='Enter Title' value={data.title} onChange={handleChange}/> 

            <label htmlFor='desc'>Task</label>
            <textarea id='desc' name='desc' placeholder='Enter Task' rows={4} value={data.desc} onChange={handleChange}/>
             
            <div className={styles.btn}>
            <button className={styles.submit}> Add </button>
            </div>
            
        </form>

    </div>
    </div>
  )
}

export default AddTask