import type { Account, Contact, Property, Lead } from './types';

export const accounts: Account[] = [
  { id: 'acc_1', name: 'Starlight Properties', industry: 'Commercial Real Estate', totalValue: 750000, contactIds: ['con_1'], propertyIds: ['prop_1'] },
  { id: 'acc_2', name: 'Greenwood Management', industry: 'Residential', totalValue: 450000, contactIds: ['con_2'], propertyIds: ['prop_2'] },
  { id: 'acc_3', name: 'Ironclad Industrial', industry: 'Industrial', totalValue: 1200000, contactIds: ['con_3'], propertyIds: ['prop_3'] },
];

export const contacts: Contact[] = [
  { id: 'con_1', name: 'Sarah Johnson', role: 'Property Manager', email: 'sarah.j@starlight.com', phone: '555-0101', accountId: 'acc_1', avatarUrl: 'https://picsum.photos/seed/10/100/100' },
  { id: 'con_2', name: 'Mike Williams', role: 'Facilities Manager', email: 'mike.w@greenwood.com', phone: '555-0102', accountId: 'acc_2', avatarUrl: 'https://picsum.photos/seed/11/100/100' },
  { id: 'con_3', name: 'Chen Liu', role: 'Building Owner', email: 'chen.l@ironclad.com', phone: '555-0103', accountId: 'acc_3', avatarUrl: 'https://picsum.photos/seed/12/100/100' },
  { id: 'con_4', name: 'Jessica Davis', role: 'Asset Manager', email: 'jess.d@starlight.com', phone: '555-0104', accountId: 'acc_1', avatarUrl: 'https://picsum.photos/seed/13/100/100' },
];

export const properties: Property[] = [
  { id: 'prop_1', address: '123 Commerce St, Metro City', type: 'Commercial', roofType: 'TPO', accountId: 'acc_1' },
  { id: 'prop_2', address: '456 Residence Ave, Maple Town', type: 'Residential', roofType: 'Asphalt Shingle', accountId: 'acc_2' },
  { id: 'prop_3', address: '789 Factory Rd, Steel Valley', type: 'Industrial', roofType: 'Metal', accountId: 'acc_3' },
];

export const leads: Lead[] = [
  { id: 'lead_1', prospectName: 'Highrise Tower', company: 'Starlight Properties', value: 120000, stage: 'Proposal', contactId: 'con_1', propertyId: 'prop_1', lastInteraction: '2024-05-10' },
  { id: 'lead_2', prospectName: 'Suburban Office Park', company: 'Greenwood Management', value: 75000, stage: 'Qualified', contactId: 'con_2', propertyId: 'prop_2', lastInteraction: '2024-05-15' },
  { id: 'lead_3', prospectName: 'Downtown Apartments', company: 'Starlight Properties', value: 250000, stage: 'Contacted', contactId: 'con_4', propertyId: 'prop_1', lastInteraction: '2024-05-20' },
  { id: 'lead_4', prospectName: 'Logistics Warehouse', company: 'Ironclad Industrial', value: 300000, stage: 'New', contactId: 'con_3', propertyId: 'prop_3', lastInteraction: '2024-05-21' },
  { id: 'lead_5', prospectName: 'Riverside Complex', company: 'Greenwood Management', value: 95000, stage: 'Won', contactId: 'con_2', propertyId: 'prop_2', lastInteraction: '2024-04-28' },
  { id: 'lead_6', prospectName: 'Tech Hub Offices', company: 'Starlight Properties', value: 45000, stage: 'Lost', contactId: 'con_1', propertyId: 'prop_1', lastInteraction: '2024-03-12' },
];

export const recentActivities = [
  { id: 'act_1', description: 'Logged a call with Sarah Johnson', time: '2 hours ago', leadId: 'lead_1' },
  { id: 'act_2', description: 'Generated AI tasks for Suburban Office Park', time: '5 hours ago', leadId: 'lead_2' },
  { id: 'act_3', description: 'Updated lead stage for Riverside Complex to "Won"', time: 'Yesterday', leadId: 'lead_5' },
  { id: 'act_4', description: 'Added new prospect "Logistics Warehouse"', time: '2 days ago', leadId: 'lead_4' },
];
