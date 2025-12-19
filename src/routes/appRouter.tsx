import Developing from "@/components/common/Developing"
import AuthLayout from "@/components/layouts/authLayout"
import ProtectedLayout from "@/components/layouts/protectedLayout"
import PublicLayout from "@/components/layouts/publicLayout"
import SidebarLayout from "@/components/layouts/sidebarLayout"
import AgendaPage from "@/pages/App/agendaPage"
import DashboardPage from "@/pages/App/dashboardPage"
import PatientsOverviewTab from "@/pages/App/patients/patientsOverviewTab"
import PatientsPage from "@/pages/App/patientsPage"
import ProfilePage from "@/pages/App/profile/profilePage"
import CompleteRegistrationPage from "@/pages/auth/completeRegistration/completeRegistrationPage"
import CompleteRegistrationStepAddress from "@/pages/auth/completeRegistration/steps/completeRegistrationStepAddress"
import CompleteRegistrationStepClinic from "@/pages/auth/completeRegistration/steps/completeRegistrationStepClinic"
import CompleteRegistrationClinicStep from "@/pages/auth/completeRegistration/steps/completeRegistrationStepClinic"
import CompleteRegistrationStepProfile from "@/pages/auth/completeRegistration/steps/completeRegistrationStepProfile"
import CompleteRegistrationStepTeam from "@/pages/auth/completeRegistration/steps/completeRegistrationStepTeam"
import LoginPage from "@/pages/auth/loginPage"
import RegisterPage from "@/pages/auth/registerPage"
import NotFoundPage from "@/pages/notFoundPage"
import type { FC } from "react"
import { Navigate, Route, Routes } from "react-router-dom"

const AppRouter: FC = () => {
    return (
        <Routes>
            <Route element={<PublicLayout />}>
                <Route element={<AuthLayout />}>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                </Route>
            </Route>
            <Route element={<ProtectedLayout />}>
                <Route path="/pre-registration" element={<CompleteRegistrationPage />}>
                    <Route index element={<Navigate to="profile" replace />} />
                    <Route path="profile" element={<CompleteRegistrationStepProfile />} />
                    <Route path="address" element={<CompleteRegistrationStepAddress />} />
                    <Route path="clinic" element={<CompleteRegistrationStepClinic />} />
                    <Route path="team" element={<CompleteRegistrationStepTeam />} />
                </Route>

                <Route element={<SidebarLayout />}>
                    <Route index path="/" element={<DashboardPage />} />
                    <Route path="/agenda" element={<AgendaPage />} />

                    <Route path="/patients" element={<PatientsPage />}>
                        <Route index element={<Navigate to="overview" replace />} />
                        <Route path="overview" element={<PatientsOverviewTab />} />
                        <Route path="sessions" element={<Developing />} />
                        <Route path="payments" element={<Developing />} />
                        <Route path="notes" element={<Developing />} />
                        <Route path="records" element={<Developing />} />
                    </Route>

                    <Route path="/profile" element={<ProfilePage />} />
                </Route>
            </Route>
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    )
}

export default AppRouter