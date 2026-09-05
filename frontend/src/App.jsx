import React from 'react'
import styles from "./App.module.css";
import Navbar from './Component/Navbar/Navbar'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AddTask from './Component/Task/AddTask';
import Tasklist from './Component/Tasklist/Tasklist';
import UpdateTask from './Component/UpdateTask/UpdateTask';
import Login from './Component/Register/Login';
import Signup from './Component/Register/Signup';

import ProtectedRoute from "./Component/ProtectedRoute";
import RedirectIfAuth from "./Component/RedirectIfAuth";


const App = () => {
  return (
    <div className={styles.App}>
      <Router>
        <Navbar />

        <Routes>
          <Route path='/' element={ <ProtectedRoute> <Tasklist/> </ProtectedRoute> } />
          <Route path='/add' element={<ProtectedRoute> <AddTask/> </ProtectedRoute> } />
          <Route path='/update/:id' element={ <ProtectedRoute> <UpdateTask/> </ProtectedRoute> } />
          <Route path='/login' element={ <RedirectIfAuth> <Login/> </RedirectIfAuth>} />
          <Route path='/signup' element={ <RedirectIfAuth> <Signup/> </RedirectIfAuth> } />

          <Route path="*" element={<div className={styles.notFound}> Page Not Available! <Link className={styles.link} to="/">Back to home</Link> </div>} />
        </Routes>

      </Router>
    </div>
  )
}

export default App