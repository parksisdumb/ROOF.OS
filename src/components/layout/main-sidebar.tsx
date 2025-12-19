'use client';
import Link from 'next/link';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  SidebarGroup,
  SidebarGroupLabel,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  Users,
  Building,
  Briefcase,
  Map,
  Settings,
  LifeBuoy,
  Warehouse
} from 'lucide-react';
import { Logo } from '@/components/icons/logo';
import { usePathname } from 'next/navigation';
import { Button } from '../ui/button';
import type { NavItem } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

const mainNav: NavItem[] = [
  { href: '/', title: 'Dashboard', icon: LayoutDashboard },
  { href: '/leads', title: 'Leads', icon: Briefcase },
  { href: '/accounts', title: 'Accounts', icon: Building },
  { href: '/contacts', title: 'Contacts', icon: Users },
  { href: '/properties', title: 'Properties', icon: Warehouse },
  { href: '/prospecting', title: 'Prospecting Map', icon: Map },
];

const secondaryNav: NavItem[] = [
  { href: '/settings', title: 'Settings', icon: Settings },
  { href: '/support', title: 'Support', icon: LifeBuoy },
];

export function MainSidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    // Handle special case for root, otherwise check startsWith
    if (href === '/') {
        return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <Logo className="h-7 w-7 text-primary" />
          <span className="text-lg font-semibold">RoofForce OS</span>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {mainNav.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} passHref>
                <SidebarMenuButton
                  isActive={isActive(item.href)}
                  tooltip={item.title}
                  asChild
                >
                  <span>
                    <item.icon />
                    <span>{item.title}</span>
                  </span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          {secondaryNav.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} passHref>
                <SidebarMenuButton
                  isActive={isActive(item.href)}
                  tooltip={item.title}
                  asChild
                >
                  <span>
                    <item.icon />
                    <span>{item.title}</span>
                  </span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarFooter>
    </>
  );
}
