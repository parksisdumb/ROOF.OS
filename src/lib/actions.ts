'use server';

import {
  generateFollowUpTasks as generateFollowUpTasksFlow,
  type GenerateFollowUpTasksInput,
} from '@/ai/flows/generate-follow-up-tasks';

export async function generateFollowUpTasks(input: GenerateFollowUpTasksInput) {
  console.log('Generating tasks for:', input.prospectName);
  try {
    const result = await generateFollowUpTasksFlow(input);
    // Add a small delay to simulate network latency
    await new Promise(resolve => setTimeout(resolve, 1500));
    return { success: true, data: result };
  } catch (error) {
    console.error('AI Task Generation Failed:', error);
    return { success: false, error: 'Failed to generate tasks.' };
  }
}