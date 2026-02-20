import type { BadgeColor } from "@/components/ui/badge"
import Badge from "@/components/ui/badge";
import { PROFILE_STATUS_ENUM, type ProfileStatus } from "@/lib/types/patient"
import type { FC } from "react"

export interface ProfileStatusBadgeProps {
    status: ProfileStatus;
}

const ProfileStatusBadge: FC<ProfileStatusBadgeProps> = ({ status }) => {
    const badgeStyle: () => { color: BadgeColor, label: string } = () => {
        switch (status) {
            case PROFILE_STATUS_ENUM.PENDING_VERIFICATION:
                return {
                    color: "yellow",
                    label: "Pendente"
                }
            case PROFILE_STATUS_ENUM.WAITING_FIRST_SECTION:
                return {
                    color: "blue",
                    label: "1ª Sessão"
                }
            case PROFILE_STATUS_ENUM.ACTIVE:
                return {
                    color: "green",
                    label: "Ativo"
                }
            case PROFILE_STATUS_ENUM.DISABLED:
                return {
                    color: "zinc",
                    label: "Inativo"
                }
            case PROFILE_STATUS_ENUM.BLOCKED:
                return {
                    color: "red",
                    label: "Bloqueado"
                }
        }
    }
    return (

        <Badge color={badgeStyle().color}>{badgeStyle().label}</Badge>
    )
}

export default ProfileStatusBadge