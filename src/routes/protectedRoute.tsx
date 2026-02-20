import { useAuthContext } from '@/hooks/context/useAuthContext';
import { UserStatus } from '@/lib/types/user/user';
import type { FC } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const ProtectedRoute: FC = () => {
    const { user, isAuthenticated } = useAuthContext();
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (user?.status === UserStatus.PENDING_EMAIL_VERIFICATION) {
        if (!location.pathname.startsWith("/onboarding/email-verification"))
            return <Navigate to="/onboarding/email-verification" replace />;
    }

    if (user?.status === UserStatus.EMAIL_VERIFIED || user?.status === UserStatus.PENDING_REGISTRATION) {
        if (!location.pathname.startsWith("/onboarding/pre-registration"))
            return <Navigate to="/onboarding/pre-registration" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
