



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
  decisionTree?: string; // For organizational contact decision making influence
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
  propertyName: string;
  accountId: string;
  streetAddress: string;
  city: string;
  state: string;
  zip: string;
  propertyType: 'Warehouse' | 'Retail' | 'Office' | 'Industrial' | 'Commercial' | 'Residential';
  roofType: 'TPO' | 'EPDM' | 'Metal' | 'Mod Bit' | 'Asphalt Shingle';
  approxSqft: number;
  stories: number;
  yearBuilt: number;
  assignedRepId?: string;
  lastRoofInstallYear?: number;
  estimatedRemainingLife?: number;
  knownLeaks: boolean;
  maintenanceProgram: 'Yes' | 'No';
  inspectionFrequency?: 'Annually' | 'Semi-Annually' | 'Quarterly';
};


export type Lead = {
  id:string;
  opportunityName: string;
  accountId: string;
  propertyId: string;
  contactId: string;
  opportunityType: 'Repair' | 'Maintenance' | 'Replacement' | 'Coating' | 'New Build';
  estimatedValue: number;
  probability?: number;
  expectedCloseDate?: string; // ISO 8601 date string
  status: 'Active' | 'Delayed' | 'Won' | 'Lost' | 'New' | 'Contacted' | 'Qualified' | 'Proposal';
  lastInteraction: string; // ISO 8601 date string
  // New Fields
  nextFollowUpAt?: string; // ISO 8601 date string
  followUpType?: 'Email' | 'Call' | 'Meeting';
  delayReason?: 'Budget' | 'Timing' | 'Decision-maker unavailable' | 'Tenant issue';
  riskScore?: number; // e.g., 1-100
  competitorsInvolved?: boolean;
  scopeSummary?: string;
  insuranceInvolved?: boolean;
  emergencyRepair?: boolean;
  warrantyRequired?: boolean;
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

export type FollowUpTask = {
    id: string;
    dueDate: string;
    type: 'Contact' | 'Lead';
    title: string;
    description: string;
    relatedEntity: Contact | Lead;
    relatedAccount?: Account;
};

export type PipelineAlert = {
    id: string;
    type: 'Untouched Opportunity' | 'Missing Follow-up' | 'High Risk' | 'Competitor';
    message: string;
    relatedLeadId: string;
}
