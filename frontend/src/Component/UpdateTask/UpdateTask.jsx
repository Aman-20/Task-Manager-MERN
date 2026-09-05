import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from "../Task/AddTask.module.css";
import {API_URL} from "../../config";


const UpdateTask = () => {

    const {id} = useParams();
    const navigate = useNavigate();

    const [formdata, setformdata] = useState({
        title:"",
        desc:"",
    });

    const handleChange = (e) =>{
        setformdata({...formdata, [e.target.name]:e.target.value});
    };

    const fetchData = async(e) =>{
        const result = await fetch(`${API_URL}/task/${id}`, {
            credentials:"include",
        });
        const data = await result.json();
        console.log(data);

        if(data.success){
            setformdata({
                title:data.taskitem.title,
                desc:data.taskitem.desc,
            });
        }

    };

    useEffect(() => {
        fetchData();
    }, [id]);


    const handleUpdate = async(e) =>{
        e.preventDefault();
        const update = await fetch(`${API_URL}/task/update/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formdata),
            credentials:"include",
        });

        const data = await update.json();

        if (data.success) {
            console.log("task updated successfully");
            navigate("/"); 
        } else {
            console.log("update failed");
        }
    }
    

    return (
        <div className={styles.main}>
            <div className={styles.container} >

                <h1>Update Task</h1>

                <form className={styles.data} onSubmit={handleUpdate}>

                    <label htmlFor='title'>Title</label>
                    <input type='text' id='title' name='title' placeholder='Enter Title' value={formdata.title} onChange={handleChange}/>

                    <label htmlFor='desc'>Task</label>
                    <textarea id='desc' name='desc' placeholder='Enter Task' rows={4} value={formdata.desc} onChange={handleChange} />

                    <div className={styles.btn}>
                        <button className={styles.submit}> Update </button>
                    </div>

                </form>

            </div>
        </div>
    )
}


export default UpdateTask