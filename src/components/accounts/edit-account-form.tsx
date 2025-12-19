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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import type { Account } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { updateAccount } from '@/lib/actions';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Account name must be at least 2 characters.',
  }),
  industry: z.string().min(2, {
    message: 'Industry must be at least 2 characters.',
  }),
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
      industry: account.industry,
    },
  });
  
  React.useEffect(() => {
    if (isOpen) {
      form.reset({
        name: account.name,
        industry: account.industry,
      });
    }
  }, [isOpen, account, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSaving(true);
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
      <DialogContent className="sm:max-w-md">
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
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
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
            <DialogFooter>
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
