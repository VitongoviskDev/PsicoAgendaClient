import { useLogin } from "@/hooks/auth/useLogin";
import { setLogoutHandler } from "@/lib/apis/client";

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
import { useCompleteOwnerProfile } from "@/hooks/user/useCompleteOwnerProfile";
import { emit } from "@/lib/eventBus";
import {
    UserStatus,
    type CompleteOwnerProfileCustomError,
    type CompleteOwnerProfilePayload,
    type CompleteOwnerProfileResponse,
    type UpdateUserPayload,
    type UpdateUserResponse,
    type User
} from "@/lib/types/user";
import { createContext, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import type { RegisterUserPayload } from "@/lib/types/user/register-user";

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
    handleCompleteOwnerProfile: (payload: CompleteOwnerProfilePayload) => Promise<CompleteOwnerProfileResponse>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USER_KEY = "auth_user";
const ACCESS_TOKEN_KEY = "auth_access_token";
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
    const completeOwnerProfileMutation = useCompleteOwnerProfile();

    const updateUserMutation = useUpdateUser();

    const clearSessionData = () => {
        localStorage.removeItem(USER_KEY);
        localStorage.removeItem(ACCESS_TOKEN_KEY);

        setUser(null);
        setToken(null);
    };

    async function handleLogin(payload: LoginPayload) {
        try {
            const response = await loginMutation.mutateAsync(payload);

            setUser(response.data.user);
            localStorage.setItem("user", JSON.stringify(response.data.user));

            setToken(response.data.access_token);
            localStorage.setItem("token", response.data.access_token);

            if (response.data.user.status === UserStatus.PENDING_EMAIL_VERIFICATION) {
                navigate("/email-verification")
                return;
            }

            emit("login", {
                clinic: response.data.currentClinic,
                clinics: response.data.clinics
            });

            navigate("/")

        } catch (err) {
            console.log("LOGIN ERROR: ", err)
            const customError = err as LoginForbidenError;
            console.log("LOGIN CUSTOM ERROR: ", customError)

            if (customError.status === 403) {
                setUser(customError.error.user)
                localStorage.setItem(USER_KEY, JSON.stringify(customError.error.user));

                toast.info(customError.message)
                navigate("/email-verification")
                return
            }

            throw err;
        }
    }

    async function handleRegister(payload: RegisterUserPayload) {
        try {
            const response = await registerOwnerMutation.mutateAsync(payload);

            setUser(response.data.user);
            localStorage.setItem("user", JSON.stringify(response.data.user));

            setToken(response.data.access_token);
            localStorage.setItem("token", response.data.access_token);

            navigate("/email-verification")
            return;

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
            localStorage.setItem("user", JSON.stringify(response.data.user));

            setToken(filteredPayload.token);
            localStorage.setItem("token", filteredPayload.token);
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
            localStorage.setItem("user", JSON.stringify(response.data.user));

            return response;
        } catch (err) {
            throw err;
        }
    }

    async function handleCompleteOwnerProfile(payload: CompleteOwnerProfilePayload) {
        try {
            const response = await completeOwnerProfileMutation.mutateAsync(payload);

            setUser(response.data.user);
            localStorage.setItem("user", JSON.stringify(response.data.user));

            return response;
        } catch (err) {
            throw err as CompleteOwnerProfileCustomError;
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
                handleRegister,
                recoveryPasswordUser,
                handleGetMe,
                handleUpdateUser,

                handleCompleteOwnerProfile,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
