import type { FC } from "react";
import type { StatsProps } from "./statsCard";
import StatsCard from "./statsCard";

interface StatsGridProps {
    statsList: StatsProps[];
}

const StatsGrid: FC<StatsGridProps> = ({ statsList }) => {
    return (
        <div className='grid sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4'>
            {
                statsList.map(stats => (
                    <StatsCard stats={stats} />
                ))
            }
        </div>
    )
}

export default StatsGrid