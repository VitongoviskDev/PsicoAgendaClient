import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthContext } from "@/hooks/context/useAuthContext";
import { useHeaderContext } from "@/hooks/context/useHeaderContext"
import { getInitials } from "@/lib/utils";
import { Avatar } from "@radix-ui/react-avatar";
import { useEffect, type FC } from "react"

const ProfilePage: FC = () => {
    const { setPageTitle, setPageDescription } = useHeaderContext();
    const { user } = useAuthContext();

    useEffect(() => {
        setPageTitle("Perfil")
        setPageDescription("Gerencie seus dados de perfil e mantenha sempre atualizado.")
    })
    return (
        <div>
            <Card>
                <CardHeader>
                    <Avatar>
                        <AvatarImage src={String(user?.profile_picture)} />
                        <AvatarFallback>{getInitials(user?.name ?? "")}</AvatarFallback>
                    </Avatar>
                    <CardTitle>{user?.name}</CardTitle>
                    <CardDescription>{user?.crp}</CardDescription>
                </CardHeader>
            </Card>
        </div>
    )
}

export default ProfilePage