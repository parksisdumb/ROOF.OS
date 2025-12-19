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
};

export type Contact = {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  accountId: string;
  avatarUrl: string;
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
