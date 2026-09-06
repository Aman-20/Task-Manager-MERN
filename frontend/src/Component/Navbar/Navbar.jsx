import React from 'react'
import {Link, useNavigate} from "react-router-dom";
import styles from "./Navbar.module.css";
import {useAuth} from "../Context/AuthContext";
import {API_URL} from "../../config";

const Navbar = () => {
  const navigate = useNavigate();
  const {user, setUser} = useAuth();

  const handleLogout = async(req, res)=>{
    try{
      await fetch(`${API_URL}/logout`, {
        credentials:"include",
      });

    } catch(err){
      console.log(err);
      
    } finally {
      setUser(null);
      navigate("/login");
    }
  }


  return (
    <nav className={styles.navbar}>
        <div className={styles.title}>Task Manager</div>

        <ul className={styles.list}>

          {user? (
            <>
            <li><Link to="/">List</Link></li>
            <li><Link to="/add">Add task</Link></li>
            <li><button onClick={handleLogout} className={styles.btn}>Logout</button></li>
            </>
          ) : (
            <>
            <li><Link to="/signup">Signup</Link></li>
            <li><Link to="/login">Login</Link></li>
            </>
          )}
            
        </ul>

    </nav>
  )
}

export default Navbar