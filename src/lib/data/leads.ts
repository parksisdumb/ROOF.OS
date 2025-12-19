import type { Lead } from '../types';

export const leads: Lead[] = [
  { id: 'lead_1', prospectName: 'Highrise Tower', company: 'Starlight Properties', value: 120000, stage: 'Proposal', contactId: 'con_1', propertyId: 'prop_1', lastInteraction: '2024-05-10' },
  { id: 'lead_2', prospectName: 'Suburban Office Park', company: 'Greenwood Management', value: 75000, stage: 'Qualified', contactId: 'con_2', propertyId: 'prop_2', lastInteraction: '2024-05-15' },
  { id: 'lead_3', prospectName: 'Downtown Apartments', company: 'Starlight Properties', value: 250000, stage: 'Contacted', contactId: 'con_4', propertyId: 'prop_1', lastInteraction: '2024-05-20' },
  { id: 'lead_4', prospectName: 'Logistics Warehouse', company: 'Ironclad Industrial', value: 300000, stage: 'New', contactId: 'con_3', propertyId: 'prop_3', lastInteraction: '2024-05-21' },
  { id: 'lead_5', prospectName: 'Riverside Complex', company: 'Greenwood Management', value: 95000, stage: 'Won', contactId: 'con_2', propertyId: 'prop_2', lastInteraction: '2024-04-28' },
  { id: 'lead_6', prospectName: 'Tech Hub Offices', company: 'Starlight Properties', value: 45000, stage: 'Lost', contactId: 'con_1', propertyId: 'prop_1', lastInteraction: '2024-03-12' },
];
