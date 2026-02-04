import { useAuthContext } from '@/hooks/context/useAuthContext';
import type { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const RegistrationLayout: FC = () => {
    const { user } = useAuthContext();

    if (user?.status !== "PENDING_EMAIL_VERIFICATION" &&
        user?.status !== "PENDING_REGISTARTION") {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />
};

export default RegistrationLayout;
