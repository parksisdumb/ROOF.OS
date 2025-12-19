'use client';
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { Property, Account } from '@/lib/types';
import { Pencil, MapPin, Building, Warehouse, Home, Building2, Store } from 'lucide-react';
import { Button } from '../ui/button';
import Link from 'next/link';

const getPropertyIcon = (type: Property['propertyType']) => {
    switch (type) {
        case 'Commercial':
            return <Building className="h-8 w-8 text-muted-foreground" />;
        case 'Industrial':
            return <Warehouse className="h-8 w-8 text-muted-foreground" />;
        case 'Residential':
            return <Home className="h-8 w-8 text-muted-foreground" />;
        case 'Office':
            return <Building2 className="h-8 w-8 text-muted-foreground" />;
        case 'Retail':
            return <Store className="h-8 w-8 text-muted-foreground" />;
        default:
            return <Building className="h-8 w-8 text-muted-foreground" />;
    }
}


export function PropertyHeader({ property, account }: { property: Property, account?: Account }) {
  const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);
  
  const fullAddress = `${property.streetAddress}, ${property.city}, ${property.state} ${property.zip}`;

  return (
    <>
      {/* <EditPropertyForm
        property={property}
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
      /> */}
      <Card>
        <CardHeader className="flex flex-row items-start justify-between">
          <div className="flex items-center gap-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-muted">
                {getPropertyIcon(property.propertyType)}
            </div>
            <div>
                <CardTitle>{property.propertyName}</CardTitle>
                <CardDescription className="flex items-center gap-2 mt-1">
                    <MapPin className="h-4 w-4" />
                    {fullAddress}
                </CardDescription>
                {account && (
                    <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                        <Building className="h-4 w-4" />
                        <span>Part of </span>
                        <Link href={`/accounts/${account.id}`} className="hover:underline font-medium text-primary">
                            {account.name}
                        </Link>
                    </div>
                )}
            </div>
          </div>
          <Button variant="outline" onClick={() => setIsEditDialogOpen(true)}>
            <Pencil className="mr-2 h-4 w-4" />
            Edit Property
          </Button>
        </CardHeader>
      </Card>
    </>
  );
}
