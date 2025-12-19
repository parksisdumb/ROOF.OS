
import { isAfter, isBefore, isToday, parseISO, startOfDay, subDays } from 'date-fns';
import type { Lead, Contact, Account, FollowUpTask, PipelineAlert } from './types';
import { leads } from './data/leads';
import { contacts } from './data/contacts';
import { accounts } from './data/accounts';

export function getFollowUpTasks(): FollowUpTask[] {
  const allPotentialTasks: FollowUpTask[] = [];

  // First, add all tasks from leads
  leads.forEach((lead) => {
    if (lead.nextFollowUpAt && !['Won', 'Lost'].includes(lead.status)) {
      const account = accounts.find(a => a.id === lead.accountId);
      allPotentialTasks.push({
        id: `lead-${lead.id}`,
        dueDate: lead.nextFollowUpAt,
        type: 'Lead',
        title: `Follow-up on "${lead.opportunityName}"`,
        description: `${lead.followUpType} with ${lead.opportunityName}.`,
        relatedEntity: lead,
        relatedAccount: account,
      });
    }
  });

  // Then, add all tasks from contacts
  contacts.forEach((contact) => {
    if (contact.followUpDate) {
        const account = accounts.find(a => a.id === contact.accountId);
        allPotentialTasks.push({
            id: `contact-${contact.id}`,
            dueDate: contact.followUpDate,
            type: 'Contact',
            title: `Follow-up with ${contact.name}`,
            description: `${contact.followUpType} with ${contact.name}.`,
            relatedEntity: contact,
            relatedAccount: account,
        });
    }
  });

  // De-duplication logic
  const finalTasks: FollowUpTask[] = [];
  const processedContactIds = new Set<string>();

  // Prioritize lead tasks. If a lead task exists, we process it and mark its contact as handled.
  allPotentialTasks
    .filter(task => task.type === 'Lead')
    .forEach(task => {
        finalTasks.push(task);
        const lead = task.relatedEntity as Lead;
        if (lead.contactId) {
            processedContactIds.add(lead.contactId);
        }
    });

  // Only add contact tasks if that contact hasn't already been handled by a lead task.
  allPotentialTasks
    .filter(task => task.type === 'Contact')
    .forEach(task => {
        const contact = task.relatedEntity as Contact;
        if (!processedContactIds.has(contact.id)) {
            finalTasks.push(task);
        }
    });

  // Sort the final, de-duplicated list by due date
  finalTasks.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

  return finalTasks;
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
