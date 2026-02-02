import { AuthProvider } from '@/context/authContext';
import { ClinicProvider } from '@/context/clinicContext';
import { DialogProvider } from '@/context/dialogContext';
import { HeaderProvider } from '@/context/headerContext';
import { PatientProvider } from '@/context/patientContext';
import { StepperProvider } from '@/context/stepperContext';
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
        <>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <DialogProvider>
                        <ClinicProvider>
                            <HeaderProvider>
                                <AuthProvider>
                                    <PatientProvider>
                                        <StepperProvider>
                                            <Toaster />
                                            {children}
                                        </StepperProvider>
                                    </PatientProvider>
                                </AuthProvider>
                            </HeaderProvider>
                        </ClinicProvider>
                    </DialogProvider>
                </BrowserRouter>
            </QueryClientProvider>
        </>
    )
}

export default Providers