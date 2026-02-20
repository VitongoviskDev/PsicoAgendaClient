import { useStaffAccess } from "@/hooks/auth/useStaffAccess";
import { StaffProfileRole } from "@/lib/types/user/user";
import type { FC, ReactNode } from "react";

interface StaffRoleGuardProps {
    children: ReactNode;
    /**
     * Array of specific roles allowed to see the children.
     */
    allowedRoles?: StaffProfileRole[];
    /**
     * Minimum role required based on hierarchy (OWNER > ADMIN > EMPLOYEE).
     */
    minRole?: StaffProfileRole;
    /**
     * Component or element to render if validation fails.
     */
    fallback?: ReactNode;
}

/**
 * StaffRoleGuard Component
 * 
 * Used to conditionally render content based on the authenticated staff user's role.
 * Uses useStaffAccess hook internally.
 */
const StaffRoleGuard: FC<StaffRoleGuardProps> = ({
    children,
    allowedRoles,
    minRole,
    fallback = null
}) => {
    const hasAccess = useStaffAccess({ allowedRoles, minRole });

    if (!hasAccess) {
        return <>{fallback}</>;
    }

    return <>{children}</>;
};

export default StaffRoleGuard;
