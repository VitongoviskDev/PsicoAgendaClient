import DefaultPageContainer from "@/components/common/DefaultPageContainer";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const SettiingsPage = () => {
    const tabs = [
        { label: 'Clinica', value: 'clinic' },
        { label: 'Equipe', value: 'team' },
        { label: 'Pagamentos', value: '#payments' },
        { label: 'Notificações', value: '#notifications' },
    ]
    const [selectedTab, setSelectedTab] = useState(0);

    const navigate = useNavigate();
    const handleTabClick = (value: string) => {
        const tab = tabs.find(tab => tab.value === value);
        if (!tab) return;

        setSelectedTab(tabs.indexOf(tab));

        navigate(value);
    }

    return (
        <DefaultPageContainer
            headerType="tab"
            tabs={tabs}
            title="Configurações"
            description="Gerencie suas configurações e mantenha sempre atualizado."
            breadcrumbs={[
                { label: "Configurações" },
                { label: tabs[selectedTab].label }
            ]}
        >
            <Outlet />
        </DefaultPageContainer>
    )
}

export default SettiingsPage