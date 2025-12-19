import type { Contact } from '@/lib/types';
import { CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Phone, Mail } from 'lucide-react';
import { Button } from '../ui/button';

export function AccountContacts({ contacts }: { contacts: Contact[] }) {
  return (
    <div className="space-y-4">
      <CardTitle>Key Contacts</CardTitle>
      <div className="space-y-4">
        {contacts.map((contact) => (
          <div key={contact.id} className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src={contact.avatarUrl} alt={contact.name} />
              <AvatarFallback>
                {contact.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-grow">
              <p className="font-medium">{contact.name}</p>
              <p className="text-sm text-muted-foreground">{contact.role}</p>
            </div>
            <div className="flex gap-2">
                <Button variant="outline" size="icon" asChild>
                    <a href={`mailto:${contact.email}`}>
                        <Mail className="h-4 w-4" />
                        <span className="sr-only">Email</span>
                    </a>
                </Button>
                <Button variant="outline" size="icon" asChild>
                    <a href={`tel:${contact.phone}`}>
                        <Phone className="h-4 w-4" />
                        <span className="sr-only">Call</span>
                    </a>
                </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
