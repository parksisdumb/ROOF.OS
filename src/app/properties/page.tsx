import { MainLayout } from '@/components/layout/main-layout';
import { PropertiesTable } from '@/components/properties/properties-table';
import { properties, accounts } from '@/lib/data';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { Property } from '@/lib/types';

export default function PropertiesPage() {

  const propertiesWithAccount = properties.map(property => {
      const account = accounts.find(acc => acc.id === property.accountId);
      return {
          ...property,
          accountName: account?.name || 'N/A'
      }
  })

  return (
    <MainLayout>
      <Card>
        <CardHeader>
          <CardTitle>Properties</CardTitle>
          <CardDescription>
            Manage all properties and their roof details.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PropertiesTable properties={propertiesWithAccount} />
        </CardContent>
      </Card>
    </MainLayout>
  );
}
