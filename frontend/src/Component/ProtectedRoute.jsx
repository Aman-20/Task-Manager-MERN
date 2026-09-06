import React, { useContext } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import {useAuth} from "../Component/Context/AuthContext"


export default function ProtectedRoute({children}){
    
    const {user} = useAuth();

    if(!user){
        return <Navigate to="/login" replace />;
    }

    return children;
}