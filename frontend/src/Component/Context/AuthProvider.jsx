import React, {useState, useEffect } from 'react'
import {AuthContext} from "./AuthContext";
import {API_URL} from "../../config";

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    async function fetchAuth() {
        try{
            const result = await fetch(`${API_URL}/me`, {
                credentials:"include"
            });
            const data = await result.json();

            console.log(data);
    
            if(data.success){
                setUser(data.user);
                console.log("success fetched data.user", data.user);
            } else {
                setUser(null);
                console.log("unabale to setuser");
            }
        } catch (err){
            setUser(null);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchAuth();
    }, [])
    


  return (
    <AuthContext.Provider value={{user, setUser, loading, fetchAuth}}>{children}</AuthContext.Provider>
  )
}

export default AuthProvider