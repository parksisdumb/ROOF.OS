
import { MainLayout } from '@/components/layout/main-layout';
import { ContactsTable } from '@/components/contacts/contacts-table';
import { contacts, accounts } from '@/lib/data';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { ContactWithAccount } from '@/lib/types';

export default function ContactsPage() {
  const contactsWithAccount = contacts.map(contact => {
    const account = accounts.find(acc => acc.id === contact.accountId);
    return {
      ...contact,
      accountName: account?.name || 'N/A',
      accountId: account?.id
    };
  }) as ContactWithAccount[];

  return (
    <MainLayout>
      <Card>
        <CardHeader>
          <CardTitle>Contacts</CardTitle>
          <CardDescription>
            Manage all your contacts across all accounts.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ContactsTable contacts={contactsWithAccount} />
        </CardContent>
      </Card>
    </MainLayout>
  );
}
