'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Pencil, Loader2 } from 'lucide-react';

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
import type { Account } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { updateAccount } from '@/lib/actions';
import { ScrollArea } from '../ui/scroll-area';
import { Textarea } from '../ui/textarea';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Account name must be at least 2 characters.',
  }),
  companyName: z.string().optional(),
  industry: z.string().min(2, {
    message: 'Industry must be at least 2 characters.',
  }),
  officeAddress: z.string().optional(),
  phone: z.string().optional(),
  website: z.string().optional(),
  stage: z.enum(['Prospect', 'Active', 'Churned']).optional(),
  vendorManagementSoftware: z.string().optional(),
  vendorOnboardingCompleted: z.enum(['Yes', 'No', 'Not applicable']).optional(),
  insuranceRequirements: z.string().optional(),
  prospectingStage: z.string().optional(),
});

type EditAccountFormProps = {
  account: Account;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

export function EditAccountForm({
  account,
  isOpen,
  onOpenChange,
}: EditAccountFormProps) {
  const [isSaving, setIsSaving] = React.useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: account.name,
      companyName: account.companyName || '',
      industry: account.industry,
      officeAddress: account.officeAddress || '',
      phone: account.phone || '',
      website: account.website || '',
      stage: account.stage,
      vendorManagementSoftware: account.vendorManagementSoftware || '',
      vendorOnboardingCompleted: account.vendorOnboardingCompleted,
      insuranceRequirements: account.insuranceRequirements || '',
      prospectingStage: account.prospectingStage || '',
    },
  });
  
  React.useEffect(() => {
    if (isOpen) {
      form.reset({
        name: account.name,
        companyName: account.companyName || '',
        industry: account.industry,
        officeAddress: account.officeAddress || '',
        phone: account.phone || '',
        website: account.website || '',
        stage: account.stage,
        vendorManagementSoftware: account.vendorManagementSoftware || '',
        vendorOnboardingCompleted: account.vendorOnboardingCompleted,
        insuranceRequirements: account.insuranceRequirements || '',
        prospectingStage: account.prospectingStage || '',
      });
    }
  }, [isOpen, account, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSaving(true);
    // This is a partial update, so we only send the fields that are in the form schema.
    const result = await updateAccount(account.id, values);
    setIsSaving(false);

    if (result.success) {
      toast({
        title: 'Account Updated',
        description: `"${values.name}" has been updated successfully.`,
      });
      onOpenChange(false);
       // NOTE: In a real app, you'd trigger a data re-fetch here.
       // For this demo, we'll need to refresh the page to see changes.
      window.location.reload();
    } else {
      toast({
        title: 'Error Updating Account',
        description: result.error || 'An unknown error occurred.',
        variant: 'destructive',
      });
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Pencil className="h-6 w-6 text-primary" />
            Edit Account
          </DialogTitle>
          <DialogDescription>
            Update the details for "{account.name}".
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <ScrollArea className="h-[60vh] pr-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Account Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Starlight Properties" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Company Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Starlight Properties, Inc." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="industry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Industry</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Commercial Real Estate" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="stage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Stage</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a stage" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Prospect">Prospect</SelectItem>
                          <SelectItem value="Active">Active</SelectItem>
                          <SelectItem value="Churned">Churned</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="officeAddress"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Office Address</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 123 Main St, Anytown USA" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 555-123-4567" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Website</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="md:col-span-2 my-4 border-t pt-4">
                  <h3 className="text-lg font-medium">Commercial Details</h3>
                </div>
                <FormField
                  control={form.control}
                  name="prospectingStage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Prospecting Stage</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Relationship Building" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="vendorOnboardingCompleted"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Vendor Onboarding</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Yes">Yes</SelectItem>
                          <SelectItem value="No">No</SelectItem>
                          <SelectItem value="Not applicable">Not applicable</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="vendorManagementSoftware"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Vendor Management Software</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., RealPage, Yardi, etc." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="insuranceRequirements"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Insurance Requirements</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Describe insurance requirements..." {...field} />
                      </FormControl>
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
