import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Badge from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { usePatientContext } from '@/hooks/context/usePatientContext';
import { cn, getInitials, type DefaultInterface } from '@/lib/utils';
import type { FC } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import AutoHeightContainer from '../../autoHeightContainer';
import AddPatientDialog from '../../Modal/AddPatientDialog';
import { useDialogContext } from '@/hooks/context/useDialogContext';

interface PatientProfileCardProps extends DefaultInterface {

}

const PatientProfileCard: FC<PatientProfileCardProps> = ({ className }) => {
    const { selectedPatient: patient } = usePatientContext();
    if (!patient) return;

    const navigate = useNavigate();

    const handleTabClick = (value: string) => {
        navigate("/patients/" + value);
    }

    const tabItemsStyle = `
        flex-1 rounded-none border-0 not-last:border-r-1 border-zinc-200 
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
                <Badge color='green'>{patient.status}</Badge>
            </CardHeader>
            <CardContent className='space-y-4'>
                <Tabs defaultValue="/overview" onValueChange={handleTabClick} className='rounded-md overflow-hidden'>
                    <TabsList className='flex w-full p-0 not-last:'>
                        <TabsTrigger className={tabItemsStyle} value="/overview" >Geral</TabsTrigger>
                        <TabsTrigger className={tabItemsStyle} value="/sessions">Sessões</TabsTrigger>
                        <TabsTrigger className={tabItemsStyle} value="/payments">Pagamentos</TabsTrigger>
                        <TabsTrigger className={tabItemsStyle} value="/notes">Notas</TabsTrigger>
                        <TabsTrigger className={tabItemsStyle} value="/records">Registros</TabsTrigger>
                    </TabsList>
                </Tabs>
                <AutoHeightContainer>
                    <Outlet />
                </AutoHeightContainer>
            </CardContent>
        </Card>
    )
}

export default PatientProfileCard