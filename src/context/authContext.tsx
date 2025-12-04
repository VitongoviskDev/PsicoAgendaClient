import { setLogoutHandler } from "@/lib/apis/client";
import { useLogin } from "@/hooks/auth/useLogin";
import { useRegister } from "@/hooks/auth/useRegister";

// import { useEnterprise } from "@/hooks/enterprise/useEnterprise";
// import { usePreference } from "@/hooks/preferences/usePreferences";
// import { useRoleContext } from "@/hooks/context/useRoleContext";
import { useUpdateUser } from "@/hooks/user/useUpdateUser";
import { AuthService } from "@/lib/services/auth.service";

import type {
    ForgotPasswordPayload,
    LoginCustomError,
    LoginPayload,
    LoginResponse,
    MePayload,
    RegisterPayload,
} from "@/lib/types/auth";

import type {
    User
} from "@/lib/types/user";
import { createContext, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import type {
    UpdateUserPayload,
    UpdateUserResponse
} from "@/lib/types/user";

interface AuthContextType {
    user: User | null;
    token: string | null;

    loginUser: (payload: LoginPayload) => Promise<void>;
    logoutUser: () => void;
    registerUser: (payload: RegisterPayload) => Promise<void>;
    recoveryPasswordUser: (payload: ForgotPasswordPayload) => Promise<void>;
    getMe: (payload?: MePayload) => Promise<void>

    updateUser: (payload: UpdateUserPayload) => Promise<UpdateUserResponse>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {


    const [user, setUser] = useState<User | null>(() => {
        const storedUser = localStorage.getItem("user");
        return !!storedUser ? (JSON.parse(storedUser) as User) : null;
    });
    const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));

    // const { changeCurrentEnterprise } = useEnterprise();
    // const { setPreferences } = usePreference();
    // const { setRole } = useRoleContext();

    const navigate = useNavigate();
    const loginMutation = useLogin();
    const registerMutation = useRegister();

    const updateUserMutation = useUpdateUser();


    const clearSessionData = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");

        setUser(null);
        setToken(null);
    };

    async function loginUser(payload: LoginPayload) {
        try {
            const data = await loginMutation.mutateAsync(payload);

            setToken(data.access_token);
            localStorage.setItem("token", data.access_token);

            onLogin(data)

            navigate("/");
        } catch (err) {
            console.log("ERROR: ", err)
            const error = err as LoginCustomError;
            if (error && error.user) {
                setUser(error.user);
                localStorage.setItem("user", JSON.stringify(error.user));
            }
            throw err;
        }
    }

    const onLogin = (data: LoginResponse) => {
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));

        // changeCurrentEnterprise(data.enterprise);
        // setPreferences(data.settings)

        // const role: Role = {
        //     role: data.enterprise.role!
        // }
        // setRole(role)
    }

    async function registerUser(payload: RegisterPayload) {
        try {
            const data = await registerMutation.mutateAsync(payload);

            localStorage.setItem("user", JSON.stringify(data.user));
            localStorage.setItem("token", data.access_token);
            setToken(data.access_token);

            setUser(data.user);

            navigate("/email-verification");
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

    async function getMe(payload?: MePayload) {
        try {
            const filteredPayload = {
                ...payload,
                token: payload?.token || token || ""
            };
            const data = await AuthService.me(filteredPayload);

            setToken(filteredPayload.token);
            localStorage.setItem("token", filteredPayload.token);

            onLogin(data);

        } catch (err) {
            throw err;
        }
    }

    async function logoutUser() {
        await AuthService.logout();
        onLogout();
    }

    function onLogout() {
        navigate("/login");
        clearSessionData();
    }

    setLogoutHandler(onLogout);

    async function updateUser(payload: UpdateUserPayload) {
        try {
            const data = await updateUserMutation.mutateAsync(payload);

            console.log("DATA:", data)
            setUser(data.user);
            localStorage.setItem("user", JSON.stringify(data.user));

            return data;
        } catch (err) {
            throw err;
        }
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                loginUser,
                logoutUser,
                registerUser,
                recoveryPasswordUser,
                getMe,
                updateUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
