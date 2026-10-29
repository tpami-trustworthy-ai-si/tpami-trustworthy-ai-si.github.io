import { importantDates, formatDate, type Milestone } from '../config/dates';

export function formatMilestone(milestone: Milestone): string {
  return milestone.display ?? (milestone.date ? formatDate(milestone.date) : '');
}

export function getMilestone(id: string): Milestone | undefined {
  return importantDates.find((milestone) => milestone.id === id);
}
