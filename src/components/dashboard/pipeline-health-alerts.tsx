'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getPipelineAlerts } from '@/lib/tasks';
import type { PipelineAlert } from '@/lib/types';
import { AlertTriangle, ShieldAlert, History, CalendarX } from 'lucide-react';
import Link from 'next/link';
import { ScrollArea } from '../ui/scroll-area';

const getIconForType = (type: PipelineAlert['type']) => {
  switch (type) {
    case 'Untouched Opportunity':
      return <History className="h-5 w-5 text-yellow-500" />;
    case 'Missing Follow-up':
      return <CalendarX className="h-5 w-5 text-orange-500" />;
    case 'High Risk':
    case 'Competitor':
      return <ShieldAlert className="h-5 w-5 text-red-500" />;
    default:
      return <AlertTriangle className="h-5 w-5 text-muted-foreground" />;
  }
};

export function PipelineHealthAlerts() {
  const alerts = getPipelineAlerts();

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Pipeline Health</CardTitle>
        <CardDescription>Actionable risks in your pipeline.</CardDescription>
      </CardHeader>
      <CardContent>
        {alerts.length > 0 ? (
          <ScrollArea className="h-[300px] pr-4">
            <div className="space-y-4">
              {alerts.map((alert) => (
                <Link
                  href={`/leads/${alert.relatedLeadId}`}
                  key={alert.id}
                  className="flex items-start gap-4 rounded-md p-2 -m-2 hover:bg-secondary transition-colors"
                >
                  <div className="mt-1">
                    {getIconForType(alert.type)}
                  </div>
                  <div className="flex-grow">
                    <p className="font-medium text-sm leading-tight">{alert.type}</p>
                    <p className="text-sm text-muted-foreground">
                      {alert.message}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </ScrollArea>
        ) : (
          <div className="flex h-[150px] items-center justify-center rounded-md border border-dashed">
            <p className="text-sm text-muted-foreground">No pipeline alerts.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
