import DefaultContainer from '@/components/common/DefaultContainer';
import PatientProfileCard from '@/components/common/pages/patients/patientProfileCard';
import PatientsListContainer from '@/components/common/pages/patients/PatientsListContainer';
import { useHeaderContext } from '@/hooks/context/useHeaderContext';
import type { Patient } from '@/lib/types/patient';
import { UserStatus } from '@/lib/types/user';
import { useEffect, type FC } from 'react';


const PatientsPage: FC = () => {
    const { setPageTitle, setPageDescription } = useHeaderContext();

    useEffect(() => {
        setPageTitle("Pacientes")
        setPageDescription("Cadastre e gerencie os dados de seus pacientes.")
    }, [])
    return (
        <DefaultContainer className='flex-col xl:flex-row gap-8'>
            <PatientsListContainer patients={patients} className='xl:max-w-md' />
            <PatientProfileCard className='flex-1' />
        </DefaultContainer>
    )
}

const patients: Patient[] = [
    {
        user: {
            id: 'patient-1',
            name: 'Maria Silva',
            email: 'maria_silva@email.com',
            phone: '11971677642',
            cpf: '32286415897',
            status: UserStatus.ACTIVE,
        },
        sessions: 15,
        status: "active"
    },
    {
        user: {
            id: 'patient-2',
            name: 'João Cardoso',
            email: 'joao_cardoso@email.com',
            phone: '11971677642',
            cpf: '32286415897',
            status: UserStatus.ACTIVE,
        },
        sessions: 25,
        status: "active"
    },
    {
        user: {
            id: 'patient-3',
            name: 'Manuel de Souza',
            email: 'manuel_souza@email.com',
            phone: '11971677642',
            cpf: '32286415897',
            status: UserStatus.ACTIVE,
        },
        sessions: 25,
        status: "active"
    },
]

export default PatientsPage