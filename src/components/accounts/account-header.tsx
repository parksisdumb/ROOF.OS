import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { Account } from '@/lib/types';
import { DollarSign, Building, Briefcase } from 'lucide-react';
import { KpiCard } from '../dashboard/kpi-card';

export function AccountHeader({ account }: { account: Account }) {
    const formattedValue = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
    }).format(account.totalValue);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{account.name}</CardTitle>
        <CardDescription>{account.industry} Client</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-3">
        <KpiCard
          title="Total Contract Value"
          value={formattedValue}
          icon={<DollarSign className="h-5 w-5 text-muted-foreground" />}
          trend={`${account.propertyIds.length} properties`}
        />
         <KpiCard
          title="Contacts"
          value={String(account.contactIds.length)}
          icon={<Briefcase className="h-5 w-5 text-muted-foreground" />}
          trend="Primary contacts"
        />
        <KpiCard
          title="Properties"
          value={String(account.propertyIds.length)}
          icon={<Building className="h-5 w-5 text-muted-foreground" />}
          trend="Managed properties"
        />
      </CardContent>
    </Card>
  );
}
