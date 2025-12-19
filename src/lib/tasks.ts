
import { isAfter, isBefore, isToday, parseISO, startOfDay, subDays } from 'date-fns';
import type { Lead, Contact, Account, FollowUpTask, PipelineAlert } from './types';
import { leads } from './data/leads';
import { contacts } from './data/contacts';
import { accounts } from './data/accounts';

export function getFollowUpTasks(): FollowUpTask[] {
  const potentialTasks: FollowUpTask[] = [];

  // 1. Add all tasks from leads
  for (const lead of leads) {
    if (lead.nextFollowUpAt && !['Won', 'Lost'].includes(lead.status)) {
      const account = accounts.find(a => a.id === lead.accountId);
      potentialTasks.push({
        id: `lead-${lead.id}`,
        dueDate: lead.nextFollowUpAt,
        type: 'Lead',
        title: `Follow-up on "${lead.opportunityName}"`,
        description: `${lead.followUpType || 'Follow-up'} with ${lead.opportunityName}.`,
        relatedEntity: lead,
        relatedAccount: account,
      });
    }
  }

  // 2. Add all tasks from contacts
  for (const contact of contacts) {
    if (contact.followUpDate) {
      const account = accounts.find(a => a.id === contact.accountId);
      potentialTasks.push({
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
  
  // 3. De-duplicate tasks using a Map, prioritizing lead-based tasks
  const taskMap = new Map<string, FollowUpTask>();

  for (const task of potentialTasks) {
    // A key can be the contact ID or the lead ID
    const entityId = task.relatedEntity.id;
    const contactId = task.type === 'Lead' ? (task.relatedEntity as Lead).contactId : entityId;

    // If it's a lead task, it always gets priority.
    if (task.type === 'Lead') {
      taskMap.set(contactId, task);
    } else {
      // If it's a contact task, only add it if a task for this contact doesn't already exist.
      if (!taskMap.has(contactId)) {
        taskMap.set(contactId, task);
      }
    }
  }

  const uniqueTasks = Array.from(taskMap.values());
  
  // 4. Sort the final list by due date
  uniqueTasks.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

  return uniqueTasks;
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
