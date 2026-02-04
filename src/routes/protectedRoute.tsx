import { useAuthContext } from '@/hooks/context/useAuthContext';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import type { FC } from 'react';
import { useClinicContext } from '@/hooks/context/useClinicContext';

const ProtectedRoute: FC = () => {
    const { isAuthenticated, user } = useAuthContext();
    const { currentClinic } = useClinicContext();
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (
        (
            user?.status === "PENDING_REGISTARTION" ||
            currentClinic?.status === 'PENDING_SETUP'
        ) &&
        !location.pathname.startsWith("/pre-registration")
    )
        return <Navigate to="/pre-registration" replace />;
    else if (user?.status === "PENDING_EMAIL_VERIFICATION")
        return <Navigate to="/email-verification" replace />;

    return <Outlet />;
};

export default ProtectedRoute;
