import { AuthProvider } from '@/context/authContext';
import { DialogProvider } from '@/context/dialogContext';
import { HeaderProvider } from '@/context/headerContext';
import { queryClient } from '@/lib/apis/queryClient';
import { QueryClientProvider } from '@tanstack/react-query';
import React, { type FC } from 'react';
import { BrowserRouter } from 'react-router-dom';


interface ProvidesProps {
    children: React.ReactNode;
}
const Providers: FC<ProvidesProps> = ({ children }) => {
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <DialogProvider>
                        <HeaderProvider>
                            <AuthProvider>
                                {children}
                            </AuthProvider>
                        </HeaderProvider>
                    </DialogProvider>
                </BrowserRouter>
            </QueryClientProvider>
        </>
    )
}

export default Providers