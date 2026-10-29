import { submissionDeadline, formatDate } from './dates';

/** Shared identity, submission links and public contact settings. */
export type SubmissionStatus = 'upcoming' | 'open' | 'closed';

const title = 'Trustworthy AI in Pattern Recognition and Computer Vision';
const subtitle = 'Attacks, Robustness, Safety, and Beyond';
const fullTitle = `${title}: ${subtitle}`;

export const site = {
  journal: 'IEEE Transactions on Pattern Analysis and Machine Intelligence',
  journalShort: 'IEEE TPAMI',
  title,
  subtitle,
  fullTitle,
  shortTitle: 'TPAMI SI · Trustworthy AI',
  tagline:
    'A TPAMI special issue on the safety, security, robustness, privacy and reliability of modern visual intelligence — from foundation models and multimodal LLMs to generative and embodied AI.',
  description: `IEEE TPAMI Special Issue on ${fullTitle}. Submissions are open. Submission deadline: ${formatDate(submissionDeadline)}.`,

  // Change explicitly when submissions close; the deadline has no confirmed time zone.
  submissionStatus: 'open' as SubmissionStatus,
  rollingNotice: 'Submissions are handled on a rolling basis.',
  banner: {
    text: 'Submissions are now open for this IEEE TPAMI Special Issue.',
    linkLabel: '',
    linkUrl: '',
  },
  url: 'https://tpami-trustworthy-ai-si.github.io/',
  links: {
    submission: 'https://ieee.submission.researchexchange.com/submission/dashboard?siteName=tpami-cs',
    authorGuidelines: 'https://www.computer.org/csdl/journal/tp/write-for-us/15083',
    journalHome: 'https://www.computer.org/csdl/journal/tp',
  },
  articleType: `SI: ${fullTitle}`,
  extendedPaperNewContent: '30%',

  // Team mailbox confirmed by the editors. An empty value hides email actions.
  contactEmail: 'tpami.trustworthyai@gmail.com',
  contactName: 'Guest Editorial Team',
  // Path relative to public/. Only an existing file is offered for download.
  cfpPdf: '',
  shareText: `Call for Papers — IEEE TPAMI Special Issue on “${fullTitle}”. Submissions are open and handled on a rolling basis. Submission deadline: ${formatDate(submissionDeadline)}.`,
  ogImage: 'og.png',
  lastUpdated: '2026-10-29',
  footerNote:
    'This website is maintained by the Guest Editorial Team for the IEEE TPAMI Special Issue. For manuscript preparation and submission requirements, please refer to the TPAMI author guidelines and the IEEE Submission Portal.',
} as const;
