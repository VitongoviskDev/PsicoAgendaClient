import AutoHeightContainer from "@/components/common/autoHeightContainer";
import DefaultContainer from "@/components/common/DefaultContainer";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Badge from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuthContext } from "@/hooks/context/useAuthContext";
import { useHeaderContext } from "@/hooks/context/useHeaderContext";
import { getInitials, TypeFormatter } from "@/lib/utils";
import { Avatar } from "@radix-ui/react-avatar";
import { useEffect, type FC } from "react";
import type { IconType } from "react-icons/lib";
import { LuMail, LuPhone } from "react-icons/lu";
import { Outlet, useNavigate } from "react-router-dom";

const ProfilePage: FC = () => {
    const { setPageTitle, setPageDescription } = useHeaderContext();
    const { user } = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        setPageTitle("Perfil")
        setPageDescription("Gerencie seus dados de perfil e mantenha sempre atualizado.")
    })

    const handleTabClick = (value: string) => {
        navigate(value);
    }

    const tabItemsStyle = `
        flex-1 rounded-none border-0 not-last:border-r-1 border-zinc-200 
        cursor-pointer
        data-[state=active]:bg-primary data-[state=active]:text-white
    `
    return (
        <DefaultContainer className="flex-col xl:flex-row gap-8">
            <Card className="gap-4 xl:max-w-md">
                <CardHeader className="flex flex-col sm:flex-row sm:items-center md:flex-col md:items-start lg:flex-row lg:items-center gap-4 [&>div]:flex-1">
                    <div className="flex items-center gap-4">
                        <Avatar className="size-16">
                            <AvatarImage src={String(user?.profile_picture)} />
                            <AvatarFallback className="text-2xl">{getInitials(user?.name ?? "")}</AvatarFallback>
                        </Avatar>
                        <div className="space-y-0.5">
                            <CardTitle>{user?.name}</CardTitle>
                            {
                                user?.profiles?.psychologist &&
                                <CardDescription className="text-xs">CRP: {TypeFormatter.toCrp(user.profiles?.psychologist?.crp ?? '')}</CardDescription>
                            }
                        </div>
                    </div>
                    {/* Informações do perfil */}
                    <div className="flex flex-col gap-2">
                        <ProfileCardInfoItem icon={LuMail} label={user?.email.toLocaleLowerCase() ?? ""} />
                        <ProfileCardInfoItem icon={LuPhone} label={TypeFormatter.toPhone(user?.phone ?? "")} />
                    </div>
                </CardHeader>
                <CardContent className="flex flex-col gap-6">
                    {/* Formação */}
                    {/* <div>
                        <h2 className="text-zinc-800 text-md font-semibold">Formação</h2>
                        <div className="flex flex-col gap-2 mt-2">
                            <ProfileCardFormationItem
                                course="Psicologia"
                                institution="Universidade de Mogi das Cruzes"
                                year="2017 - 2021"
                            />
                        </div>
                    </div> */}

                    {/* Especializações */}
                    <div>
                        <h2 className="text-zinc-800 text-md font-semibold">Especializações</h2>
                        <div className="flex items-center flex-wrap w-full gap-2 mt-2">
                            {
                                // user?.profiles?.psychologist?.specializations.map((specialization) => (
                                mockSpecializations.map((specialization) => (
                                    <Badge
                                        color="sidebar"
                                        key={specialization}
                                    >
                                        {specialization}
                                    </Badge>
                                ))
                            }
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card className="flex-1">
                <CardHeader>
                    <CardTitle>Configurações</CardTitle>
                    <Tabs defaultValue="personal" onValueChange={handleTabClick} className='rounded-md overflow-hidden'>
                        <TabsList className='flex w-full p-0 not-last:'>
                            <TabsTrigger className={tabItemsStyle} value="personal" >Pessoal</TabsTrigger>
                            <TabsTrigger className={tabItemsStyle} value="professional">Profissional</TabsTrigger>
                            <TabsTrigger className={tabItemsStyle} value="formation">Formação</TabsTrigger>
                            <TabsTrigger className={tabItemsStyle} value="profile">Perfil</TabsTrigger>
                            <TabsTrigger className={tabItemsStyle} value="password">Senha</TabsTrigger>
                        </TabsList>
                    </Tabs>
                    <AutoHeightContainer>
                        <Outlet />
                    </AutoHeightContainer>
                </CardHeader>
            </Card>
        </DefaultContainer>
    )
}

export default ProfilePage

interface ProfileCardInfoItemProps {
    icon: IconType;
    label: string;
}

const ProfileCardInfoItem: FC<ProfileCardInfoItemProps> = ({ icon: Icon, label }) => {
    return (
        <div className="flex items-center gap-2">
            <Icon className="size-4 text-zinc-500" />
            <span className="text-sm">{label}</span>
        </div>
    )
}


// interface ProfileCardFormationItemProps {
//     course: string;
//     institution: string;
//     year: string;
// }
// const ProfileCardFormationItem: FC<ProfileCardFormationItemProps> = ({ course, institution, year }) => {
//     return (
//         <Badge color="sidebar">
//             <div className="flex items-center gap-2">
//                 <p>{course}</p>
//                 <Separator orientation="vertical" className="h-4!" />
//                 <p className="text-sm font-normal">{institution}</p>
//                 <Separator orientation="vertical" className="h-4!" />
//                 <p>{year}</p>
//             </div>
//         </Badge>
//     )
// }

const mockSpecializations = [
    "Terapia Cognitivo-Comportamental",
    "Psicoterapia Infantil",
    "Psicanalise",
    "Psicologia Organizacional",
    "Psicologia Clínica",
    "Psicologia Hospitalar",
    "Neuropsicologia",
];