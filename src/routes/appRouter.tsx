import AuthLayout from "@/components/layouts/authLayout"
import ProtectedLayout from "@/components/layouts/protectedLayout"
import SidebarLayout from "@/components/layouts/sidebarLayout"
import AgendaPage from "@/pages/agendaPage"
import LoginPage from "@/pages/auth/loginPage"
import RegisterPage from "@/pages/auth/registerPage"
import ProfilePage from "@/pages/profile/profilePage"
import type { FC } from "react"
import { Route, Routes } from "react-router-dom"

const AppRouter: FC = () => {
    return (
        <Routes>
            <Route element={<AuthLayout />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
            </Route>
            <Route element={<ProtectedLayout />}>
                <Route element={<SidebarLayout />}>
                    <Route path="/" element={<AgendaPage />} />
                    <Route path="/agenda" element={<AgendaPage />} />

                    <Route path="/profile" element={<ProfilePage />} />
                </Route>
            </Route>
        </Routes>
    )
}

export default AppRouter