
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { usePatientContext } from "@/hooks/context/usePatientContext";
import { usePatientOverview } from "@/hooks/patient/usePatientOverview";
import { formatedDate } from "@/lib/utils";
import { type FC } from "react";
import { LuActivity, LuMail, LuPhone, LuUser } from "react-icons/lu";

const PatientsOverviewTab: FC = () => {

    const { selectedPatient } = usePatientContext();
    const { data: patientOverview } = usePatientOverview({ params: { id: selectedPatient!.id } });


    return (
        <div className="flex flex-col gap-4">
            <div className="flex gap-2 flex-wrap">
                <Card className="flex-1">
                    <CardContent>
                        <CardHeader className="px-0">
                            <CardTitle className="flex items-center gap-2"><LuUser />Contato</CardTitle>
                        </CardHeader>
                        <ul className="
                            flex flex-col gap-1
                            [&>li]:flex [&>li]:items-center [&>li]:gap-2 [&>li]:text-sm 
                        ">
                            <li><LuMail />{patientOverview?.data.patient.user.email}</li>
                            <li><LuPhone />{patientOverview?.data.patient.user.phone}</li>
                            {/* <li><LuMapPin />{ }</li> */}
                        </ul>
                    </CardContent>
                </Card>
                <Card className="flex-1">
                    <CardContent >
                        <CardHeader className="px-0">
                            <CardTitle className="flex items-center gap-2"><LuActivity />Tratamento</CardTitle>
                        </CardHeader>
                        <div className="
                            flex flex-col gap-2 mt-2
                            [&>li]:flex [&>li]:flex-col [&>li]:items-start
                        ">
                            <div className="flex items-start justify-start gap-8">
                                <div >
                                    <Label className="text-zinc-500 dark:text-zinc-400 font-normal">Primeira Sessão:</Label>
                                    <p className="text-sm font-medium text-center">{patientOverview?.data.first_session ? formatedDate(patientOverview?.data.first_session) : "-"}</p>
                                </div>
                                <div >
                                    <Label className="text-zinc-500 dark:text-zinc-400 font-normal">Ultima Sessão:</Label>
                                    <p className="text-sm font-medium text-center">{patientOverview?.data.last_session ? formatedDate(patientOverview?.data.last_session) : "-"}</p>
                                </div>
                                <div >
                                    <Label className="text-zinc-500 dark:text-zinc-400 font-normal">Proxima Sessão:</Label>
                                    <p className="text-sm font-medium text-center">{patientOverview?.data.next_session ? formatedDate(patientOverview?.data.next_session) : "-"}</p>
                                </div>
                            </div>
                            <div className="mt-2">
                                <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Sessões:</p>
                                <div className="
                                    grid grid-cols-3 border-1 border-zinc-200 dark:border-zinc-700 rounded-lg mt-1 p-0!
                                    [&_div]:py-2
                                    [&_h4]:font-semibold [&_h4]:text-center [&_h4]:text-xs
                                    [&_p]:font-medium [&_p]:text-xl [&_p]:text-center
                                    divide-x divide-zinc-200 dark:divide-zinc-700
                                    "
                                >
                                    <div>
                                        <h4 className="text-primary">Realizadas</h4>
                                        <p>{patientOverview?.data.sessions.completed}</p>
                                    </div>
                                    <div>
                                        <h4 className="text-rose-400">Canceladas</h4>
                                        <p>{patientOverview?.data.sessions.canceled}</p>
                                    </div>
                                    <div>
                                        <h4 className="text-zinc-400">Faltas</h4>
                                        <p>{patientOverview?.data.sessions.missed}</p>
                                    </div>
                                    {/* <div>
                                        <CardContent className="">
                                            <h4 className="text-primary">Total</h4>
                                            <p>{patientOverview?.data.sessions.total}</p>
                                        </CardContent>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div >
    )
}

export default PatientsOverviewTab