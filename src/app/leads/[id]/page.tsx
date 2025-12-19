import { MainLayout } from '@/components/layout/main-layout';
import { accounts, contacts, properties, leads } from '@/lib/data';
import { notFound } from 'next/navigation';
import type { Account, Contact, Property, Lead } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Building,
  User,
  Wrench,
  MapPin,
} from 'lucide-react';
import Link from 'next/link';
import { LeadHeader } from '@/components/leads/lead-header';


export default function LeadDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const lead = leads.find((l) => l.id === params.id) as Lead;

  if (!lead) {
    notFound();
  }

  const account = accounts.find((acc) => acc.id === lead.accountId) as Account;
  const contact = contacts.find((c) => c.id === lead.contactId) as Contact;
  const property = properties.find((p) => p.id === lead.propertyId) as Property;

  return (
    <MainLayout>
      <div className="flex flex-col gap-6">
        <LeadHeader lead={lead} />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Building className="h-5 w-5 text-muted-foreground"/>Associated Account</CardTitle>
            </CardHeader>
            <CardContent>
                {account ? (
                    <Link href={`/accounts/${account.id}`} className="flex items-center gap-4 group rounded-md border p-4 hover:bg-secondary/50 transition-colors">
                        <div>
                            <p className="font-medium group-hover:underline">{account.name}</p>
                            <p className="text-sm text-muted-foreground">{account.industry}</p>
                        </div>
                    </Link>
                ) : <p className="text-sm text-muted-foreground">No account associated.</p>}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><User className="h-5 w-5 text-muted-foreground"/>Primary Contact</CardTitle>
            </CardHeader>
            <CardContent>
                {contact ? (
                    <Link href={`/contacts/${contact.id}`} className="flex items-center gap-4 group rounded-md border p-4 hover:bg-secondary/50 transition-colors">
                        <div>
                            <p className="font-medium group-hover:underline">{contact.name}</p>
                            <p className="text-sm text-muted-foreground">{contact.jobTitle}</p>
                        </div>
                    </Link>
                ) : <p className="text-sm text-muted-foreground">No contact associated.</p>}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Wrench className="h-5 w-5 text-muted-foreground"/>Subject Property</CardTitle>
            </CardHeader>
            <CardContent>
                {property ? (
                    <Link href={`/properties/${property.id}`} className="flex items-center gap-4 group rounded-md border p-4 hover:bg-secondary/50 transition-colors">
                        <div>
                            <p className="font-medium group-hover:underline">{property.propertyName}</p>
                            <p className="text-sm text-muted-foreground flex items-center gap-2">
                                <MapPin className="h-4 w-4" />
                                {property.streetAddress}, {property.city}
                            </p>
                        </div>
                    </Link>
                ) : <p className="text-sm text-muted-foreground">No property associated.</p>}
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
