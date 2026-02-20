import { cn } from "@/lib/utils";
import { useEffect, type FC, type ReactNode } from "react"
import { ActionPageHeader, SimplePageHeader, TabPageHeader, type BreadCrumbItem } from "./header";
import type { TabItemProps } from "./tabs";
import { useBreadCrumbContext } from "@/hooks/useBreadCrumbContext";


interface DefaultPageContainerProps {
    children?: React.ReactNode
    className?: string;
    headerType?: 'simple' | 'tab' | 'action';
    title?: string;
    description?: string;
    breadcrumbs?: BreadCrumbItem[];
    tabs?: TabItemProps[];
    actions?: ReactNode[];
}

const DefaultPageContainer: FC<DefaultPageContainerProps> = ({
    children,
    className,
    headerType,
    title,
    description,
    breadcrumbs = [],
    tabs = [],
    actions = []
}) => {

    const { setBreadCrumbItems } = useBreadCrumbContext();

    useEffect(() => {
        if (breadcrumbs.length > 0) {
            setBreadCrumbItems(breadcrumbs);
        }
    }, [breadcrumbs])

    return (
        <div className={cn(`flex flex-col flex-1`, className)}>
            {headerType === 'simple' && title && (
                <SimplePageHeader
                    title={title}
                    description={description}
                />
            )}
            {headerType === 'tab' && title && (
                <TabPageHeader
                    title={title}
                    description={description}
                    tabs={tabs}
                />
            )}
            {headerType === 'action' && title && (
                <ActionPageHeader
                    title={title}
                    description={description}
                    actions={actions}
                />
            )}
            <div className="flex-1 flex flex-col gap-4 p-4 md:p-8 md:gap-8 bg-primary/5 dark:bg-background">
                {children}
            </div>
        </div>
    )
}

export default DefaultPageContainer;
