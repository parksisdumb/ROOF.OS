import { MainLayout } from '@/components/layout/main-layout';
import { LeadsTable } from '@/components/leads/leads-table';
import { leads } from '@/lib/data';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function LeadsPage() {
  return (
    <MainLayout>
      <Card>
        <CardHeader>
          <CardTitle>Leads & Opportunities</CardTitle>
          <CardDescription>
            Manage your sales pipeline and track all potential deals.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LeadsTable leads={leads} />
        </CardContent>
      </Card>
    </MainLayout>
  );
}
