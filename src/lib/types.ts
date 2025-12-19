
export type Account = {
  id: string;
  name: string;
  companyName?: string;
  officeAddress?: string;
  phone?: string;
  website?: string;
  stage?: 'Prospect' | 'Active' | 'Churned';
  industry: string;
  totalValue: number;
  contactIds: string[];
  propertyIds: string[];
  vendorManagementSoftware?: string;
  vendorOnboardingCompleted?: 'Yes' | 'No' | 'Not applicable';
  insuranceRequirements?: string;
  prospectingStage?: string;
  accountType?: 'Owner' | 'Property Manager' | 'General Contractor' | 'Developer';
  createdAt?: string; // ISO 8601 date string
  lastActivityDate?: string; // ISO 8601 date string
  decisionTree?: string; // For organizational influence mapping
};

export type Contact = {
  id: string;
  name:string;
  jobTitle: string;
  roleType: 'Decision Maker' | 'Influencer' | 'Gatekeeper' | 'Unknown';
  email: string;
  phone: string;
  accountId: string;
  avatarUrl: string;
  notes?: string;
  leadSource?: 'LinkedIn' | 'Cold Call' | 'Referral' | 'Website' | 'Other';
  relationshipStatus?: 'Cold' | 'Warming' | 'Active' | 'Stalled';
  preferredContactMethod?: 'Email' | 'Phone' | 'Text';
  bestTimeToReach?: string;
  linkedinUrl?: string;
  createdAt: string; // ISO 8601 date string
  lastActivityDate?: string; // ISO 8601 date string
  lastActivityType?: 'Email' | 'Call' | 'Meeting' | 'Note';
  followUpDate?: string; // ISO 8601 date string
  followUpType?: 'Email' | 'Call' | 'Meeting';
};

export type ContactWithAccount = Contact & {
    accountName: string;
};

export type Property = {
  id: string;
  address: string;
  type: 'Commercial' | 'Residential' | 'Industrial';
  roofType: string;
  accountId: string;
};

export type Lead = {
  id:string;
  prospectName: string;
  company: string;
  value: number;
  stage: 'New' | 'Contacted' | 'Qualified' | 'Proposal' | 'Won' | 'Lost';
  contactId: string;
  propertyId: string;
  lastInteraction: string;
};

export type Interaction = {
  id: string;
  type: 'Email' | 'Call' | 'Meeting' | 'Note';
  date: string;
  notes: string;
  leadId: string;
};

export type NavItem = {
  href: string;
  title: string;
  icon: React.ElementType;
  label?: string;
}
