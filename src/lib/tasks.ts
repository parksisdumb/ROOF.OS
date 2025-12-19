
import { isAfter, isBefore, isToday, parseISO, startOfDay, subDays } from 'date-fns';
import type { Lead, Contact, Account, FollowUpTask, PipelineAlert } from './types';
import { leads } from './data/leads';
import { contacts } from './data/contacts';
import { accounts } from './data/accounts';

export function getFollowUpTasks(): FollowUpTask[] {
  const tasks: FollowUpTask[] = [];
  const processedContactIds = new Set<string>();

  // 1. Process leads first and create tasks.
  // Keep track of contacts that are part of a lead's follow-up.
  for (const lead of leads) {
    if (lead.nextFollowUpAt && !['Won', 'Lost'].includes(lead.status)) {
      const account = accounts.find(a => a.id === lead.accountId);
      tasks.push({
        id: `lead-${lead.id}`,
        dueDate: lead.nextFollowUpAt,
        type: 'Lead',
        title: `Follow-up on "${lead.opportunityName}"`,
        description: `${lead.followUpType || 'Follow-up'} with ${lead.opportunityName}.`,
        relatedEntity: lead,
        relatedAccount: account,
      });
      // Mark this contact as processed so we don't create a duplicate task.
      if (lead.contactId) {
        processedContactIds.add(lead.contactId);
      }
    }
  }

  // 2. Add tasks from contacts ONLY if they haven't been processed via a lead.
  // This is the crucial de-duplication step.
  for (const contact of contacts) {
    if (contact.followUpDate && !processedContactIds.has(contact.id)) {
      const account = accounts.find(a => a.id === contact.accountId);
      tasks.push({
        id: `contact-${contact.id}`,
        dueDate: contact.followUpDate,
        type: 'Contact',
        title: `Follow-up with ${contact.name}`,
        description: `${contact.followUpType || 'Follow-up'} with ${contact.name}.`,
        relatedEntity: contact,
        relatedAccount: account,
      });
    }
  }

  // 3. Sort the final, de-duplicated list by due date.
  tasks.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

  return tasks;
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
