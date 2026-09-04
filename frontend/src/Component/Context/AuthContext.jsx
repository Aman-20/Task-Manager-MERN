import { createContext, useContext } from 'react'

const AuthContext = createContext();

function useAuth(){
    const context = useContext(AuthContext);
    if(!context){
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

export {AuthContext, useAuth};