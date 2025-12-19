'use client';
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { Lead, Account } from '@/lib/types';
import { DollarSign, Percent, Target, Calendar, Pencil, Building } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { KpiCard } from '../dashboard/kpi-card';
import { accounts } from '@/lib/data';
import Link from 'next/link';

const getStatusBadge = (status: Lead['status']) => {
    switch (status) {
      case 'New':
        return <Badge variant="secondary">{status}</Badge>;
      case 'Contacted':
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">{status}</Badge>;
      case 'Qualified':
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">{status}</Badge>;
      case 'Proposal':
        return <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">{status}</Badge>;
      case 'Won':
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">{status}</Badge>;
      case 'Lost':
        return <Badge variant="destructive">{status}</Badge>;
      case 'Active':
          return <Badge className="bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-200">{status}</Badge>;
      case 'Delayed':
          return <Badge variant="outline">{status}</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

export function LeadHeader({ lead }: { lead: Lead }) {
  const account = accounts.find(acc => acc.id === lead.accountId);

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-start justify-between">
          <div>
            <div className="flex items-center gap-4">
              <CardTitle>{lead.opportunityName}</CardTitle>
              {getStatusBadge(lead.status)}
            </div>
            {account && (
                <CardDescription className='flex items-center gap-2 mt-1'>
                    <Building className="h-4 w-4" />
                    <Link href={`/accounts/${account.id}`} className="hover:underline">{account.name}</Link>
                </CardDescription>
            )}
          </div>
          <Button variant="outline">
            <Pencil className="mr-2 h-4 w-4" />
            Edit Opportunity
          </Button>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-4">
           <KpiCard
            title="Estimated Value"
            value={new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                maximumFractionDigits: 0,
              }).format(lead.estimatedValue)}
            icon={<DollarSign className="h-5 w-5 text-muted-foreground" />}
            trend={`Type: ${lead.opportunityType}`}
          />
          <KpiCard
            title="Probability"
            value={`${lead.probability || 'N/A'}%`}
            icon={<Target className="h-5 w-5 text-muted-foreground" />}
            trend={lead.probability ? `Weighted Value: ${new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                maximumFractionDigits: 0,
              }).format(lead.estimatedValue * (lead.probability/100))}` : ''}
          />
          <KpiCard
            title="Expected Close"
            value={lead.expectedCloseDate ? new Date(lead.expectedCloseDate).toLocaleDateString() : 'N/A'}
            icon={<Calendar className="h-5 w-5 text-muted-foreground" />}
            trend="Target date for deal closure"
          />
          <KpiCard
            title="Last Interaction"
            value={new Date(lead.lastInteraction).toLocaleDateString()}
            icon={<Calendar className="h-5 w-5 text-muted-foreground" />}
            trend="Last contact with prospect"
          />
        </CardContent>
      </Card>
    </>
  );
}
