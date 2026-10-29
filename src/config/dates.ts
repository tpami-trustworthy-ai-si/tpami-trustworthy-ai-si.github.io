/** Calendar dates only; no cutoff time or time zone has been announced. */
export const submissionDeadline = '2027-03-01';

export function formatDate(iso: string): string {
  const [year, month, day] = iso.split('-').map(Number);
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC',
  }).format(new Date(Date.UTC(year!, month! - 1, day!)));
}

export interface Milestone {
  id: string;
  label: string;
  date?: string;
  display?: string;
  note?: string;
  highlight?: boolean;
  target?: boolean;
}

export const scheduleNotice =
  'Review and publication dates are target milestones. Authors should follow the dates provided in their individual editorial decision letters.';

export const importantDates: Milestone[] = [
  {
    id: 'submission',
    label: 'Manuscript submission deadline',
    date: submissionDeadline,
    note: 'Submit through the IEEE Submission Portal for TPAMI.',
    highlight: true,
  },
  { id: 'review1', label: 'First-round review notification', date: '2027-06-01', target: true },
  { id: 'revision', label: 'Revision submission deadline', date: '2027-08-01', target: true },
  { id: 'decision', label: 'Final decision notification', date: '2027-10-15', target: true },
  { id: 'publication', label: 'Publication', display: 'Q1–Q2 2028', target: true },
];
