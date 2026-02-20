import DefaultPageContainer from '@/components/common/DefaultPageContainer';
import PatientProfileCard from '@/components/common/pages/patients/patientProfileCard';
import PatientsListContainer from '@/components/common/pages/patients/PatientsListContainer';
import { type FC } from 'react';


const PatientsPage: FC = () => {

    return (
        <DefaultPageContainer
            headerType="simple"
            title="Pacientes"
            description="Cadastre e gerencie os dados de seus pacientes."
            breadcrumbs={[
                { label: 'Pacientes', to: '/patients' },
                { label: 'Visão Geral', to: '/patients/overview' }
            ]}
            className='xl:flex-row'
        >
            <PatientsListContainer className='xl:max-w-md' />
            <PatientProfileCard className='flex-1' />
        </DefaultPageContainer>
    )
}

export default PatientsPage
