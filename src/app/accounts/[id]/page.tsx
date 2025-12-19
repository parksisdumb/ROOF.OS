import { MainLayout } from '@/components/layout/main-layout';
import { accounts, contacts, properties } from '@/lib/data';
import { notFound } from 'next/navigation';
import { AccountHeader } from '@/components/accounts/account-header';
import { AccountContacts } from '@/components/accounts/account-contacts';
import { AccountProperties } from '@/components/accounts/account-properties';
import { Card, CardContent } from '@/components/ui/card';

export default function AccountDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const account = accounts.find((acc) => acc.id === params.id);

  if (!account) {
    notFound();
  }

  const accountContacts = contacts.filter((c) =>
    account.contactIds.includes(c.id)
  );
  const accountProperties = properties.filter((p) =>
    account.propertyIds.includes(p.id)
  );

  return (
    <MainLayout>
      <div className="flex flex-col gap-6">
        <AccountHeader account={account} />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card>
            <CardContent className="pt-6">
              <AccountContacts contacts={accountContacts} />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <AccountProperties properties={accountProperties} />
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
