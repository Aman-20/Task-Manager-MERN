import { createContext, useContext } from 'react'

const AuthContext = createContext();

function useAuth(){
    const context = useContext(AuthContext);
    if(!context){
        throw new Error("useContext Error Occured");
    }
    return context;
}

export {AuthContext, useAuth};