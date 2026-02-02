import { useAuthContext } from "@/hooks/context/useAuthContext";
import type { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute: FC = () => {
    const { isAuthenticated } = useAuthContext();

    if (isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />
}

export default PublicRoute