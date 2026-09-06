import React, { useEffect, useState } from 'react'
import styles from "./Tasklist.module.css";
import {Link} from 'react-router-dom';
import {API_URL} from "../../config";

const Tasklist = () => {
    const [error, setError] = useState("");
    const [info, setInfo] = useState("");

    const [data, setdata] = useState();
    const [selectTask, setselectTask] = useState([]);


    const getTaskList = async () => {
        const list = await fetch(`${API_URL}/task`, {
            credentials:"include",
        });
        const listData = await list.json();

        if (listData.success) {
            setdata(listData.tasks);
            setInfo(listData.message || "Task list fetched successfully!");
        } else {
            setError(listData.message || "unable to get Task List from mongoDB");
        }
    };

    
    useEffect(() => {
        getTaskList();
    }, []);


    const deleteTask = async(id) => {
        const result = await fetch(`${API_URL}/task/delete/${id}`, { 
            method:"DELETE",
            credentials:"include",
        });
        const task = await result.json();

        if(task.success){
            setInfo( task.message || "Task deleted successfully!");
            getTaskList();
        } else {
            setError( task.message || "Task not deleted");
        }
    }


    const selectAll = (e) =>{
        if(e.target.checked){
            const items = data.map((item)=>item._id);
            setselectTask(items);
        } else {
            setselectTask([]);
        }
    }


    const selectSingle = (id) =>{
        if(selectTask.includes(id)){
            const items = selectTask.filter((item)=>item!=id);
            setselectTask(items);
        } else {
            setselectTask([id, ...selectTask]);
        }
    }


    const deleteSelected = async() =>{
        try{
            const result = await fetch(`${API_URL}/task/delete-multiple`, {
                method:"DELETE",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({ids:selectTask}),
                credentials:"include",
            });
            const response = await result.json();

            if(response.success){
                setInfo( response.message || "selected task is deleted")
                setselectTask([]);
                getTaskList();
            } else {
                setError(response.message || "unable to delete selected task")
            }
        } catch(err){
            console.log(err);
        }
    }


    return (
        <div className={styles.container}>
            <h1>Task List</h1>

            {error && <p>{error}</p>}
            {info && <p>{info}</p>}

            {selectTask.length > 0 && <button onClick={deleteSelected} className={styles.deleteAll}>Delete({selectTask.length})</button>}

            <table>
                <thead>
                <tr>
                    <th> <input type='checkbox' onChange={selectAll}/> </th>
                    <th> S.No </th>
                    <th> Title </th>
                    <th> Description </th>
                    <th> Action </th>
                </tr>
                </thead>

                <tbody>
                {data && data.map((val, idx) => {
                    return (
                        <tr key={idx}>
                            <td> <input type='checkbox' onChange={()=>{selectSingle(val._id)}} checked={selectTask.includes(val._id)}/> </td>
                            <td> {idx + 1} </td>
                            <td> {val.title}  </td>
                            <td> {val.desc} </td>
                            <td>
                                <div className={styles.btns}>
                                <button onClick={()=>{deleteTask(val._id)}} className={styles.delete}>Delete</button>
                                <Link to={`/update/${val._id}`} className={styles.update}>Update</Link>
                                </div>
                            </td>
                        </tr>
                    );
                })}
                </tbody>

            </table>
        </div>
    )
}

export default Tasklist