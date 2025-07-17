import { RevenueChart } from "../charts/RevenueChart";
import { ActivityChart } from "../charts/ActivityChart";

export function ChartsSection() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
      <RevenueChart />
      <ActivityChart />
    </div>
  );
}
