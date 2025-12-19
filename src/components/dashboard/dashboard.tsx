import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { DollarSign, Building2, Target, TrendingUp } from 'lucide-react';
import { KpiCard } from './kpi-card';
import { SalesChart } from './sales-chart';
import { RecentActivity } from './recent-activity';
import { LeadsTable } from '../leads/leads-table';
import { leads as mockLeads } from '@/lib/data';

export function Dashboard() {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Total Revenue"
          value="$45,231.89"
          icon={<DollarSign className="h-5 w-5 text-muted-foreground" />}
          trend="+20.1% from last month"
        />
        <KpiCard
          title="Active Leads"
          value="78"
          icon={<Target className="h-5 w-5 text-muted-foreground" />}
          trend="+18.3% from last month"
        />
        <KpiCard
          title="New Accounts"
          value="12"
          icon={<Building2 className="h-5 w-5 text-muted-foreground" />}
          trend="+5 since last month"
        />
        <KpiCard
          title="Conversion Rate"
          value="62.5%"
          icon={<TrendingUp className="h-5 w-5 text-muted-foreground" />}
          trend="+2.5% from last month"
        />
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <SalesChart />
        </div>
        <div className="lg:col-span-1">
          <RecentActivity />
        </div>
      </div>
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Priority Leads</CardTitle>
            <CardDescription>
              Leads that require immediate attention.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LeadsTable leads={mockLeads.slice(0, 5)} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
