import type { FC } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export interface TabItemProps {
    label: string;
    value: string;
    icon?: React.ReactNode;
    variant?: 'default' | 'line';
}

interface CommonTabsProps {
    tabs: TabItemProps[];
    onValueChange?: (value: string) => void;
    defaultValue?: string;
    variant?: 'default' | 'line';
}

const CommonTabs: FC<CommonTabsProps> = ({ tabs, onValueChange, defaultValue, variant = 'default' }) => {
    return (
        <Tabs defaultValue={defaultValue} onValueChange={onValueChange} className="w-full">
            <TabsList variant={variant}>
                {tabs.map((tab) => (
                    <TabsTrigger key={tab.value} value={tab.value} className="flex items-center gap-2">
                        {tab.icon}
                        {tab.label}
                    </TabsTrigger>
                ))}
            </TabsList>
        </Tabs>
    );
};

export default CommonTabs;
