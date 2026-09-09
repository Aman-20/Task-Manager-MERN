import React, { useEffect, useState } from 'react'
import styles from "./Tasklist.module.css";
import {Link} from 'react-router-dom';
import {API_URL} from "../../config";

const Tasklist = () => {
    const [error, setError] = useState("");
    const [info, setInfo] = useState("");

    const [data, setdata] = useState([]);
    const [selectTask, setselectTask] = useState([]);

    // sorting 
    const [order, setorder] = useState("new");


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

    // sort data
    const sortData = [...data].sort((a,b)=>{
        const dataA = new Date(a.createdAt);
        const dataB = new Date(b.createdAt);
        return order === "new"? dataB - dataA : dataA - dataB
    });


    //search function 
    const [search , setSearch] = useState("");
    const filterData = sortData.filter((item)=>item.title.toLowerCase().includes(search.toLowerCase()));   

    //pagination 
    const [currpage, setcurrpage] = useState(1);
    const itemPerPage = 5;

    const totalPage = Math.ceil(filterData.length / itemPerPage);
    const stIndex = (currpage-1) * itemPerPage;
    const endIndex = stIndex + itemPerPage;

    const currItems = filterData.slice(stIndex, endIndex);

    // pagination button function
    const goToPage = (page) => {
        if(page < 1 || page > totalPage) return;
        setcurrpage(page);
    }


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
            const items = currItems.map((item)=>item._id);
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

            <input type='text' value={search} placeholder='🔎 Search your task' 
            onChange={(e)=> {
                setSearch(e.target.value); 
                setcurrpage(1); 
            }}/>

            {error && <p className={styles.error}>{error}</p>}
            {info && <p className={styles.success}>{info}</p>}


            <select className={styles.select} value={order} onChange={(e)=>setorder(e.target.value)}>
                <option value="new">Newest</option>
                <option value="old">Oldest</option>
            </select>


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
                {currItems.length === 0? (
                  <tr>
                    <td colSpan={5} style={{ textAlign: "center", height:"50px"}}>No Task Here!</td>
                  </tr>
                ) : 
                (currItems.map((val, idx) => {
                    return (
                        <tr key={idx}>
                            <td> <input type='checkbox' onChange={()=>{selectSingle(val._id)}} checked={selectTask.includes(val._id)}/> </td>
                            <td> {stIndex + idx + 1} </td>
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
                })
            )}
                </tbody>

            </table>

            <div className={styles.page}>
            <button className={styles.submit} onClick={()=>goToPage(currpage-1)} disabled={currpage === 1}>Prev</button>
            <h3> {currpage} of {totalPage} </h3>
            <button className={styles.submit} onClick={()=>goToPage(currpage+1)} disabled={currpage === totalPage}>Next</button>
            </div>

        </div>
    )
}

export default Tasklist