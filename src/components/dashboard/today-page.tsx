'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  AlertCircle,
  CalendarCheck,
  CalendarClock,
  ChevronRight,
  Phone,
  Mail,
  User,
  Building,
  DollarSign
} from 'lucide-react';
import { KpiCard } from './kpi-card';
import { getCategorizedTasks } from '@/lib/tasks';
import { Button } from '../ui/button';
import { format, formatDistanceToNow } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import Link from 'next/link';
import { UpcomingTasks } from './upcoming-tasks';
import { PipelineHealthAlerts } from './pipeline-health-alerts';


export function TodayPage() {
  const { overdue, dueToday, upcoming, highestPriority } = getCategorizedTasks();

  const getIconForType = (type?: 'Email' | 'Call' | 'Meeting') => {
    switch (type) {
      case 'Email':
        return <Mail className="h-4 w-4 text-muted-foreground" />;
      case 'Call':
        return <Phone className="h-4 w-4 text-muted-foreground" />;
      case 'Meeting':
        return <CalendarCheck className="h-4 w-4 text-muted-foreground" />;
      default:
        return <CalendarCheck className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Follow-up Execution KPIs */}
      <div className="grid gap-4 md:grid-cols-3">
        <KpiCard
          title="Overdue"
          value={overdue.length.toString()}
          icon={<AlertCircle className="h-5 w-5 text-destructive" />}
          trend={
            overdue.length > 0 ? 'These need immediate attention' : 'All caught up!'
          }
          variant={overdue.length > 0 ? 'destructive' : 'default'}
        />
        <KpiCard
          title="Due Today"
          value={dueToday.length.toString()}
          icon={<CalendarCheck className="h-5 w-5 text-primary" />}
          trend="Tasks to complete today"
        />
        <KpiCard
          title="Upcoming"
          value={upcoming.length.toString()}
          icon={<CalendarClock className="h-5 w-5 text-muted-foreground" />}
          trend="In the next 7 days"
        />
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
         {/* Do This Now */}
        <div className="lg:col-span-3">
            {highestPriority ? (
                 <Card>
                    <CardHeader>
                        <CardTitle>Do This Now</CardTitle>
                        <CardDescription>Your highest priority follow-up.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col gap-4 rounded-lg border-2 border-primary bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-start gap-4">
                            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary">
                                {getIconForType(highestPriority.relatedEntity.followUpType)}
                            </span>
                            <div>
                                <p className="font-semibold">{highestPriority.title}</p>
                                <p className="text-sm text-muted-foreground">
                                    Due: {formatDistanceToNow(new Date(highestPriority.dueDate), { addSuffix: true })}
                                </p>
                            </div>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                {highestPriority.type === 'Lead' && (highestPriority.relatedEntity as any).estimatedValue && (
                                    <div className='flex items-center gap-1'><DollarSign className="h-4 w-4" /> {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format((highestPriority.relatedEntity as any).estimatedValue)}</div>
                                )}
                                {highestPriority.relatedAccount && (
                                    <div className='flex items-center gap-1'><Building className="h-4 w-4" /> {highestPriority.relatedAccount.name}</div>
                                )}
                            </div>

                            <Link href={highestPriority.type === 'Lead' ? `/leads/${highestPriority.relatedEntity.id}` : `/contacts/${highestPriority.relatedEntity.id}`}>
                                <Button>
                                    View Details <ChevronRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            ) : (
                <Card>
                    <CardHeader>
                        <CardTitle>All Caught Up!</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-center text-muted-foreground py-8">
                            No priority follow-ups scheduled.
                        </p>
                    </CardContent>
                </Card>
            )}
          </div>

          <div className='lg:col-span-2'>
            <UpcomingTasks />
          </div>
          <div>
            <PipelineHealthAlerts />
          </div>
      </div>
    </div>
  );
}
