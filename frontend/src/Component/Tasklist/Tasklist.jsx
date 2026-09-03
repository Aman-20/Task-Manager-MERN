import React, { useEffect, useState } from 'react'
import styles from "./Tasklist.module.css";
import {Link} from 'react-router-dom';

const Tasklist = () => {

    const [data, setdata] = useState();
    const [selectTask, setselectTask] = useState([]);


    const getTaskList = async () => {
        const list = await fetch("http://localhost:3000/task");
        const listData = await list.json();

        console.log(listData);

        if (listData.success) {
            setdata(listData.tasks);
        }
    };

    
    useEffect(() => {
        getTaskList();
    }, []);


    const deleteTask = async(id) => {
        const result = await fetch(`http://localhost:3000/task/delete/${id}`, { method:"DELETE"});
        const task = await result.json();

        if(task.success){
            console.log("SUCCESS: task deleted");
            getTaskList();
        } else {
            console.log("ERROR: task not deleted");
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
            const result = await fetch("http://localhost:3000/task/delete-multiple", {
                method:"DELETE",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({ids:selectTask}),
            });
            const response = await result.json();
            if(response.success){
                console.log("selected items is deleted!");
                setselectTask([]);
                getTaskList();
            } else {
                console.log("Unable to delete selected items!");
            }
        } catch(err){
            console.log(err);
        }
    }


    return (
        <div className={styles.container}>
            <h1>Task List</h1>

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