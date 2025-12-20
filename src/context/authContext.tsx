import { useLogin } from "@/hooks/auth/useLogin";
import { setLogoutHandler } from "@/lib/apis/client";

// import { useEnterprise } from "@/hooks/enterprise/useEnterprise";
// import { usePreference } from "@/hooks/preferences/usePreferences";
// import { useRoleContext } from "@/hooks/context/useRoleContext";
import { useUpdateUser } from "@/hooks/user/useUpdateUser";
import { AuthService } from "@/lib/services/auth.service";

import type {
    ForgotPasswordPayload,
    LoginCustomError,
    LoginPayload,
    MePayload,
    RegisterOwnerPayload
} from "@/lib/types/auth";

import { useRegisterOwner } from "@/hooks/auth/useRegister";
import { useCompleteOwnerProfile } from "@/hooks/user/useCompleteOwnerProfile";
import { emit } from "@/lib/eventBus";
import type {
    CompleteOwnerProfileCustomError,
    CompleteOwnerProfilePayload,
    CompleteOwnerProfileResponse,
    UpdateUserPayload,
    UpdateUserResponse,
    User
} from "@/lib/types/user";
import { createContext, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface AuthContextType {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;

    handleLogin: (payload: LoginPayload) => Promise<void>;
    handleLogout: () => void;
    handleRegisterOwner: (payload: RegisterOwnerPayload) => Promise<void>;
    recoveryPasswordUser: (payload: ForgotPasswordPayload) => Promise<void>;
    handleGetMe: (payload?: MePayload) => Promise<void>

    handleUpdateUser: (payload: UpdateUserPayload) => Promise<UpdateUserResponse>;
    handleCompleteOwnerProfile: (payload: CompleteOwnerProfilePayload) => Promise<CompleteOwnerProfileResponse>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {

    const [user, setUser] = useState<User | null>(() => {
        const storedUser = localStorage.getItem("user");
        return !!storedUser ? (JSON.parse(storedUser) as User) : null;
    });
    const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));

    const isAuthenticated = !!user && !!token;

    const navigate = useNavigate();

    // const { changeCurrentEnterprise } = useEnterprise();
    // const { setPreferences } = usePreference();
    // const { setRole } = useRoleContext();

    const loginMutation = useLogin();
    const registerOwnerMutation = useRegisterOwner();
    const completeOwnerProfileMutation = useCompleteOwnerProfile();

    const updateUserMutation = useUpdateUser();



    const clearSessionData = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");

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

            // updateCurrentClinic(response.data.clinic)
            // updateClinics(response.data.clinics)

            emit("login", {
                clinic: response.data.currentClinic,
                clinics: response.data.clinics
            });

            navigate("/")

        } catch (err) {
            console.log("ERROR: ", err)
            const error = (err as LoginCustomError).error;
            if (error && error.user) {
                setUser(error.user);
                localStorage.setItem("user", JSON.stringify(error.user));
            }
            throw err;
        }
    }

    async function handleRegisterOwner(payload: RegisterOwnerPayload) {
        try {
            const response = await registerOwnerMutation.mutateAsync(payload);

            setUser(response.data.user);
            localStorage.setItem("user", JSON.stringify(response.data.user));

            setToken(response.data.access_token);
            localStorage.setItem("token", response.data.access_token);

            emit("register", {
                clinic: response.data.currentClinic,
                clinics: response.data.clinics
            });

            navigate("/pre-registration")
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
                handleRegisterOwner,
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
