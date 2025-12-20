import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { usePatientContext } from "@/hooks/context/usePatientContext"
import { formatedDate } from "@/lib/utils"
import type { FC } from "react"
import { LuActivity, LuMail, LuMapPin, LuPhone, LuUser } from "react-icons/lu"

const PatientsOverviewTab: FC = () => {
    const { selectedPatient } = usePatientContext();
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
                            [&>li]:flex [&>li]:items-center [&>li]:gap-2 
                        "
                        >
                            <li><LuMail />{selectedPatient?.user.email}</li>
                            <li><LuPhone />{selectedPatient?.user.phone}</li>
                            <li><LuMapPin />{ }</li>
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
                                    <Label className="text-zinc-500 font-normal">Primeira Sessão:</Label>
                                    <p className="text-sm font-medium text-start">{formatedDate(selectedPatient?.first_session)}</p>
                                </div>
                                <div >
                                    <Label className="text-zinc-500 font-normal">Proxima Sessão:</Label>
                                    <p className="text-sm font-medium text-start">{formatedDate(selectedPatient?.next_session)}</p>
                                </div>
                            </div>
                            <div className="mt-2">
                                <Label className="text-zinc-500 font-normal">Sessões:</Label>
                                <div className="
                                    flex justify-between mt-2 P-0
                                    [&_h4]:font-semibold [&_h4]:text-xs
                                    [&_p]:font-bold [&_p]:text-xl
                                    [&>div]:flex-1 [&>div]:text-center [&>div]:not-last:border-r
                                "
                                >
                                    <div>
                                        <CardContent className="px-2">
                                            <h4 className="text-blue-400">Realizadas</h4>
                                            <p>32</p>
                                        </CardContent>
                                    </div>
                                    <div>
                                        <CardContent className="px-2">
                                            <h4 className="text-rose-400">Canceladas</h4>
                                            <p>32</p>
                                        </CardContent>
                                    </div>
                                    <div>
                                        <CardContent className="px-2">
                                            <h4 className="text-zinc-400">Faltas</h4>
                                            <p>32</p>
                                        </CardContent>
                                    </div>
                                    <div>
                                        <CardContent className="px-2">
                                            <h4 className="text-primary">Total</h4>
                                            <p>32</p>
                                        </CardContent>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default PatientsOverviewTab