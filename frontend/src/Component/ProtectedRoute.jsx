import React, { useContext } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import {useAuth} from "../Component/Context/AuthContext"


export default function ProtectedRoute({children}){
    
    const {user, loading} = useAuth();

    if(loading) {
        return <h1>Loading...</h1>
    }

    if(!user){
        return <Navigate to="/login" replace />;
    }

    return children;
}