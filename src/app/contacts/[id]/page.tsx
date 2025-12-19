import { MainLayout } from '@/components/layout/main-layout';
import { accounts, contacts } from '@/lib/data';
import { notFound } from 'next/navigation';
import { ContactHeader } from '@/components/contacts/contact-header';
import type { Account, Contact } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building, Briefcase } from 'lucide-react';
import Link from 'next/link';

export default function ContactDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const contact = contacts.find((c) => c.id === params.id) as Contact;

  if (!contact) {
    notFound();
  }

  const account = accounts.find((acc) => acc.id === contact.accountId) as Account;

  return (
    <MainLayout>
      <div className="flex flex-col gap-6">
        <ContactHeader contact={contact} account={account} />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>Account Information</CardTitle>
                </CardHeader>
                <CardContent>
                    {account ? (
                        <Link href={`/accounts/${account.id}`} className="flex items-center gap-4 group">
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
                                <Building className="h-6 w-6 text-muted-foreground" />
                            </div>
                            <div>
                                <p className="font-medium group-hover:underline">{account.name}</p>
                                <p className="text-sm text-muted-foreground">{account.industry}</p>
                            </div>
                        </Link>
                    ) : (
                        <p className="text-sm text-muted-foreground">No account associated.</p>
                    )}
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Role & Responsibilities</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
                        <Briefcase className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div>
                        <p className="font-medium">{contact.role}</p>
                        <p className="text-sm text-muted-foreground">Primary contact for roofing services.</p>
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </MainLayout>
  );
}
