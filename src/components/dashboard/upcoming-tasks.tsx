'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getCategorizedTasks } from '@/lib/tasks';
import { format, isToday } from 'date-fns';
import { Mail, Phone, CalendarCheck, Building } from 'lucide-react';
import Link from 'next/link';

export function UpcomingTasks() {
  const { dueToday, upcoming } = getCategorizedTasks();
  const tasks = [...dueToday, ...upcoming.slice(0, 5 - dueToday.length)]; // Show up to 5 tasks total

  const getIconForType = (type?: 'Email' | 'Call' | 'Meeting') => {
    switch (type) {
      case 'Email':
        return <Mail className="h-5 w-5" />;
      case 'Call':
        return <Phone className="h-5 w-5" />;
      case 'Meeting':
        return <CalendarCheck className="h-5 w-5" />;
      default:
        return <CalendarCheck className="h-5 w-5" />;
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>My Agenda</CardTitle>
        <CardDescription>
          Your upcoming follow-ups for today and the week ahead.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {tasks.length > 0 ? (
          <div className="space-y-4">
            {tasks.map((task) => (
              <Link
                href={
                  task.type === 'Lead'
                    ? `/leads/${task.relatedEntity.id}`
                    : `/contacts/${task.relatedEntity.id}`
                }
                key={task.id}
                className="flex items-center gap-4 rounded-md p-2 -m-2 hover:bg-secondary transition-colors"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                  {getIconForType(task.relatedEntity.followUpType)}
                </div>
                <div className="flex-grow">
                  <p className="font-medium leading-tight">{task.title}</p>
                  {task.relatedAccount && (
                    <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                        <Building className='h-3 w-3'/> {task.relatedAccount.name}
                    </p>
                  )}
                </div>
                <div className="text-right text-sm text-muted-foreground">
                  {isToday(new Date(task.dueDate))
                    ? 'Today'
                    : format(new Date(task.dueDate), 'E, MMM d')}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex h-[150px] items-center justify-center rounded-md border border-dashed">
            <p className="text-sm text-muted-foreground">No upcoming tasks.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
