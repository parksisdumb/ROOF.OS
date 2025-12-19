'use client';
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { Contact, Account } from '@/lib/types';
import { Pencil, Mail, Phone, Building } from 'lucide-react';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import Link from 'next/link';

export function ContactHeader({ contact, account }: { contact: Contact, account?: Account }) {
  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-start justify-between">
            <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                    <AvatarImage src={contact.avatarUrl} alt={contact.name} />
                    <AvatarFallback>
                        {contact.name.split(' ').map((n) => n[0]).join('')}
                    </AvatarFallback>
                </Avatar>
                <div>
                    <CardTitle>{contact.name}</CardTitle>
                    <CardDescription>{contact.jobTitle}</CardDescription>
                     {account && (
                        <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                            <Building className="h-4 w-4" />
                            <Link href={`/accounts/${account.id}`} className="hover:underline">
                                {account.name}
                            </Link>
                        </div>
                    )}
                </div>
            </div>
          <Button variant="outline">
            <Pencil className="mr-2 h-4 w-4" />
            Edit Contact
          </Button>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="flex items-center gap-4 rounded-md border p-4">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <div className="flex-grow">
                    <p className="text-sm text-muted-foreground">Email</p>
                    <a href={`mailto:${contact.email}`} className="font-medium hover:underline">{contact.email}</a>
                </div>
            </div>
            <div className="flex items-center gap-4 rounded-md border p-4">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <div className="flex-grow">
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <a href={`tel:${contact.phone}`} className="font-medium hover:underline">{contact.phone}</a>
                </div>
            </div>
        </CardContent>
      </Card>
    </>
  );
}
