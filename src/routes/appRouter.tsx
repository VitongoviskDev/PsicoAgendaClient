import Developing from "@/components/common/Developing"
import AuthLayout from "@/components/layouts/authLayout"
import RegistrationRoute from "@/components/layouts/registrationLayout"
import SidebarLayout from "@/components/layouts/sidebarLayout"
import AgendaPage from "@/pages/App/agendaPage"
import DashboardPage from "@/pages/App/dashboardPage"
import PatientsOverviewTab from "@/pages/App/patients/patientsOverviewTab"
import PatientsPage from "@/pages/App/patientsPage"
import ProfilePage from "@/pages/App/profile/profilePage"
import PersonalProfileTab from "@/pages/App/profile/tabs/personalProfile.tab"
import CompleteRegistrationPage from "@/pages/auth/completeRegistration/completeRegistrationPage"
import EmailVerificationPage from "@/pages/auth/completeRegistration/emailVerificationPage"
import CompleteRegistrationStepAddress from "@/pages/auth/completeRegistration/steps/completeRegistrationStepAddress"
import CompleteRegistrationStepClinic from "@/pages/auth/completeRegistration/steps/completeRegistrationStepClinic"
import CompleteRegistrationStepProfile from "@/pages/auth/completeRegistration/steps/completeRegistrationStepProfile"
import CompleteRegistrationStepTeam from "@/pages/auth/completeRegistration/steps/completeRegistrationStepTeam"
import LoginPage from "@/pages/auth/loginPage"
import RegisterPage from "@/pages/auth/registerPage"
import NotFoundPage from "@/pages/notFoundPage"
import ProtectedRoute from "@/routes/protectedRoute"
import PublicRoute from "@/routes/publicRoute"
import type { FC } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import RegistrationLayout from "./registrationRoute"

const AppRouter: FC = () => {
    return (
        <Routes>
            <Route element={<PublicRoute />}>
                <Route element={<AuthLayout />}>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                </Route>
            </Route>
            <Route element={<RegistrationRoute />}>
                <Route element={<RegistrationLayout />}>
                    <Route path="/email-verification" element={<EmailVerificationPage />} />
                </Route>
            </Route>
            <Route element={<ProtectedRoute />}>

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

                    <Route path="/notifications" element={<NotFoundPage />} />

                    <Route path="/profile" element={<ProfilePage />} >
                        <Route index element={<Navigate to="personal" replace />} />
                        <Route path="personal" element={<PersonalProfileTab />} />
                        <Route path="professional" element={<Developing />} />
                        <Route path="formation" element={<Developing />} />
                        <Route path="profile" element={<Developing />} />
                        <Route path="password" element={<Developing />} />
                    </Route>
                </Route>
            </Route>
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    )
}

export default AppRouter