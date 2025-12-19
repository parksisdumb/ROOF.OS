import { accounts as accountData } from './data/accounts';
import { contacts as contactData } from './data/contacts';
import { properties as propertyData } from './data/properties';
import { leads as leadData } from './data/leads';
import type { Account, Contact, Property, Lead } from './types';


export const accounts: Account[] = accountData;
export const contacts: Contact[] = contactData;
export const properties: Property[] = propertyData;
export const leads: Lead[] = leadData;


export const recentActivities = [
  { id: 'act_1', description: 'Logged a call with Sarah Johnson', time: '2 hours ago', leadId: 'lead_1' },
  { id: 'act_2', description: 'Generated AI tasks for Suburban Office Park', time: '5 hours ago', leadId: 'lead_2' },
  { id: 'act_3', description: 'Updated lead stage for Riverside Complex to "Won"', time: 'Yesterday', leadId: 'lead_5' },
  { id: 'act_4', description: 'Added new prospect "Logistics Warehouse"', time: '2 days ago', leadId: 'lead_4' },
];
