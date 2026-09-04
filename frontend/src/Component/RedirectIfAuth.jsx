import { Navigate } from "react-router-dom";
import { useAuth } from "./Context/AuthContext";

export default function RedirectIfAuth({ children }) {
    const { user, loading } = useAuth();

    if (loading) {
        return <h1>Loading...</h1>
    };

    if (user) return <Navigate to="/" replace />; // already logged in, don't show login/signup

    return children;
}