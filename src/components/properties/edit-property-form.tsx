'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Pencil, Loader2, CalendarIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { Property } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { updateProperty } from '@/lib/actions';
import { ScrollArea } from '../ui/scroll-area';
import { Switch } from '../ui/switch';

const formSchema = z.object({
  propertyName: z.string().min(2, {
    message: 'Property name must be at least 2 characters.',
  }),
  streetAddress: z.string().min(5, {
    message: 'Street address is required.',
  }),
  city: z.string().min(2, {
    message: 'City is required.',
  }),
  state: z.string().length(2, {
    message: 'State must be a 2-letter abbreviation.',
  }),
  zip: z.string().min(5, {
    message: 'Zip code is required.',
  }),
  propertyType: z.enum(['Warehouse', 'Retail', 'Office', 'Industrial', 'Commercial', 'Residential']),
  roofType: z.enum(['TPO', 'EPDM', 'Metal', 'Mod Bit', 'Asphalt Shingle']),
  approxSqft: z.coerce.number().positive(),
  stories: z.coerce.number().int().positive(),
  yearBuilt: z.coerce.number().int().min(1800).max(new Date().getFullYear()),
  lastRoofInstallYear: z.coerce.number().int().min(1800).max(new Date().getFullYear()).optional(),
  estimatedRemainingLife: z.coerce.number().int().min(0).optional(),
  knownLeaks: z.boolean(),
  maintenanceProgram: z.enum(['Yes', 'No']),
  inspectionFrequency: z.enum(['Annually', 'Semi-Annually', 'Quarterly']).optional(),
  assignedRepId: z.string().optional(),
});

type EditPropertyFormProps = {
  property: Property;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

export function EditPropertyForm({
  property,
  isOpen,
  onOpenChange,
}: EditPropertyFormProps) {
  const [isSaving, setIsSaving] = React.useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...property,
      approxSqft: property.approxSqft || 0,
      stories: property.stories || 1,
      yearBuilt: property.yearBuilt || new Date().getFullYear(),
      lastRoofInstallYear: property.lastRoofInstallYear || undefined,
      estimatedRemainingLife: property.estimatedRemainingLife || undefined,
      knownLeaks: property.knownLeaks || false,
      maintenanceProgram: property.maintenanceProgram || 'No',
    },
  });

  React.useEffect(() => {
    if (isOpen) {
      form.reset({
        ...property,
        approxSqft: property.approxSqft || 0,
        stories: property.stories || 1,
        yearBuilt: property.yearBuilt || new Date().getFullYear(),
        lastRoofInstallYear: property.lastRoofInstallYear || undefined,
        estimatedRemainingLife: property.estimatedRemainingLife || undefined,
        knownLeaks: property.knownLeaks || false,
        maintenanceProgram: property.maintenanceProgram || 'No',
      });
    }
  }, [isOpen, property, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSaving(true);
    const result = await updateProperty(property.id, values);
    setIsSaving(false);

    if (result.success) {
      toast({
        title: 'Property Updated',
        description: `"${values.propertyName}" has been updated successfully.`,
      });
      onOpenChange(false);
      window.location.reload();
    } else {
      toast({
        title: 'Error Updating Property',
        description: result.error || 'An unknown error occurred.',
        variant: 'destructive',
      });
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Pencil className="h-6 w-6 text-primary" />
            Edit Property
          </DialogTitle>
          <DialogDescription>
            Update the details for "{property.propertyName}".
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <ScrollArea className="h-[60vh] pr-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="propertyName"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Property Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Metro Business Tower" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="streetAddress"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Street Address</FormLabel>
                      <FormControl>
                        <Input placeholder="123 Commerce St" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="Metro City" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State</FormLabel>
                      <FormControl>
                        <Input placeholder="TX" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="zip"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Zip Code</FormLabel>
                      <FormControl>
                        <Input placeholder="75001" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="propertyType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Property Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger><SelectValue /></SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Commercial">Commercial</SelectItem>
                          <SelectItem value="Industrial">Industrial</SelectItem>
                          <SelectItem value="Residential">Residential</SelectItem>
                          <SelectItem value="Office">Office</SelectItem>
                          <SelectItem value="Retail">Retail</SelectItem>
                          <SelectItem value="Warehouse">Warehouse</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="md:col-span-2 my-4 border-t pt-4">
                  <h3 className="text-lg font-medium">Roof Details</h3>
                </div>

                <FormField
                  control={form.control}
                  name="roofType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Roof Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger><SelectValue /></SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="TPO">TPO</SelectItem>
                          <SelectItem value="EPDM">EPDM</SelectItem>
                          <SelectItem value="Metal">Metal</SelectItem>
                          <SelectItem value="Mod Bit">Mod Bit</SelectItem>
                          <SelectItem value="Asphalt Shingle">Asphalt Shingle</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="approxSqft"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Approx. Sqft</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="150000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="stories"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Stories</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="25" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="yearBuilt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Year Built</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="1998" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="lastRoofInstallYear"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Install Year</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="2018" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="estimatedRemainingLife"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Est. Remaining Life (years)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="13" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="md:col-span-2 my-4 border-t pt-4">
                  <h3 className="text-lg font-medium">Maintenance & Health</h3>
                </div>

                <FormField
                  control={form.control}
                  name="knownLeaks"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel>Known Leaks?</FormLabel>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="maintenanceProgram"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Maintenance Program</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger><SelectValue /></SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Yes">Yes</SelectItem>
                          <SelectItem value="No">No</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="inspectionFrequency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Inspection Frequency</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger><SelectValue placeholder="Select frequency" /></SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Annually">Annually</SelectItem>
                          <SelectItem value="Semi-Annually">Semi-Annually</SelectItem>
                          <SelectItem value="Quarterly">Quarterly</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </ScrollArea>
            <DialogFooter className="pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSaving}>
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Save Changes'
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
