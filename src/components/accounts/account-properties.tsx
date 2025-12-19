import type { Property } from '@/lib/types';
import { CardTitle } from '@/components/ui/card';
import { MapPin, Warehouse, Building, Home, Building2, Store } from 'lucide-react';
import Link from 'next/link';

const getPropertyIcon = (type: Property['propertyType']) => {
    switch (type) {
        case 'Commercial':
            return <Building className="h-5 w-5 text-muted-foreground" />;
        case 'Industrial':
            return <Warehouse className="h-5 w-5 text-muted-foreground" />;
        case 'Residential':
            return <Home className="h-5 w-5 text-muted-foreground" />;
        case 'Office':
            return <Building2 className="h-5 w-5 text-muted-foreground" />;
        case 'Retail':
            return <Store className="h-5 w-5 text-muted-foreground" />;
        default:
            return <Building className="h-5 w-5 text-muted-foreground" />;
    }
}

export function AccountProperties({ properties }: { properties: Property[] }) {
  return (
    <div className="space-y-4">
      <CardTitle>Properties</CardTitle>
      <div className="space-y-4">
        {properties.map((property) => (
          <Link key={property.id} href={`/properties/${property.id}`} className="flex items-start gap-4 rounded-md border p-4 hover:bg-secondary/50 transition-colors group">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                {getPropertyIcon(property.propertyType)}
            </div>
            <div className="flex-grow">
              <p className="font-medium group-hover:underline">
                {property.propertyName}
              </p>
              <p className="text-sm text-muted-foreground flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {property.streetAddress}, {property.city}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
