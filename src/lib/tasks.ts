import { isAfter, isBefore, isToday, parseISO, startOfDay } from 'date-fns';
import type { Lead, Contact, Account, FollowUpTask } from './types';
import { leads } from './data/leads';
import { contacts } from './data/contacts';
import { accounts } from './data/accounts';

export function getFollowUpTasks(): FollowUpTask[] {
  const allTasks: FollowUpTask[] = [];

  // Process leads
  leads.forEach((lead) => {
    if (lead.nextFollowUpAt && !['Won', 'Lost'].includes(lead.status)) {
      const account = accounts.find(a => a.id === lead.accountId);
      allTasks.push({
        id: `lead-${lead.id}`,
        dueDate: lead.nextFollowUpAt,
        type: 'Lead',
        title: `Follow-up on "${lead.opportunityName}"`,
        description: `${lead.followUpType} with ${account?.name || 'the client'}.`,
        relatedEntity: lead,
        relatedAccount: account,
      });
    }
  });

  // Process contacts
  contacts.forEach((contact) => {
    if (contact.followUpDate) {
        const account = accounts.find(a => a.id === contact.accountId);
      allTasks.push({
        id: `contact-${contact.id}`,
        dueDate: contact.followUpDate,
        type: 'Contact',
        title: `Follow-up with ${contact.name}`,
        description: `${contact.followUpType} with ${contact.name} at ${account?.name || 'their company'}.`,
        relatedEntity: contact,
        relatedAccount: account,
      });
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
  };
}
