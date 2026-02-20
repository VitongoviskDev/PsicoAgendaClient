import { useAuthContext } from "@/hooks/context/useAuthContext";
import { useProfileContext } from "@/hooks/context/useProfileContext";
import type { User } from "@/lib/types/user/user";
import type { FC, ReactNode } from "react";

type ProfileType = 'staff' | 'psychologist' | 'patient';

interface ProfileGuardProps {
    children: ReactNode;
    /**
     * Requirement of a specific profile to render children.
     */
    requiredProfile?: ProfileType;
    /**
     * Custom validation function that receives all user profiles.
     */
    validation?: (profiles: NonNullable<User['profiles']>) => boolean;
    /**
     * Component or element to render if validation fails.
     */
    fallback?: ReactNode;
}

/**
 * ProfileGuard Component
 * 
 * Used to conditionally render content based on the authenticated user's profile
 * and specific profile data.
 */
const ProfileGuard: FC<ProfileGuardProps> = ({
    children,
    requiredProfile,
    validation,
    fallback = null
}) => {
    const { staff, psychologist, patient } = useProfileContext();

    // If no profiles metadata or validation fails
    if (!staff && !psychologist && !patient) {
        return <>{fallback}</>;
    }

    const profiles = { staff, psychologist, patient };
    // Check if required profile exists and is not null
    if (requiredProfile) {
        const profile = profiles[requiredProfile];
        if (!profile) {
            return <>{fallback}</>;
        }
    }

    // Run custom validation if provided
    if (validation && !validation(profiles)) {
        return <>{fallback}</>;
    }

    return <>{children}</>;
};

export default ProfileGuard;
