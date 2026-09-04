import React from 'react'
import {Link, useNavigate} from "react-router-dom";
import styles from "./Navbar.module.css";
import {useAuth} from "../Context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const {user, setUser, loading} = useAuth();

  const handleLogout = async(req, res)=>{
    await fetch("http://localhost:3000/logout", {
      credentials:"include",
    });
    setUser(null);
    navigate("/login");
  }

  if(loading) return null;

  return (
    <nav className={styles.navbar}>
        <div className={styles.title}>Task Manager</div>

        <ul className={styles.list}>

          {user? (
            <>
            <li><Link to="/">List</Link></li>
            <li><Link to="/add">Add task</Link></li>
            <li><button onClick={handleLogout}>Logout</button></li>
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