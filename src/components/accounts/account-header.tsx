'use client';
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { Account } from '@/lib/types';
import { DollarSign, Building, Briefcase, Pencil, MapPin, Phone, Globe, Calendar, History,GitMerge  } from 'lucide-react';
import { KpiCard } from '../dashboard/kpi-card';
import { Button } from '../ui/button';
import { EditAccountForm } from './edit-account-form';
import { Badge } from '../ui/badge';
import { format, formatDistanceToNow } from 'date-fns';
import { leads } from '@/lib/data';

const getStageBadge = (stage?: Account['stage']) => {
  if (!stage) return null;
  switch (stage) {
    case 'Prospect':
      return <Badge variant="secondary">{stage}</Badge>;
    case 'Active':
      return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">{stage}</Badge>;
    case 'Churned':
      return <Badge variant="destructive">{stage}</Badge>;
    default:
      return <Badge>{stage}</Badge>;
  }
};


export function AccountHeader({ account }: { account: Account }) {
  const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);
  
  const openOpportunities = leads.filter(l => l.company === account.name && l.stage !== 'Won' && l.stage !== 'Lost');
  const openOpportunitiesCount = openOpportunities.length;
  const openOpportunitiesValue = openOpportunities.reduce((sum, lead) => sum + lead.value, 0);

  const formattedValue = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(account.totalValue);
  
  const formattedOpenValue = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(openOpportunitiesValue);

  return (
    <>
      <EditAccountForm
        account={account}
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
      />
      <Card>
        <CardHeader className="flex flex-row items-start justify-between">
          <div>
            <div className="flex items-center gap-4">
              <CardTitle>{account.name}</CardTitle>
              {getStageBadge(account.stage)}
            </div>
            <CardDescription>{account.accountType} - {account.industry}</CardDescription>
            <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              {account.officeAddress && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{account.officeAddress}</span>
                </div>
              )}
              {account.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <a href={`tel:${account.phone}`} className="hover:underline">{account.phone}</a>
                </div>
              )}
              {account.website && (
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  <a href={`https://${account.website}`} target="_blank" rel="noopener noreferrer" className="hover:underline">{account.website}</a>
                </div>
              )}
               {account.createdAt && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>Created: {format(new Date(account.createdAt), 'MMM d, yyyy')}</span>
                </div>
              )}
               {account.lastActivityDate && (
                <div className="flex items-center gap-2">
                  <History className="h-4 w-4" />
                  <span>Last Activity: {formatDistanceToNow(new Date(account.lastActivityDate))} ago</span>
                </div>
              )}
            </div>
          </div>
          <Button variant="outline" onClick={() => setIsEditDialogOpen(true)}>
            <Pencil className="mr-2 h-4 w-4" />
            Edit Account
          </Button>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-4">
           <KpiCard
            title="Total Contract Value"
            value={formattedValue}
            icon={<DollarSign className="h-5 w-5 text-muted-foreground" />}
            trend={`${account.propertyIds.length} properties`}
          />
          <KpiCard
            title="Open Opportunities"
            value={formattedOpenValue}
            icon={<Briefcase className="h-5 w-5 text-muted-foreground" />}
            trend={`${openOpportunitiesCount} open leads`}
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
    </>
  );
}
