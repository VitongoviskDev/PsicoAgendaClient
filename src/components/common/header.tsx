import Tabs, { type TabItemProps } from "@/components/common/tabs";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import type { BreadCrumbItem as BreadCrumbItemType } from "@/context/breadCrumbContext";
import { useBreadCrumbContext } from "@/hooks/useBreadCrumbContext";
import type { FC, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "./Breadcrumbs";

export type BreadCrumbItem = BreadCrumbItemType;


interface SimplePageHeaderProps {
    title: string
    description?: string
}


export const SimplePageHeader: FC<SimplePageHeaderProps> = ({ title, description }) => {
    const { breadCrumbItems } = useBreadCrumbContext();
    return (
        <header className="flex flex-col shrink-0 justify-center gap-2 p-4 transition-[width,height] ease-linear shadow-sm border-b border-gray-200 dark:border-zinc-800 dark:bg-zinc-950">
            <div className="flex items-center gap-2 group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                <SidebarTrigger className="-ml-1" />
                <Separator
                    orientation="vertical"
                    className="mr-2 data-[orientation=vertical]:h-4"
                />
                <Breadcrumbs items={breadCrumbItems} />
            </div>
            <div>
                <h1 className="text-xl font-bold">{title}</h1>
                {description &&
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">{description}</p>
                }
            </div>
        </header>
    )
}

interface TabPageHeaderProps {
    title: string
    description?: string
    tabs: TabItemProps[]
}

export const TabPageHeader: FC<TabPageHeaderProps> = ({ title, description, tabs }) => {
    const { breadCrumbItems } = useBreadCrumbContext();

    const navigate = useNavigate();

    const handleTabClick = (value: string) => {
        const tab = tabs.find(t => t.value === value);
        if (tab)
            navigate(tab.value)
    }

    return (
        <header className="flex flex-col shrink-0 justify-center gap-2 p-4 transition-[width,height] ease-linear shadow-sm border-b border-gray-200 dark:border-zinc-800 dark:bg-zinc-950">
            <div className="flex items-center gap-2 group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                <SidebarTrigger className="-ml-1" />
                <Separator
                    orientation="vertical"
                    className="mr-2 data-[orientation=vertical]:h-4"
                />
                <Breadcrumbs items={breadCrumbItems} />
            </div>
            <div>
                <h1 className="text-xl font-bold">{title}</h1>
                {description &&
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">{description}</p>
                }
            </div>
            <div>
                <Tabs tabs={tabs} onValueChange={handleTabClick} variant="line" />
            </div>
        </header>
    )
}


interface ActionPageHeaderProps {
    title: string
    description?: string
    actions: ReactNode[]
}

export const ActionPageHeader: FC<ActionPageHeaderProps> = ({ title, description, actions }) => {
    const { breadCrumbItems } = useBreadCrumbContext();
    return (
        <header className="flex flex-col shrink-0 justify-center gap-2 p-4 transition-[width,height] ease-linear shadow-sm border-b border-gray-200 dark:border-zinc-800 dark:bg-zinc-950">
            <div className="flex items-center gap-2 group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                <SidebarTrigger className="-ml-1" />
                <Separator
                    orientation="vertical"
                    className="mr-2 data-[orientation=vertical]:h-4"
                />
                <Breadcrumbs items={breadCrumbItems} />
            </div>
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-bold">{title}</h1>
                    {description &&
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">{description}</p>
                    }
                </div>
                <div className="flex items-center gap-2 w-fit">
                    {
                        actions.map((action, index) => (<div key={index}>{action}</div>))
                    }
                </div>
            </div>
        </header>
    )
}
