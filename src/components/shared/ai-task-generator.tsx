
'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Wand2, Loader2, CheckCircle, AlertCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
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
import { Textarea } from '@/components/ui/textarea';
import type { Lead, Contact, Account } from '@/lib/types';
import { generateFollowUpTasks } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';
import { contacts } from '@/lib/data';

const formSchema = z.object({
  interactionNotes: z.string().min(10, {
    message: 'Interaction notes must be at least 10 characters.',
  }),
});

type AITaskGeneratorProps = {
  lead: Lead;
  account?: Account;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function AITaskGenerator({ lead, account, open, onOpenChange }: AITaskGeneratorProps) {
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [generatedTasks, setGeneratedTasks] = React.useState<string[] | null>(null);
  const { toast } = useToast();

  const prospectContact = contacts.find(c => c.id === lead.contactId);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      interactionNotes: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsGenerating(true);
    setGeneratedTasks(null);
    const result = await generateFollowUpTasks({
      interactionNotes: values.interactionNotes,
      prospectName: prospectContact?.name || lead.opportunityName,
      prospectType: account?.accountType || 'Prospect',
      productOffered: "Roofing Services",
    });
    setIsGenerating(false);

    if (result.success && result.data) {
      setGeneratedTasks(result.data.tasks);
      toast({
        title: 'Tasks Generated',
        description: `${result.data.tasks.length} follow-up tasks have been created.`,
        variant: 'default',
      });
    } else {
      toast({
        title: 'Error Generating Tasks',
        description: result.error || 'An unknown error occurred.',
        variant: 'destructive',
      });
    }
  }

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
        form.reset();
        setGeneratedTasks(null);
    }
    onOpenChange(isOpen);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Wand2 className="h-6 w-6 text-primary" />
            AI Task Generator
          </DialogTitle>
          <DialogDescription>
            Generate follow-up tasks for "{lead.opportunityName}" based on your latest interaction.
          </DialogDescription>
        </DialogHeader>
        {generatedTasks ? (
            <div className="space-y-4 py-4">
                <h3 className="font-medium flex items-center gap-2"><CheckCircle className="h-5 w-5 text-green-500" />Generated Tasks:</h3>
                <ul className="space-y-2 list-disc list-inside bg-secondary/50 p-4 rounded-md">
                    {generatedTasks.map((task, index) => (
                        <li key={index} className="text-sm">{task}</li>
                    ))}
                </ul>
                <Button onClick={() => setGeneratedTasks(null)} variant="outline" className="w-full">Generate New Tasks</Button>
            </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="interactionNotes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Interaction Notes</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., Discussed pricing for the TPO roof replacement. They are interested but need to see a detailed proposal by Friday. Mentioned a competitor, 'RooferX'."
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Provide details about your conversation or meeting.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isGenerating} className="w-full">
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Wand2 className="mr-2 h-4 w-4" />
                    Generate Tasks
                  </>
                )}
              </Button>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
