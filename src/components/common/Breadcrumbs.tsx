import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import type { BreadCrumbItem as BreadCrumbItemType } from '@/context/breadCrumbContext';
import { useBreadCrumbContext } from '@/hooks/useBreadCrumbContext';
import { ChevronRight } from 'lucide-react';
import React from 'react';
import { LuEllipsis } from 'react-icons/lu';
import { Link, useLocation } from 'react-router-dom';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from '../ui/breadcrumb';

interface BreadcrumbsProps {
    items?: BreadCrumbItemType[];
}

const Breadcrumbs = ({ items: propItems }: BreadcrumbsProps) => {
    const location = useLocation();
    const { breadCrumbItems: contextItems } = useBreadCrumbContext();

    const defaultItems = location.pathname
        .split('/')
        .filter(Boolean)
        .map((segment, idx, arr) => {
            const to = '/' + arr.slice(0, idx + 1).join('/');
            return { label: decodeURIComponent(segment), to };
        });

    const breadCrumbSource = propItems || (contextItems.length > 0 ? contextItems : defaultItems);
    const items = breadCrumbSource;

    const renderItem = (item: any, isLast: boolean, index: number) => (
        <BreadcrumbItem key={item.to || index}>
            {isLast ? (
                <BreadcrumbPage className='truncate max-w-39 text-xs text-zinc-400  cursor-default font-medium'>{item.label}</BreadcrumbPage>
            ) : item.to ? (
                <BreadcrumbLink asChild>
                    <Link to={item.to} className='truncate max-w-39 text-xs text-zinc-400 cursor-pointer'>{item.label}</Link>
                </BreadcrumbLink>
            ) : (
                <BreadcrumbLink className='truncate max-w-39 text-xs text-zinc-400 cursor-default'>{item.label}</BreadcrumbLink>
            )}
        </BreadcrumbItem>
    );

    const renderEllipsis = (items: any[]) => (
        <BreadcrumbItem key="ellipsis">
            <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1">
                    <LuEllipsis className="size-4" />
                    <span className="sr-only">Toggle menu</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                    {items.map((item, idx) => (
                        <DropdownMenuItem key={idx} asChild>
                            <Link to={item.to} className='text-xs truncate max-w-39'>{item.label}</Link>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </BreadcrumbItem>
    );

    const itemsToRender = () => {
        if (items.length <= 4) {
            return items.map((item, index) => (
                <React.Fragment key={index}>
                    {renderItem(item, index === items.length - 1, index)}
                    {index < items.length - 1 && <ChevronRight className='text-zinc-400 size-3' />}
                </React.Fragment>
            ));
        }

        const start = items.slice(0, 2); // first 2
        const middle = items.slice(2, items.length - 2); // dropdown
        const end = items.slice(-2); // last 2

        return (
            <>
                {start.map((item, index) => (
                    <React.Fragment key={index}>
                        {renderItem(item, false, index)}
                        <BreadcrumbSeparator />
                    </React.Fragment>
                ))}
                {renderEllipsis(middle)}
                <BreadcrumbSeparator />
                {end.map((item, index) => (
                    <React.Fragment key={index}>
                        {renderItem(item, index === end.length - 1, index)}
                        {index < end.length - 1 && <BreadcrumbSeparator />}
                    </React.Fragment>
                ))}
            </>
        );
    };

    return (
        <div className='flex items-center h-full overflow-hidden'>
            <Breadcrumb>
                <BreadcrumbList className="text-sm">
                    {itemsToRender()}
                </BreadcrumbList>
            </Breadcrumb>
        </div>
    );
};

export default Breadcrumbs;
