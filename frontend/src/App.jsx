import React from 'react'
import styles from "./App.module.css";
import Navbar from './Component/Navbar/Navbar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddTask from './Component/Task/AddTask';
import Tasklist from './Component/Tasklist/Tasklist';
import UpdateTask from './Component/UpdateTask/UpdateTask';

const App = () => {
  return (
    <div className={styles.App}>
      <Router>
        <Navbar />

        <Routes>
          <Route path='/' element={ <Tasklist/> } />
          <Route path='/add' element={ <AddTask/> } />
          <Route path='/update/:id' element={ <UpdateTask/> } />
        </Routes>

      </Router>
    </div>
  )
}

export default App