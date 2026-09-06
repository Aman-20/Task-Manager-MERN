import { Navigate } from "react-router-dom";
import { useAuth } from "./Context/AuthContext";

export default function RedirectIfAuth({ children }) {
    const { user } = useAuth();

    if (user) return <Navigate to="/" replace />; // already logged in, don't show login/signup

    return children;
}