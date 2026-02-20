import { useLogin } from "@/hooks/auth/useLogin";
import { ACCESS_TOKEN_KEY, setLogoutHandler } from "@/lib/apis/client";

// import { useEnterprise } from "@/hooks/enterprise/useEnterprise";
// import { usePreference } from "@/hooks/preferences/usePreferences";
// import { useRoleContext } from "@/hooks/context/useRoleContext";
import { useUpdateUser } from "@/hooks/user/useUpdateUser";
import { AuthService } from "@/lib/services/auth.service";

import type {
    ForgotPasswordPayload,
    LoginForbidenError,
    LoginPayload,
    MePayload,
} from "@/lib/types/auth";

import { useRegisterUser } from "@/hooks/auth/useRegisterUser";
import { useCompleteProfile } from "@/hooks/user/useCompleteProfile";
import { emit } from "@/lib/eventBus";
import {
    UserStatus,
    type UpdateUserPayload,
    type UpdateUserResponse,
    type User
} from "@/lib/types/user/user";
import type { CompleteProfileCustomError, CompleteProfilePayload, CompleteProfileResponse } from "@/lib/types/user/complete-profile";
import type { RegisterUserPayload } from "@/lib/types/user/register-user";
import { useVerifyEmailVerificationCode } from "@/hooks/auth/useVerifyEmailVerificationCode";
import type { VerifyEmailVerificationPayload } from "@/lib/types/auth/verifyEmailVerificationCode";
import { createContext, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface AuthContextType {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;

    handleLogin: (payload: LoginPayload) => Promise<void>;
    handleLogout: () => void;
    handleRegister: (payload: RegisterUserPayload) => Promise<void>;
    recoveryPasswordUser: (payload: ForgotPasswordPayload) => Promise<void>;
    handleGetMe: (payload?: MePayload) => Promise<void>

    handleUpdateUser: (payload: UpdateUserPayload) => Promise<UpdateUserResponse>;
    handleCompleteProfile: (payload: CompleteProfilePayload) => Promise<CompleteProfileResponse>;
    handleVerifyEmail: (payload: VerifyEmailVerificationPayload) => Promise<void>;

    syncAuthState: (user: User, token?: string) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USER_KEY = "auth_user";

export function AuthProvider({ children }: { children: ReactNode }) {

    const [user, setUser] = useState<User | null>(() => {
        const storedUser = localStorage.getItem(USER_KEY);
        return !!storedUser ? (JSON.parse(storedUser) as User) : null;
    });
    const [token, setToken] = useState<string | null>(() => localStorage.getItem(ACCESS_TOKEN_KEY));

    const isAuthenticated = !!user && !!token;

    const navigate = useNavigate();
    const loginMutation = useLogin();
    const registerOwnerMutation = useRegisterUser();
    const completeProfileMutation = useCompleteProfile();
    const verifyEmailMutation = useVerifyEmailVerificationCode();

    const updateUserMutation = useUpdateUser();

    const syncAuthState = (user: User, token?: string) => {
        setUser(user);
        localStorage.setItem(USER_KEY, JSON.stringify(user));

        if (token) {
            setToken(token);
            localStorage.setItem(ACCESS_TOKEN_KEY, token);
        }
    };

    const clearSessionData = () => {
        localStorage.removeItem(USER_KEY);
        localStorage.removeItem(ACCESS_TOKEN_KEY);

        setUser(null);
        setToken(null);
    };

    async function handleLogin(payload: LoginPayload) {
        try {
            const response = await loginMutation.mutateAsync(payload);

            const tokenValue = response.data.access_token || response.data.onboarding_token;
            syncAuthState(response.data.user, tokenValue);

            if (response.data.user.status === UserStatus.PENDING_EMAIL_VERIFICATION) {
                navigate("/onboarding/email-verification")
                return;
            } else if (
                response.data.user.status === UserStatus.EMAIL_VERIFIED ||
                response.data.user.status === UserStatus.PENDING_REGISTRATION
            ) {
                navigate("/onboarding/pre-registration")
                return;
            }

            if (response.data.access_token) {
                emit("login", {
                    user: response.data.user,
                    clinic: response.data.current_clinic,
                    clinics: response.data.clinics
                });
                navigate("/")
            }

        } catch (err) {
            console.log("LOGIN ERROR: ", err)
            const customError = err as LoginForbidenError;
            console.log("LOGIN CUSTOM ERROR: ", customError)

            if (customError.status === 403) {
                setUser(customError.errors.user)
                localStorage.setItem(USER_KEY, JSON.stringify(customError.errors.user));

                toast.info(customError.message)
                navigate("/onboarding/email-verification")
                return
            }

            throw err;
        }
    }

    async function handleRegister(payload: RegisterUserPayload) {
        try {
            const response = await registerOwnerMutation.mutateAsync(payload);

            const tokenValue = response.data.access_token || response.data.onboarding_token;
            syncAuthState(response.data.user, tokenValue);

            navigate("/onboarding/email-verification")
            return;

        } catch (err) {
            throw err;
        }
    }

    async function handleVerifyEmail(payload: VerifyEmailVerificationPayload) {
        try {
            const response = await verifyEmailMutation.mutateAsync(payload);

            const tokenValue = response.data.access_token || response.data.onboarding_token;
            syncAuthState(response.data.user, tokenValue);

            if (response.data.user.status === UserStatus.EMAIL_VERIFIED || response.data.user.status === UserStatus.PENDING_REGISTRATION) {
                navigate("/onboarding/pre-registration")
            }
        } catch (err) {
            throw err;
        }
    }

    async function recoveryPasswordUser(payload: ForgotPasswordPayload) {
        try {
            await AuthService.forgotPassword(payload);
            toast.success("Password recovery email sent!");
            navigate("/login");
        } catch (err) {
            throw err;
        }
    }

    async function handleGetMe(payload?: MePayload) {
        try {
            const filteredPayload = {
                ...payload,
                token: payload?.token || token || ""
            };
            const response = await AuthService.me(filteredPayload);

            setUser(response.data.user);
            localStorage.setItem(USER_KEY, JSON.stringify(response.data.user));

            setToken(filteredPayload.token);
            localStorage.setItem(ACCESS_TOKEN_KEY, filteredPayload.token);
        } catch (err) {
            throw err;
        }
    }

    async function handleLogout() {
        // await AuthService.logout();
        onLogout();
    }

    function onLogout() {
        emit("logout", {})
        clearSessionData();
    }

    setLogoutHandler(onLogout);

    async function handleUpdateUser(payload: UpdateUserPayload) {
        try {
            const response = await updateUserMutation.mutateAsync(payload);

            console.log("DATA:", response)
            setUser(response.data.user);
            localStorage.setItem(USER_KEY, JSON.stringify(response.data.user));

            return response;
        } catch (err) {
            throw err;
        }
    }

    async function handleCompleteProfile(payload: CompleteProfilePayload): Promise<CompleteProfileResponse> {
        try {
            const response = await completeProfileMutation.mutateAsync(payload);

            const tokenValue = response.data.access_token || response.data.onboarding_token;
            syncAuthState(response.data.user, tokenValue);

            return response;
        } catch (err) {
            throw err as CompleteProfileCustomError;
        }
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                isAuthenticated,

                handleLogin,
                handleLogout,
                recoveryPasswordUser,
                handleGetMe,

                handleRegister,
                handleCompleteProfile,
                handleVerifyEmail,

                handleUpdateUser,
                syncAuthState,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
