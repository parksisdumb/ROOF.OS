
import { isAfter, isBefore, isToday, parseISO, startOfDay, subDays } from 'date-fns';
import type { Lead, Contact, Account, FollowUpTask, PipelineAlert } from './types';
import { leads } from './data/leads';
import { contacts } from './data/contacts';
import { accounts } from './data/accounts';

export function getFollowUpTasks(): FollowUpTask[] {
  const tasksMap = new Map<string, FollowUpTask>();

  // Add tasks from leads first, giving them priority
  leads.forEach((lead) => {
    if (lead.nextFollowUpAt && !['Won', 'Lost'].includes(lead.status)) {
      const account = accounts.find(a => a.id === lead.accountId);
      const task: FollowUpTask = {
        id: `task-${lead.id}`, // Unique task ID based on lead
        dueDate: lead.nextFollowUpAt,
        type: 'Lead',
        title: `Follow-up on "${lead.opportunityName}"`,
        description: `${lead.followUpType} with ${lead.opportunityName}.`,
        relatedEntity: lead,
        relatedAccount: account,
      };
      // Use the contact ID for the map key to handle de-duplication
      if (lead.contactId) {
        tasksMap.set(lead.contactId, task);
      } else {
        tasksMap.set(lead.id, task); // Fallback to lead ID if no contact
      }
    }
  });

  // Then, add tasks from contacts, only if a task for that contact doesn't already exist
  contacts.forEach((contact) => {
    if (contact.followUpDate) {
        // If a task for this contact already exists from a lead, skip it.
        if (tasksMap.has(contact.id)) {
            return;
        }

        const account = accounts.find(a => a.id === contact.accountId);
        const task: FollowUpTask = {
            id: `task-${contact.id}`, // Unique task ID based on contact
            dueDate: contact.followUpDate,
            type: 'Contact',
            title: `Follow-up with ${contact.name}`,
            description: `${contact.followUpType} with ${contact.name}.`,
            relatedEntity: contact,
            relatedAccount: account,
        };
        tasksMap.set(contact.id, task);
    }
  });
  
  const finalTasks = Array.from(tasksMap.values());

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
