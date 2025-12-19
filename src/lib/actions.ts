'use server';

import {
  generateFollowUpTasks as generateFollowUpTasksFlow,
  type GenerateFollowUpTasksInput,
} from '@/ai/flows/generate-follow-up-tasks';
import type { Account } from './types';

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

export async function updateAccount(id: string, data: Partial<Omit<Account, 'id' | 'totalValue' | 'contactIds' | 'propertyIds'>>) {
  console.log(`Updating account ${id} with:`, data);
  // In a real app, you would update the database here.
  // We'll simulate a successful update.
  try {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Account updated successfully (simulated).');
    return { success: true, data: { id, ...data } };
  } catch (error) {
    console.error('Account Update Failed:', error);
    return { success: false, error: 'Failed to update account.' };
  }
}