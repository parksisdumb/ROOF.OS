import { MainLayout } from '@/components/layout/main-layout';
import { AccountsTable } from '@/components/accounts/accounts-table';
import { accounts } from '@/lib/data';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function AccountsPage() {
  return (
    <MainLayout>
      <Card>
        <CardHeader>
          <CardTitle>Accounts</CardTitle>
          <CardDescription>
            Manage your client accounts and view their details.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AccountsTable accounts={accounts} />
        </CardContent>
      </Card>
    </MainLayout>
  );
}
