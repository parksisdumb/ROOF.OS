import { MainLayout } from '@/components/layout/main-layout';
import { accounts, properties } from '@/lib/data';
import { notFound } from 'next/navigation';
import { PropertyHeader } from '@/components/properties/property-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Construction, Hand, Home, Layers, Ruler, Thermometer, User, Warehouse, Hourglass } from 'lucide-react';
import { Separator } from '@/components/ui/separator';


export default function PropertyDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const property = properties.find((prop) => prop.id === params.id);

  if (!property) {
    notFound();
  }

  const account = accounts.find((acc) => acc.id === property.accountId);

  return (
    <MainLayout>
      <div className="flex flex-col gap-6">
        <PropertyHeader property={property} account={account} />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <Card className='lg:col-span-2'>
              <CardHeader>
                <CardTitle>Roof Details</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 gap-6 text-sm md:grid-cols-2">
                <div className="flex items-start gap-4">
                  <Construction className="mt-1 h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-muted-foreground">Roof Type</p>
                    <p className="font-medium">{property.roofType}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Ruler className="mt-1 h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-muted-foreground">Approx. Square Footage</p>
                    <p className="font-medium">{property.approxSqft.toLocaleString()} sqft</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Calendar className="mt-1 h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-muted-foreground">Last Install Year</p>
                    <p className="font-medium">{property.lastRoofInstallYear || 'N/A'}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Hourglass className="mt-1 h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-muted-foreground">Estimated Remaining Life</p>
                    <p className="font-medium">{property.estimatedRemainingLife !== undefined ? `${property.estimatedRemainingLife} years` : 'N/A'}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Maintenance & Health</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-sm">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3"><Thermometer className="h-4 w-4 text-muted-foreground" /><span>Known Leaks</span></div>
                            {property.knownLeaks ? <Badge variant="destructive">Yes</Badge> : <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">No</Badge>}
                        </div>
                        <Separator/>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3"><Hand className="h-4 w-4 text-muted-foreground" /><span>Maintenance Program</span></div>
                            {property.maintenanceProgram === 'Yes' ? <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Active</Badge> : <Badge variant="secondary">Inactive</Badge>}
                        </div>
                        {property.inspectionFrequency && (
                            <>
                            <Separator/>
                             <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3"><Calendar className="h-4 w-4 text-muted-foreground" /><span>Inspection Frequency</span></div>
                                <span className='font-medium'>{property.inspectionFrequency}</span>
                            </div>
                            </>
                        )}
                    </CardContent>
                </Card>
            </div>
             <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Building Details</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 gap-6 text-sm md:grid-cols-3">
                <div className="flex items-start gap-4">
                  <Warehouse className="mt-1 h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-muted-foreground">Property Type</p>
                    <p className="font-medium">{property.propertyType}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Layers className="mt-1 h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-muted-foreground">Stories</p>
                    <p className="font-medium">{property.stories}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Calendar className="mt-1 h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-muted-foreground">Year Built</p>
                    <p className="font-medium">{property.yearBuilt}</p>
                  </div>
                </div>
                 {property.assignedRepId && (
                    <div className="flex items-start gap-4">
                    <User className="mt-1 h-5 w-5 text-muted-foreground" />
                    <div>
                        <p className="text-muted-foreground">Assigned Rep</p>
                        <p className="font-medium">{property.assignedRepId}</p>
                    </div>
                    </div>
                 )}
              </CardContent>
            </Card>
        </div>
      </div>
    </MainLayout>
  );
}
