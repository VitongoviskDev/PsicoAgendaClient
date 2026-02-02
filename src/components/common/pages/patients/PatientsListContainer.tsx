import { useEffect, type FC } from "react";

interface PatientsListContainerProps extends DefaultInterface {
    patients: Patient[];
}

const PatientsListContainer: FC<PatientsListContainerProps> = ({ patients, className }) => {

    const { selectedPatient, handleChangePatient } = usePatientContext();

    useEffect(() => {
        handleChangePatient(patients[0])
    }, [])

    const { openDialog } = useDialogContext();
    return (
        <Card className={cn("flex flex-col gap-4 p-4", className)}>
            <CardHeader className="p-0 flex items-center justify-between">
                <CardTitle className="flex gap-2"><LuUsers />Pacientes</CardTitle>
                <Button onClick={() => openDialog("patients-create-patient")}><LuUserPlus />Paciente</Button>
            </CardHeader>
            <FilterSection>
                <Input placeholder="Buscar pacientes..." />
                <Select>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Fruits</SelectLabel>
                            <SelectItem value="apple">Apple</SelectItem>
                            <SelectItem value="banana">Banana</SelectItem>
                            <SelectItem value="blueberry">Blueberry</SelectItem>
                            <SelectItem value="grapes">Grapes</SelectItem>
                            <SelectItem value="pineapple">Pineapple</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </FilterSection>
            <section className="flex flex-col gap-2 max-h-64 overflow-y-auto">
                {
                    patients.length > 0 ? (
                        patients.map(patient => (
                            <PatientListItemCard patient={patient} selected={selectedPatient?.user.name === patient.user.name} onClick={handleChangePatient} />
                        ))
                    ) : (
                        <EmptyMuted />
                    )
                }
            </section>
        </Card>
    )
}

export default PatientsListContainer


interface PatientListItemCardProps {
    patient: Patient;
    selected?: boolean;
    onClick: (patient: Patient) => void;
}
const PatientListItemCard: FC<PatientListItemCardProps> = ({
    patient,
    selected = false,
    onClick
}) => {

    return (
        <div
            className={`flex items-center gap-2 rounded-xl ring-inset ring-1 ring-gray-200 hover:ring-ring ${selected && " ring-ring"} transition duration-300 p-2 shadow-sm cursor-pointer`}
            onClick={() => onClick(patient)}
        >
            <Avatar className='size-10'>
                <AvatarFallback className="flex items-center bg-linear-to-r from-primary to-primary/40 text-white">{getInitials(patient.user.name)}</AvatarFallback>
            </Avatar>
            <div className='flex-1'>
                <CardTitle className="font-medium">{patient.user.name}</CardTitle>
                <p className="text-xs text-zinc-500">{patient.sessions} Sessões</p>
            </div>
            <Badge color='green'>{patient.status}</Badge>
        </div>
    )
}


import { Button } from "@/components/ui/button";
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty";
import { useDialogContext } from "@/hooks/context/useDialogContext";
import { usePatientContext } from "@/hooks/context/usePatientContext";
import type { Patient } from "@/lib/types/patient";
import { cn, getInitials, type DefaultInterface } from "@/lib/utils";
import { RefreshCcwIcon } from "lucide-react";
import { LuUserPlus, LuUsers } from "react-icons/lu";
import { TbBell } from "react-icons/tb";
import { Avatar, AvatarFallback } from "../../../ui/avatar";
import Badge from "../../../ui/badge";
import { Card, CardHeader, CardTitle } from "../../../ui/card";
import { Input } from "../../../ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../../../ui/select";
import FilterSection from "../../sections/filterSection";

export function EmptyMuted() {
    return (
        <Empty className="from-muted/50 to-background h-full bg-linear-to-b from-30%">
            <EmptyHeader>
                <EmptyMedia variant="icon">
                    <TbBell />
                </EmptyMedia>
                <EmptyTitle>No Notifications</EmptyTitle>
                <EmptyDescription>
                    You&apos;re all caught up. New notifications will appear here.
                </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
                <Button variant="outline" size="sm">
                    <RefreshCcwIcon />
                    Refresh
                </Button>
            </EmptyContent>
        </Empty>
    )
}
