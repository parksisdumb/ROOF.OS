
import { MainLayout } from '@/components/layout/main-layout';
import { accounts, properties, leads, contacts } from '@/lib/data';
import { notFound } from 'next/navigation';
import type { Account, Contact, Property, Lead } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Building,
  User,
  Wrench,
  MapPin,
  AlertTriangle,
  Calendar,
  Users,
  FileText,
  ShieldCheck,
  ShieldAlert,
  Zap,
  Clock,
  History,
  Info
} from 'lucide-react';
import Link from 'next/link';
import { LeadHeader } from '@/components/leads/lead-header';
import { Badge } from '@/components/ui/badge';
import { format, formatDistanceToNow } from 'date-fns';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';


const RiskScoreIndicator = ({ score }: { score?: number }) => {
    if (score === undefined) return <Badge variant="secondary">N/A</Badge>;

    let colorClass = '';
    let label = '';
    if (score <= 33) {
        colorClass = 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
        label = 'Low Risk';
    } else if (score <= 66) {
        colorClass = 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
        label = 'Medium Risk';
    } else {
        colorClass = 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
        label = 'High Risk';
    }

    return (
        <div className="flex items-center gap-2">
            <Progress value={score} className="w-24 h-2" />
            <Badge className={colorClass}>{label}</Badge>
        </div>
    )
}


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
  const daysInactive = formatDistanceToNow(new Date(lead.lastInteraction), { addSuffix: false });

  return (
    <MainLayout>
      <div className="flex flex-col gap-6">
        <LeadHeader lead={lead} />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Associated Items */}
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

           {/* Execution & Risk */}
           <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><AlertTriangle className="h-5 w-5 text-muted-foreground"/>Execution & Risk</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6 text-sm">
                <div className="flex items-start gap-3"><Clock className="h-4 w-4 mt-0.5 text-muted-foreground" /><p><span className="font-medium">Days Inactive:</span> {daysInactive}</p></div>
                <div className="flex items-start gap-3">
                    <Calendar className="h-4 w-4 mt-0.5 text-muted-foreground" />
                    <div><p className="font-medium">Next Follow-up:</p> {lead.nextFollowUpAt ? format(new Date(lead.nextFollowUpAt), 'MMM d, yyyy') : 'Not scheduled'}</div>
                </div>
                <div className="flex items-start gap-3"><ShieldAlert className="h-4 w-4 mt-0.5 text-muted-foreground" /><p><span className="font-medium">Risk Score:</span></p> <RiskScoreIndicator score={lead.riskScore}/></div>
                <div className="flex items-start gap-3"><Users className="h-4 w-4 mt-0.5 text-muted-foreground" /><p><span className="font-medium">Competitors:</span> {lead.competitorsInvolved ? <Badge variant="destructive">Involved</Badge> : <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">None</Badge>}</p></div>
                {lead.delayReason && <div className="flex items-start gap-3 md:col-span-2"><Info className="h-4 w-4 mt-0.5 text-muted-foreground" /><p><span className="font-medium">Delay Reason:</span> {lead.delayReason}</p></div>}
            </CardContent>
          </Card>

          {/* Scope Details */}
          <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><FileText className="h-5 w-5 text-muted-foreground"/>Scope Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
                {lead.scopeSummary && <p className="text-muted-foreground whitespace-pre-wrap">{lead.scopeSummary}</p>}
                <Separator/>
                <div className="flex items-center justify-between"><span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-muted-foreground"/>Insurance Involved</span> {lead.insuranceInvolved ? 'Yes' : 'No'}</div>
                <Separator/>
                <div className="flex items-center justify-between"><span className="flex items-center gap-2"><Zap className="h-4 w-4 text-muted-foreground"/>Emergency Repair</span> {lead.emergencyRepair ? 'Yes' : 'No'}</div>
                 <Separator/>
                <div className="flex items-center justify-between"><span className="flex items-center gap-2"><FileText className="h-4 w-4 text-muted-foreground"/>Warranty Required</span> {lead.warrantyRequired ? 'Yes' : 'No'}</div>
            </CardContent>
          </Card>

        </div>
      </div>
    </MainLayout>
  );
}
