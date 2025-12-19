import PatientsStatisticsChart from '@/components/common/pages/patients/PatientsStatisticsChart';
import DefaultContainer from '@/components/common/DefaultContainer';
import type { StatsProps } from '@/components/common/Stats/statsCard';
import StatsGrid from '@/components/common/Stats/statsGrid';
import { ChartContainer } from '@/components/ui/chart';
import { useAuthContext } from '@/hooks/context/useAuthContext';
import { useHeaderContext } from '@/hooks/context/useHeaderContext';
import { useEffect } from 'react';
import { LuCalendar, LuCircleAlert, LuClock4, LuUsers } from 'react-icons/lu';

const DashboardPage = () => {
  const { user } = useAuthContext();
  const { setPageTitle, setPageDescription } = useHeaderContext();

  useEffect(() => {
    setPageTitle("Dashboard");
    setPageDescription(`Olá, ${user?.name}`);
  }, [setPageTitle, setPageDescription, user]);

  return (
    <DefaultContainer className="flex flex-col gap-12">
      <StatsGrid statsList={statsListItems} />
      <div className='grid xl:grid-cols-2 gap-4 '>
        <PatientsStatisticsChart />
        <PatientsStatisticsChart />
      </div>
    </DefaultContainer>
  )
}

export default DashboardPage

const statsListItems: StatsProps[] = [
  {
    title: "Total Pacientes",
    value: {
      value: 58
    },
    icon: {
      icon: LuUsers,
      color: "bg-blue-400",
    },
    diff: {
      value: {
        value: 3
      },
      text: "este mês"
    },
    link: "#",
  },
  {
    title: "Sessoes esta semana",
    value: {
      value: 38
    },
    icon: {
      icon: LuCalendar,
      color: "bg-green-400",
    },
    diff: {
      value: {
        value: 12,
        isPercentage: true
      },
      text: "desde a ultima semana"
    },
    link: "#",
  },
  {
    title: "Taxa de comparecimento",
    value: {
      value: 85,
      isPercentage: true
    },
    icon: {
      icon: LuClock4,
      color: "bg-purple-400",
    },
    diff: {
      value: {
        value: -2,
        isPercentage: true
      },
      text: "desde o ultimo mês"
    },
    link: "#",
  },
  {
    title: "Taxa de cancelamento",
    value: { value: 10, isPercentage: true },
    icon: {
      icon: LuCircleAlert,
      color: "bg-orange-400",
    },
    diff: {
      value: {
        value: 1,
        isPercentage: true
      },
      text: "desde o ultimo mês"
    },
    link: "#",
  },
]

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]