import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';

type KpiCardProps = {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: string;
  variant?: 'default' | 'destructive';
};

export function KpiCard({ title, value, icon, trend, variant = 'default' }: KpiCardProps) {
  return (
    <Card className={cn(variant === 'destructive' && 'border-destructive bg-destructive/10')}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className={cn("text-2xl font-bold", variant === 'destructive' && 'text-destructive')}>
          {value}
        </div>
        <p className="text-xs text-muted-foreground">{trend}</p>
      </CardContent>
    </Card>
  );
}
