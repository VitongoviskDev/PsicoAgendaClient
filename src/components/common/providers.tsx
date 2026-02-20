import { ThemeProvider } from "../ui/theme-provider";
import { AuthProvider } from '@/context/authContext';
import { ClinicProvider } from '@/context/clinicContext';
import { DialogProvider } from '@/context/dialogContext';
import { PatientProvider } from '@/context/patientContext';
import { ProfileProvider } from '@/context/profileContext';
import { StepperProvider } from '@/context/stepperContext';
import { BreadCrumbProvider } from '@/context/breadCrumbContext';
import { queryClient } from '@/lib/apis/queryClient';
import { QueryClientProvider } from '@tanstack/react-query';
import React, { type FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from '../ui/sonner';


interface ProvidesProps {
    children: React.ReactNode;
}
const Providers: FC<ProvidesProps> = ({ children }) => {
    return (
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <DialogProvider>
                        <ClinicProvider>
                            <AuthProvider>
                                <ProfileProvider>
                                    <PatientProvider>
                                        <StepperProvider>
                                            <BreadCrumbProvider>
                                                <Toaster />
                                                {children}
                                            </BreadCrumbProvider>
                                        </StepperProvider>
                                    </PatientProvider>
                                </ProfileProvider>
                            </AuthProvider>
                        </ClinicProvider>
                    </DialogProvider>
                </BrowserRouter>
            </QueryClientProvider>
        </ThemeProvider>
    )
}

export default Providers