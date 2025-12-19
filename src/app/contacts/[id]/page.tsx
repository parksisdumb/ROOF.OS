'use client';
import { MainLayout } from '@/components/layout/main-layout';
import { accounts, contacts, properties, leads } from '@/lib/data';
import { notFound } from 'next/navigation';
import { ContactHeader } from '@/components/contacts/contact-header';
import type { Account, Contact, Property, Lead } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Building,
  Briefcase,
  StickyNote,
  UserCheck,
  Zap,
  Heart,
  Mail,
  Clock,
  Linkedin,
  Calendar,
  AlertTriangle,
  History,
  TrendingUp,
  DollarSign,
  MapPin,
  FileText
} from 'lucide-react';
import Link from 'next/link';
import { format, formatDistanceToNow } from 'date-fns';
import { Badge } from '@/components/ui/badge';


const getStatusBadge = (status?: Contact['relationshipStatus']) => {
    if (!status) return null;
    switch(status) {
        case 'Cold': return <Badge variant="secondary">{status}</Badge>;
        case 'Warming': return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">{status}</Badge>;
        case 'Active': return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">{status}</Badge>;
        case 'Stalled': return <Badge variant="destructive">{status}</Badge>;
        default: return <Badge>{status}</Badge>;
    }
}

const getRoleBadge = (role?: Contact['roleType']) => {
    if (!role) return null;
    switch(role) {
        case 'Decision Maker': return <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">{role}</Badge>;
        case 'Influencer': return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">{role}</Badge>;
        case 'Gatekeeper': return <Badge variant="outline">{role}</Badge>;
        default: return <Badge variant="secondary">{role}</Badge>;
    }
}


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
  const connectedProperties = properties.filter(p => p.accountId === contact.accountId);
  const connectedLeads = leads.filter(l => l.contactId === contact.id);

  return (
    <MainLayout>
      <div className="flex flex-col gap-6">
        <ContactHeader contact={contact} account={account} />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Sales Insights */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Zap className="h-5 w-5 text-muted-foreground"/>Sales Insights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
                <div className="flex items-start gap-3"><UserCheck className="h-4 w-4 mt-0.5 text-muted-foreground" /><p><span className="font-medium">Role:</span> {getRoleBadge(contact.roleType)}</p></div>
                <div className="flex items-start gap-3"><Heart className="h-4 w-4 mt-0.5 text-muted-foreground" /><p><span className="font-medium">Relationship:</span> {getStatusBadge(contact.relationshipStatus)}</p></div>
                <div className="flex items-start gap-3"><TrendingUp className="h-4 w-4 mt-0.5 text-muted-foreground" /><p><span className="font-medium">Lead Source:</span> {contact.leadSource || 'N/A'}</p></div>
            </CardContent>
          </Card>
          
          {/* Contact Methods */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Mail className="h-5 w-5 text-muted-foreground"/>Contact Methods</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
                <div className="flex items-start gap-3"><Mail className="h-4 w-4 mt-0.5 text-muted-foreground" /><p><span className="font-medium">Preferred:</span> {contact.preferredContactMethod || 'N/A'}</p></div>
                <div className="flex items-start gap-3"><Clock className="h-4 w-4 mt-0.5 text-muted-foreground" /><p><span className="font-medium">Best Time:</span> {contact.bestTimeToReach || 'N/A'}</p></div>
                {contact.linkedinUrl && (
                    <div className="flex items-start gap-3">
                        <Linkedin className="h-4 w-4 mt-0.5 text-muted-foreground" />
                        <Link href={contact.linkedinUrl} target="_blank" className="text-primary hover:underline font-medium">View LinkedIn Profile</Link>
                    </div>
                )}
            </CardContent>
          </Card>

          {/* Key Dates & Follow-ups */}
          <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Calendar className="h-5 w-5 text-muted-foreground"/>Key Dates & Follow-ups</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
                 <div className="flex items-start gap-3">
                    <History className="h-4 w-4 mt-0.5 text-muted-foreground" />
                    <div>
                        <p className="font-medium">Last Activity</p>
                        <p>{contact.lastActivityDate ? `${contact.lastActivityType} ${formatDistanceToNow(new Date(contact.lastActivityDate))} ago` : 'N/A'}</p>
                    </div>
                 </div>
                 {contact.followUpDate ? (
                     <div className="flex items-start gap-3">
                        <Calendar className="h-4 w-4 mt-0.5 text-muted-foreground" />
                        <div>
                            <p className="font-medium">Next Follow-up</p>
                            <p>{contact.followUpType} on {format(new Date(contact.followUpDate), 'MMM d, yyyy')}</p>
                        </div>
                     </div>
                 ) : (
                    <div className="flex items-start gap-3"><AlertTriangle className="h-4 w-4 mt-0.5 text-yellow-500" /><p className="font-medium">No follow-up scheduled</p></div>
                 )}
            </CardContent>
          </Card>
          
           {/* Account & Properties */}
          <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle>Account & Properties</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {account ? (
                    <Link href={`/accounts/${account.id}`} className="flex items-center gap-4 group rounded-md border p-4 hover:bg-secondary/50 transition-colors">
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
                 <div className="space-y-2">
                    <h4 className="font-medium text-sm px-4">Connected Properties ({connectedProperties.length})</h4>
                    <div className="max-h-32 overflow-y-auto pr-2">
                        {connectedProperties.map(prop => (
                            <div key={prop.id} className="flex items-center gap-2 p-2 rounded-md hover:bg-secondary/50">
                                <MapPin className="h-4 w-4 text-muted-foreground"/>
                                <p className="text-sm">{prop.address}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
          </Card>
          
           {/* Notes */}
          {contact.notes && (
             <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <StickyNote className="h-5 w-5 text-muted-foreground" />
                        Notes
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">{contact.notes}</p>
                </CardContent>
            </Card>
          )}

          {/* Connected Opportunities */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Connected Opportunities</CardTitle>
              <CardDescription>Sales leads associated with this contact.</CardDescription>
            </CardHeader>
            <CardContent>
              {connectedLeads.length > 0 ? (
                 <div className="space-y-4">
                  {connectedLeads.map(lead => (
                    <div key={lead.id} className="flex flex-wrap items-center justify-between gap-4 rounded-md border p-4">
                      <div className="flex-1 min-w-40">
                        <p className="font-medium">{lead.prospectName}</p>
                        <p className="text-sm text-muted-foreground">{lead.company}</p>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <DollarSign className="h-4 w-4 text-green-500" />
                        <span className="font-medium">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(lead.value)}</span>
                      </div>
                       <div className="flex items-center gap-2 text-sm">
                         <FileText className="h-4 w-4 text-muted-foreground" />
                         <span>{lead.stage}</span>
                       </div>
                       <div className="flex items-center gap-2 text-sm">
                         <Calendar className="h-4 w-4 text-muted-foreground" />
                         <span>Last interaction: {format(new Date(lead.lastInteraction), 'MMM d, yyyy')}</span>
                       </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No opportunities connected to this contact yet.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
