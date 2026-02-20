import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { usePatientContext } from '@/hooks/context/usePatientContext';
import { cn, getInitials, type DefaultInterface } from '@/lib/utils';
import type { FC } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import AutoHeightContainer from '../../autoHeightContainer';
import ProfileStatusBadge from '../../profile/profileStatusBadge';
import { useBreadCrumbContext } from '@/hooks/useBreadCrumbContext';

interface PatientProfileCardProps extends DefaultInterface {

}

const PatientProfileCard: FC<PatientProfileCardProps> = ({ className }) => {
    const tabs = [
        { label: 'Geral', value: 'overview' },
        { label: 'Sessões', value: 'sessions' },
        { label: 'Pagamentos', value: 'payments' },
        { label: 'Notas', value: 'notes' },
        { label: 'Registros', value: 'records' }
    ]

    const navigate = useNavigate();
    const { setBreadCrumbItems } = useBreadCrumbContext();
    const handleTabClick = (value: string) => {
        const tab = tabs.find(tab => tab.value === value);
        if (!tab) return;
        setBreadCrumbItems([
            { label: 'Pacientes', to: '/patients' },
            { label: tab.label, to: tab.value }
        ])
        navigate(value);
    }

    const { selectedPatient: patient } = usePatientContext();
    if (!patient) return;

    const tabItemsStyle = `
        flex-1 rounded-none border-0 not-last:border-r-1 border-zinc-200 dark:border-zinc-800
        cursor-pointer
        data-[state=active]:bg-primary data-[state=active]:text-white
    `

    return (
        <Card className={cn("", className)}>
            <CardHeader className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                    <Avatar className='size-16'>
                        <AvatarFallback className='text-xl'>{getInitials(patient.user.name)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <CardTitle>{patient.user.name}</CardTitle>
                        <CardDescription>{patient.user.email}</CardDescription>
                    </div>
                </div>
                <ProfileStatusBadge status={patient.status} />
            </CardHeader>
            <CardContent className='space-y-4'>
                <Tabs defaultValue={tabs[0].value} onValueChange={handleTabClick} className='rounded-md overflow-hidden'>
                    <TabsList className='flex w-full p-0 not-last:'>
                        {
                            tabs.map((tab) => (
                                <TabsTrigger key={tab.value} className={tabItemsStyle} value={tab.value} >{tab.label}</TabsTrigger>
                            ))
                        }
                    </TabsList>
                </Tabs>
                <AutoHeightContainer>
                    <Outlet />
                </AutoHeightContainer>
            </CardContent>
        </Card >
    )
}

export default PatientProfileCard