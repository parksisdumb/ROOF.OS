
export { accounts } from './data/accounts';
export { contacts } from './data/contacts';
export { properties } from './data/properties';
export { leads } from './data/leads';
import type { Lead } from './types';


export const recentActivities = [
  { id: 'act_1', description: 'Logged a call with Sarah Johnson', time: '2 hours ago', leadId: 'lead_1' },
  { id: 'act_2', description: 'Generated AI tasks for Suburban Office Park', time: '5 hours ago', leadId: 'lead_2' },
  { id: 'act_3', description: 'Updated lead stage for Riverside Complex to "Won"', time: 'Yesterday', leadId: 'lead_5' },
  { id: 'act_4', description: 'Added new prospect "Logistics Warehouse"', time: '2 days ago', leadId: 'lead_4' },
];
