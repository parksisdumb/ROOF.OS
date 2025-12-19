import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>A log of recent sales activities.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className=" flex items-center gap-4">
          <Avatar className="hidden h-9 w-9 sm:flex">
            <AvatarImage src="https://picsum.photos/seed/10/100/100" alt="Avatar" data-ai-hint="person face" />
            <AvatarFallback>SJ</AvatarFallback>
          </Avatar>
          <div className="grid gap-1">
            <p className="text-sm font-medium leading-none">
              Logged a call with Sarah Johnson
            </p>
            <p className="text-sm text-muted-foreground">
              Discussed the new proposal for Highrise Tower.
            </p>
          </div>
          <div className="ml-auto text-sm text-muted-foreground">2h ago</div>
        </div>
        <div className=" flex items-center gap-4">
          <Avatar className="hidden h-9 w-9 sm:flex">
            <AvatarImage src="https://picsum.photos/seed/11/100/100" alt="Avatar" data-ai-hint="person face" />
            <AvatarFallback>MW</AvatarFallback>
          </Avatar>
          <div className="grid gap-1">
            <p className="text-sm font-medium leading-none">
              Generated AI tasks for Suburban Office Park
            </p>
            <p className="text-sm text-muted-foreground">
              3 new follow-up tasks created.
            </p>
          </div>
          <div className="ml-auto text-sm text-muted-foreground">5h ago</div>
        </div>
        <div className=" flex items-center gap-4">
          <Avatar className="hidden h-9 w-9 sm:flex">
            <AvatarImage src="https://picsum.photos/seed/12/100/100" alt="Avatar" data-ai-hint="person face" />
            <AvatarFallback>CL</AvatarFallback>
          </Avatar>
          <div className="grid gap-1">
            <p className="text-sm font-medium leading-none">
              Updated lead stage for Riverside Complex to "Won"
            </p>
            <p className="text-sm text-muted-foreground">
              Contract signed.
            </p>
          </div>
          <div className="ml-auto text-sm text-muted-foreground">Yesterday</div>
        </div>
        <div className=" flex items-center gap-4">
          <Avatar className="hidden h-9 w-9 sm:flex">
            <AvatarImage src="https://picsum.photos/seed/13/100/100" alt="Avatar" data-ai-hint="person face" />
            <AvatarFallback>RF</AvatarFallback>
          </Avatar>
          <div className="grid gap-1">
            <p className="text-sm font-medium leading-none">
              Added new prospect "Logistics Warehouse" from map
            </p>
            <p className="text-sm text-muted-foreground">
              Found via Prospecting Map feature.
            </p>
          </div>
          <div className="ml-auto text-sm text-muted-foreground">2 days ago</div>
        </div>
      </CardContent>
    </Card>
  );
}
