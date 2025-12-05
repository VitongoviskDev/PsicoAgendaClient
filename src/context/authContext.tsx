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
    LoginResponse,
    MePayload,
    RegisterPayload,
} from "@/lib/types/auth";

import { useRegisterOwner } from "@/hooks/auth/useRegister";
import type {
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

    loginUser: (payload: LoginPayload) => Promise<void>;
    logoutUser: () => void;
    registerOwner: (payload: RegisterPayload) => Promise<void>;
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
    const registerOwnerMutation = useRegisterOwner();

    const updateUserMutation = useUpdateUser();


    const clearSessionData = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");

        setUser(null);
        setToken(null);
    };

    async function loginUser(payload: LoginPayload) {
        try {
            const response = await loginMutation.mutateAsync(payload);

            setToken(response.data.access_token);
            localStorage.setItem("token", response.data.access_token);

            onLogin(response)

            navigate("/");
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

    const onLogin = (data: LoginResponse) => {
        setUser(data.data.user);
        localStorage.setItem("user", JSON.stringify(data.data.user));

        // changeCurrentEnterprise(data.enterprise);
        // setPreferences(data.settings)

        // const role: Role = {
        //     role: data.enterprise.role!
        // }
        // setRole(role)
    }

    async function registerOwner(payload: RegisterPayload) {
        try {
            const response = await registerOwnerMutation.mutateAsync(payload);

            // localStorage.setItem("user", JSON.stringify(response.data.user));
            // localStorage.setItem("token", response.data.access_token);
            // setToken(response.data.access_token);

            // setUser(response.data.user);

            // navigate("/email-verification");
            navigate("/login");
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
        alert("")
        // await AuthService.logout();
        onLogout();
    }

    function onLogout() {
        navigate("/login");
        clearSessionData();
    }

    setLogoutHandler(onLogout);

    async function updateUser(payload: UpdateUserPayload) {
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

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                loginUser,
                logoutUser,
                registerOwner,
                recoveryPasswordUser,
                getMe,
                updateUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
