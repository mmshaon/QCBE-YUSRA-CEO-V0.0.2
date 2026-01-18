
import React, { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { BarChart } from '../components/charts/BarChart';
import { RadialChart } from '../components/charts/RadialChart';
import { IntelligenceCard } from '../components/dashboard/IntelligenceCard';
import { MiniLineChart } from '../components/charts/MiniLineChart';
import { CircularGauge } from '../components/charts/CircularGauge';
import { KpiWithTrend } from '../components/charts/KpiWithTrend';
import { FunnelChart } from '../components/charts/FunnelChart';
import { GeoHeatmapMock } from '../components/charts/GeoHeatmapMock';
import { ValueTower } from '../components/charts/ValueTower';
import { BalanceBeam } from '../components/charts/BalanceBeam';
import { ScoreIndicator } from '../components/charts/ScoreIndicator';
import { HorizontalBarGroup } from '../components/charts/HorizontalBarGroup';
import { RiskMatrix } from '../components/dashboard/RiskMatrix';
import { AlertFeed } from '../components/dashboard/AlertFeed';
import { fetchDashboardData } from '../services/api';
import { SkeletonLoader } from '../components/ui/SkeletonLoader';

interface DashboardProps {
  isSidebarVisible: boolean;
  onMenuClick: () => void;
}

const DashboardSkeleton: React.FC = () => (
    <>
      <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mt-8 mb-3">Strategic Status</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => <SkeletonLoader key={i} className="min-h-[200px]" />)}
      </div>
      <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mt-8 mb-3">Sales & Market</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => <SkeletonLoader key={i} className="min-h-[200px]" />)}
      </div>
      <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mt-8 mb-3">Customer Health</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => <SkeletonLoader key={i} className="min-h-[200px]" />)}
      </div>
       <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mt-8 mb-3">Operations & Risk</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <SkeletonLoader className="min-h-[200px]" />
            <SkeletonLoader className="min-h-[200px]" />
            <SkeletonLoader className="col-span-full min-h-[350px]" />
        </div>
        <div className="lg:col-span-1 grid grid-cols-1 gap-6">
            <SkeletonLoader className="min-h-[200px]" />
            <SkeletonLoader className="min-h-[200px]" />
        </div>
      </div>
    </>
)

export const Dashboard: React.FC<DashboardProps> = ({ isSidebarVisible, onMenuClick }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const dashboardData = await fetchDashboardData();
        setData(dashboardData);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
        // Here you could set an error state and display an error message
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  if (loading) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <Header title="Dashboard" isSidebarVisible={isSidebarVisible} onMenuClick={onMenuClick} />
        <DashboardSkeleton />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <Header title="Dashboard" isSidebarVisible={isSidebarVisible} onMenuClick={onMenuClick} />
      
      {/* STRATEGIC STATUS */}
      <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mt-8 mb-3">Strategic Status</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <IntelligenceCard title="Revenue" kpiValue={data.strategic.revenue.value} kpiUnit="SAR" statusColor="purple"><MiniLineChart data={data.strategic.revenue.history} color="#7a5cff" /></IntelligenceCard>
        <IntelligenceCard title="Profit & Margin" kpiValue={data.strategic.profitMargin.value} kpiUnit="%" statusColor="green"><CircularGauge value={data.strategic.profitMargin.value} color="#A0F85A" /></IntelligenceCard>
        <IntelligenceCard title="Cash Flow & Runway" kpiValue={data.strategic.runway.value} kpiUnit="Months" statusColor="blue">
          <div className="w-full h-full flex flex-col justify-center"><div className="h-2 w-full bg-cyan-900/50 rounded-full"><div className="h-2 bg-cyan-400 rounded-full" style={{width: `${(data.strategic.runway.value/24)*100}%`}}></div></div><p className="text-xs text-center mt-2 text-cyan-300">Runway Healthy</p></div>
        </IntelligenceCard>
        <IntelligenceCard title="Growth Momentum" kpiValue={data.strategic.growth.value} kpiUnit="% MoM" statusColor="purple"><KpiWithTrend value={data.strategic.growth.value} trend="up" period="vs last month" /></IntelligenceCard>
      </div>

      {/* SALES & MARKET */}
      <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mt-8 mb-3">Sales & Market</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <IntelligenceCard title="Sales Pipeline" kpiValue={data.sales.pipeline.value} kpiUnit="SAR" statusColor="blue"><FunnelChart data={data.sales.pipeline.stages} /></IntelligenceCard>
        <IntelligenceCard title="Conversion Rate" kpiValue={data.sales.conversionRate.value} kpiUnit="%" statusColor="green"><KpiWithTrend value={data.sales.conversionRate.value} trend="up" trendValue={data.sales.conversionRate.trendValue} period="vs last week" /></IntelligenceCard>
        <IntelligenceCard title="Regional Performance" statusColor="purple"><GeoHeatmapMock /></IntelligenceCard>
        <IntelligenceCard title="Market Share" kpiValue={data.sales.marketShare.value} kpiUnit="%" statusColor="blue"><RadialChart value={data.sales.marketShare.value} unit="%" description="Industry Lead" slim={true} color="blue" /></IntelligenceCard>
      </div>
      
      {/* CUSTOMER HEALTH */}
      <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mt-8 mb-3">Customer Health</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <IntelligenceCard title="Acquisition Cost (CAC)" kpiValue={data.customer.cac.value} kpiUnit="SAR" statusColor="red"><KpiWithTrend value={data.customer.cac.value} trend="up" trendValue={data.customer.cac.trendValue} period="Cost increasing" /></IntelligenceCard>
        <IntelligenceCard title="Lifetime Value (LTV)" kpiValue={data.customer.ltv.value} kpiUnit="SAR" statusColor="green"><ValueTower values={data.customer.ltv.components} /></IntelligenceCard>
        <IntelligenceCard title="LTV:CAC Ratio" kpiValue={data.customer.ltvCacRatio.ltv} kpiUnit=": 1" statusColor="green"><BalanceBeam leftValue={data.customer.ltvCacRatio.ltv} rightValue={data.customer.ltvCacRatio.cac} /></IntelligenceCard>
        <IntelligenceCard title="Satisfaction (NPS)" kpiValue={data.customer.nps.value} kpiUnit="/ 10" statusColor="purple"><ScoreIndicator value={data.customer.nps.value * 10} /></IntelligenceCard>
      </div>

       {/* OPERATIONS & RISK */}
      <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mt-8 mb-3">Operations & Risk</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <IntelligenceCard title="Project Delivery" kpiValue={data.operations.projectDelivery.value} kpiUnit="%" statusColor="green"><RadialChart value={data.operations.projectDelivery.value} unit="%" description="On Track" slim={true} /></IntelligenceCard>
            <IntelligenceCard title="Team Productivity" statusColor="blue"><HorizontalBarGroup data={data.operations.productivity.teams} /></IntelligenceCard>
            <IntelligenceCard title="Department Spending" statusColor="purple" fullWidth><BarChart data={data.operations.spending.departments} /></IntelligenceCard>
        </div>
        <div className="lg:col-span-1 grid grid-cols-1 gap-6">
            <IntelligenceCard title="CEO Alerts" statusColor="red"><AlertFeed alerts={data.risk.alerts} /></IntelligenceCard>
            <IntelligenceCard title="Risk Matrix" statusColor="red"><RiskMatrix risks={data.risk.matrix} /></IntelligenceCard>
        </div>
      </div>

    </div>
  );
};
