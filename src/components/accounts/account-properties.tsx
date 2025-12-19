import type { Property } from '@/lib/types';
import { CardTitle } from '@/components/ui/card';
import { MapPin, Warehouse, Building, Home } from 'lucide-react';

const getPropertyIcon = (type: Property['type']) => {
    switch (type) {
        case 'Commercial':
            return <Building className="h-5 w-5 text-muted-foreground" />;
        case 'Industrial':
            return <Warehouse className="h-5 w-5 text-muted-foreground" />;
        case 'Residential':
            return <Home className="h-5 w-5 text-muted-foreground" />;
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
          <div key={property.id} className="flex items-start gap-4 rounded-md border p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                {getPropertyIcon(property.type)}
            </div>
            <div className="flex-grow">
              <p className="font-medium flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                {property.address}
              </p>
              <p className="text-sm text-muted-foreground">
                {property.type} | Roof: {property.roofType}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
