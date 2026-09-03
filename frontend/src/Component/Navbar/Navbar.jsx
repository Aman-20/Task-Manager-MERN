import React from 'react'
import {Link} from "react-router-dom";
import styles from "./Navbar.module.css"

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
        <div className={styles.title}>Task Manager</div>

        <ul className={styles.list}>
            <li><Link to="/">List</Link></li>
            <li><Link to="/add">Add task</Link></li>
        </ul>

    </nav>
  )
}

export default Navbar