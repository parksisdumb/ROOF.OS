'use server';
/**
 * @fileOverview AI flow to generate a series of follow-up tasks for a prospect.
 *
 * - generateFollowUpTasks - A function that generates follow-up tasks for a prospect.
 * - GenerateFollowUpTasksInput - The input type for the generateFollowUpTasks function.
 * - GenerateFollowUpTasksOutput - The return type for the generateFollowUpTasks function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateFollowUpTasksInputSchema = z.object({
  interactionNotes: z
    .string()
    .describe(
      'Notes from the initial interaction with the prospect, including key discussion points and agreed next steps.'
    ),
  prospectType: z
    .string()
    .describe(
      'The type of prospect (e.g., property manager, facilities manager, building owner).'
    ),
  prospectName: z.string().describe('The name of the prospect.'),
  productOffered: z.string().describe('The product or service offered to the prospect.'),
});
export type GenerateFollowUpTasksInput = z.infer<typeof GenerateFollowUpTasksInputSchema>;

const GenerateFollowUpTasksOutputSchema = z.object({
  tasks: z
    .array(z.string())
    .describe('A list of suggested follow-up tasks to nurture the prospect.'),
});
export type GenerateFollowUpTasksOutput = z.infer<typeof GenerateFollowUpTasksOutputSchema>;

export async function generateFollowUpTasks(
  input: GenerateFollowUpTasksInput
): Promise<GenerateFollowUpTasksOutput> {
  return generateFollowUpTasksFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateFollowUpTasksPrompt',
  input: {schema: GenerateFollowUpTasksInputSchema},
  output: {schema: GenerateFollowUpTasksOutputSchema},
  prompt: `You are an AI assistant helping salespeople generate follow-up tasks for prospects.

  Based on the initial interaction notes, prospect type, prospect name and the product offered, create a series of actionable follow-up tasks to nurture the prospect and move them further down the sales funnel.

  Interaction Notes: {{{interactionNotes}}}
  Prospect Type: {{{prospectType}}}
  Prospect Name: {{{prospectName}}}
  Product Offered: {{{productOffered}}}

  Provide a list of tasks that are specific, measurable, achievable, relevant, and time-bound (SMART).  Each task should be concise, and directly actionable by the salesperson.
  Tasks:
  `,config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_ONLY_HIGH',
      },
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_NONE',
      },
      {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_LOW_AND_ABOVE',
      },
    ],
  },
});

const generateFollowUpTasksFlow = ai.defineFlow(
  {
    name: 'generateFollowUpTasksFlow',
    inputSchema: GenerateFollowUpTasksInputSchema,
    outputSchema: GenerateFollowUpTasksOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
