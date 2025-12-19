import { MainLayout } from '@/components/layout/main-layout';
import { accounts, contacts, properties } from '@/lib/data';
import { notFound } from 'next/navigation';
import { AccountHeader } from '@/components/accounts/account-header';
import { AccountContacts } from '@/components/accounts/account-contacts';
import { AccountProperties } from '@/components/accounts/account-properties';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShieldCheck, Workflow, ClipboardCheck, Goal, GitMerge } from 'lucide-react';

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
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <Card className='lg:col-span-2'>
              <CardHeader>
                <CardTitle>Commercial Details</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 gap-6 text-sm md:grid-cols-2">
                <div className="flex items-start gap-4">
                  <Workflow className="mt-1 h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-muted-foreground">Vendor Management Software</p>
                    <p className="font-medium">{account.vendorManagementSoftware || 'N/A'}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <ClipboardCheck className="mt-1 h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-muted-foreground">Vendor Onboarding</p>
                    <p className="font-medium">{account.vendorOnboardingCompleted || 'N/A'}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Goal className="mt-1 h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-muted-foreground">Prospecting Stage</p>
                    <p className="font-medium">{account.prospectingStage || 'N/A'}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <ShieldCheck className="mt-1 h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-muted-foreground">Insurance Requirements</p>
                    <p className="font-medium">{account.insuranceRequirements || 'N/A'}</p>
                  </div>
                </div>
                {account.decisionTree && (
                   <div className="flex items-start gap-4 md:col-span-2">
                      <GitMerge className="mt-1 h-5 w-5 text-muted-foreground" />
                      <div>
                          <p className="text-muted-foreground">Decision Tree</p>
                          <p className="font-medium whitespace-pre-wrap">{account.decisionTree}</p>
                      </div>
                  </div>
                )}
              </CardContent>
            </Card>
            <div className="space-y-6">
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
      </div>
    </MainLayout>
  );
}
