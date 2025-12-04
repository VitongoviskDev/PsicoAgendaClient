import { useHeaderContext } from "@/hooks/context/useHeaderContext"
import { useEffect, type FC } from "react"

const ProfilePage: FC = () => {
    const { setPageTitle, setPageDescription } = useHeaderContext();

    useEffect(() => {
        setPageTitle("Perfil")
        setPageDescription("Gerencie seus dados de perfil e mantenha sempre atualizado.")
    })
    return (
        <div>profilePage</div>
    )
}

export default ProfilePage