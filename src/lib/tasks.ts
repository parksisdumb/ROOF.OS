
import { isAfter, isBefore, isToday, parseISO, startOfDay, subDays } from 'date-fns';
import type { Lead, Contact, Account, FollowUpTask, PipelineAlert } from './types';
import { leads } from './data/leads';
import { contacts } from './data/contacts';
import { accounts } from './data/accounts';

export function getFollowUpTasks(): FollowUpTask[] {
  const allTasks: FollowUpTask[] = [];
  const processedEntities = new Set<string>(); // Tracks contacts and leads processed: `contact-{id}` or `lead-{id}`

  // Process leads first, as they are higher-priority opportunities
  leads.forEach((lead) => {
    if (lead.nextFollowUpAt && !['Won', 'Lost'].includes(lead.status)) {
      const account = accounts.find(a => a.id === lead.accountId);
      
      allTasks.push({
        id: `lead-${lead.id}`, // Unique ID for lead tasks
        dueDate: lead.nextFollowUpAt,
        type: 'Lead',
        title: `Follow-up on "${lead.opportunityName}"`,
        description: `${lead.followUpType} with ${account?.name || 'the client'}.`,
        relatedEntity: lead,
        relatedAccount: account,
      });
      
      // Mark this lead and its associated contact as processed so we don't create a second task for the contact.
      processedEntities.add(`lead-${lead.id}`);
      if (lead.contactId) {
        processedEntities.add(`contact-${lead.contactId}`);
      }
    }
  });

  // Process contacts that don't already have a task via an associated lead
  contacts.forEach((contact) => {
    const contactKey = `contact-${contact.id}`;
    // Only create a task if the contact has a follow-up and has NOT been processed as part of a lead
    if (contact.followUpDate && !processedEntities.has(contactKey)) {
        const account = accounts.find(a => a.id === contact.accountId);
        allTasks.push({
            id: contactKey, // Unique ID for contact tasks
            dueDate: contact.followUpDate,
            type: 'Contact',
            title: `Follow-up with ${contact.name}`,
            description: `${contact.followUpType} with ${contact.name} at ${account?.name || 'their company'}.`,
            relatedEntity: contact,
            relatedAccount: account,
        });
        processedEntities.add(contactKey);
    }
  });

  // Sort tasks by due date, most recent first
  allTasks.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

  return allTasks;
}

export function getCategorizedTasks() {
  const tasks = getFollowUpTasks();
  const today = startOfDay(new Date());

  const overdue = tasks.filter(task => isBefore(parseISO(task.dueDate), today));
  const dueToday = tasks.filter(task => isToday(parseISO(task.dueDate)));
  const upcoming = tasks.filter(task => isAfter(parseISO(task.dueDate), today));

  const highestPriority = overdue[0] || dueToday[0] || upcoming[0] || null;

  return {
    overdue,
    dueToday,
    upcoming,
    highestPriority,
    all: tasks
  };
}


export function getPipelineAlerts(): PipelineAlert[] {
    const alerts: PipelineAlert[] = [];
    const today = new Date();
    const fourteenDaysAgo = subDays(today, 14);

    leads.forEach(lead => {
        if (!['Won', 'Lost'].includes(lead.status)) {
            // Alert 1: Untouched for 14+ days
            if (isBefore(parseISO(lead.lastInteraction), fourteenDaysAgo)) {
                alerts.push({
                    id: `untouched-${lead.id}`,
                    type: 'Untouched Opportunity',
                    message: `"${lead.opportunityName}" has not been updated in over 14 days.`,
                    relatedLeadId: lead.id
                });
            }

            // Alert 2: Proposal sent without a next follow-up
            if (lead.status === 'Proposal' && !lead.nextFollowUpAt) {
                 alerts.push({
                    id: `nofollowup-${lead.id}`,
                    type: 'Missing Follow-up',
                    message: `Proposal sent for "${lead.opportunityName}" but no follow-up is scheduled.`,
                    relatedLeadId: lead.id
                });
            }

            // Alert 3: High risk score or competitor involved
            if (lead.riskScore && lead.riskScore > 66) {
                 alerts.push({
                    id: `highrisk-${lead.id}`,
                    type: 'High Risk',
                    message: `"${lead.opportunityName}" has a high risk score.`,
                    relatedLeadId: lead.id
                });
            } else if (lead.competitorsInvolved) {
                 alerts.push({
                    id: `competitor-${lead.id}`,
                    type: 'Competitor',
                    message: `A competitor is involved in "${lead.opportunityName}".`,
                    relatedLeadId: lead.id
                });
            }
        }
    });

    return alerts;
}
