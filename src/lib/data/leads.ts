import type { Lead } from '../types';

export const leads: Lead[] = [
  { 
    id: 'lead_1', 
    opportunityName: 'Highrise Tower Roof Replacement', 
    accountId: 'acc_1', 
    propertyId: 'prop_1', 
    contactId: 'con_1',
    opportunityType: 'Replacement',
    estimatedValue: 120000, 
    probability: 75,
    expectedCloseDate: '2024-07-15',
    status: 'Proposal', 
    lastInteraction: '2024-05-10' 
  },
  { 
    id: 'lead_2', 
    opportunityName: 'Suburban Office Park Maintenance', 
    accountId: 'acc_2',
    propertyId: 'prop_2', 
    contactId: 'con_2',
    opportunityType: 'Maintenance',
    estimatedValue: 75000, 
    probability: 50,
    expectedCloseDate: '2024-08-01',
    status: 'Qualified', 
    lastInteraction: '2024-05-15'
  },
  { 
    id: 'lead_3', 
    opportunityName: 'Downtown Apartments Leak Repair', 
    accountId: 'acc_1',
    propertyId: 'prop_4', 
    contactId: 'con_4',
    opportunityType: 'Repair',
    estimatedValue: 25000, 
    status: 'Contacted', 
    lastInteraction: '2024-05-20'
  },
  { 
    id: 'lead_4', 
    opportunityName: 'Logistics Warehouse New Build', 
    accountId: 'acc_3', 
    propertyId: 'prop_3', 
    contactId: 'con_3',
    opportunityType: 'New Build',
    estimatedValue: 300000, 
    probability: 20,
    status: 'New', 
    lastInteraction: '2024-05-21'
  },
  { 
    id: 'lead_5', 
    opportunityName: 'Riverside Complex Coating', 
    accountId: 'acc_2', 
    propertyId: 'prop_2',
    contactId: 'con_2',
    opportunityType: 'Coating',
    estimatedValue: 95000, 
    status: 'Won', 
    lastInteraction: '2024-04-28'
  },
  { 
    id: 'lead_6', 
    opportunityName: 'Tech Hub Offices Repair', 
    accountId: 'acc_1', 
    propertyId: 'prop_1',
    contactId: 'con_1',
    opportunityType: 'Repair',
    estimatedValue: 45000, 
    status: 'Lost', 
    lastInteraction: '2024-03-12'
  },
];
