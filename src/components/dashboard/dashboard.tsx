import { SalesChart } from './sales-chart';
import { RecentActivity } from './recent-activity';
import { TodayPage } from './today-page';

export function Dashboard() {
  return (
    <div className="flex flex-col gap-6">
      <TodayPage />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <SalesChart />
        <RecentActivity />
      </div>
    </div>
  );
}
