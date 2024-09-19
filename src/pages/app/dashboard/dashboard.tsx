import { Helmet } from "react-helmet-async";
import { MonthRevenue } from "./cards/month-revenue";
import { MonthOrdersAmount } from "./cards/month-orders-amount";
import { DayOrdersAmount } from "./cards/day-orders-amount";
import { MonthCanceledOrdersAmount } from "./cards/month-canceled-orders-amount";
import { RevenueChart } from "./revenue-chart";
import { PopularProductsChart } from "./popular-products-chart";

interface IDashboardProps {}

export function Dashboard({}: IDashboardProps) {
  return (
    <>
      <Helmet title="Dashboard" />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

        <div className="grid grid-cols-4 gap-4">
          <MonthRevenue />
          <MonthOrdersAmount />
          <DayOrdersAmount />
          <MonthCanceledOrdersAmount />
        </div>
        <div className="grid grid-cols-9 gap-4">
          <RevenueChart />
          <PopularProductsChart />
        </div>
      </div>
    </>
  );
}
