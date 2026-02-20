import { useProfileContext } from "@/hooks/context/useProfileContext";
import { StaffProfileRole } from "@/lib/types/user/user";

const ROLE_HIERARCHY: Record<StaffProfileRole, number> = {
    [StaffProfileRole.OWNER]: 2,
    [StaffProfileRole.ADMIN]: 1,
    [StaffProfileRole.EMPLOYEE]: 0,
};

interface UseStaffAccessOptions {
    /**
     * Array of specific roles allowed.
     */
    allowedRoles?: StaffProfileRole[];
    /**
     * Minimum role required based on hierarchy (OWNER > ADMIN > EMPLOYEE).
     * Defaults to EMPLOYEE if not specified.
     */
    minRole?: StaffProfileRole;
}

/**
 * Hook to verify if the authenticated user has staff access based on roles or hierarchy.
 */
export function useStaffAccess({ allowedRoles, minRole = StaffProfileRole.EMPLOYEE }: UseStaffAccessOptions = {}) {
    const { staff } = useProfileContext();

    if (!staff || staff.status !== "ACTIVE") {
        return false;
    }

    // Check specific allowed roles if provided
    if (allowedRoles && !allowedRoles.includes(staff.role)) {
        return false;
    }

    // Check hierarchy
    const userRoleLevel = ROLE_HIERARCHY[staff.role];
    const minRoleLevel = ROLE_HIERARCHY[minRole];

    return userRoleLevel >= minRoleLevel;
}
