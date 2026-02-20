import { useAuthContext } from '@/hooks/context/useAuthContext';
import { UserStatus } from '@/lib/types/user/user';
import type { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const RegistrationRoute: FC = () => {
    const { user } = useAuthContext();

    if (
        user?.status !== UserStatus.PENDING_EMAIL_VERIFICATION &&
        user?.status !== UserStatus.PENDING_REGISTRATION &&
        user?.status !== UserStatus.EMAIL_VERIFIED &&
        user?.status !== UserStatus.ACTIVE
    ) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />
};

export default RegistrationRoute;
