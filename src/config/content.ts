import { site } from './site';

export const navItems = [
  { id: 'scope', label: 'Aims & Scope' },
  { id: 'topics', label: 'Topics' },
  { id: 'dates', label: 'Dates' },
  { id: 'submission', label: 'Submission' },
  { id: 'editors', label: 'Guest Editors' },
  { id: 'contact', label: 'Contact' },
];

export const aimsAndScope = {
  eyebrow: 'The special issue',
  title: 'Aims & Scope',
  paragraphs: [
    'AI systems are now being deployed in safety-critical settings such as autonomous driving, medical diagnostics, biometric identification, content moderation, and AI-powered agents. Accuracy alone is no longer sufficient in these contexts. Systems must also be demonstrably trustworthy: robust to adversarial manipulation, protective of private data, fair across demographic groups, and safe under distribution shifts and unexpected inputs.',
    'This special issue solicits original research, extended conference papers, and survey articles on the theory, methodology, and practice of trustworthy AI within pattern recognition and computer vision. Of particular interest is work that connects theoretical guarantees with practical deployment, that addresses the security challenges raised by large language and multimodal models, or that establishes rigorous evaluation frameworks for trustworthy AI systems.',
  ],
  lifecycle: 'We take a full-lifecycle view of visual AI safety, from data collection and training to evaluation, deployment, and interaction with users and environments.',
};

export const submission = {
  eyebrow: 'For authors',
  title: 'Submission Instructions',
  intro: 'Manuscripts should be submitted through the IEEE Submission Portal for TPAMI. All submissions must follow the TPAMI author guidelines and the journal’s standard review process.',
  steps: [
    {
      title: 'Prepare your manuscript',
      body: 'Prepare your manuscript and supplementary materials according to the TPAMI author guidelines. Original research articles, extended conference papers, and high-quality survey articles within the scope of the special issue are welcome.',
    },
    {
      title: 'Open the IEEE Submission Portal',
      body: 'Open the IEEE Submission Portal for TPAMI and follow the on-screen instructions to prepare your submission.',
    },
    {
      title: 'Select the special issue under Article Type',
      body: 'In the Article Type field, select the following special issue:',
      showArticleType: true,
    },
  ],
  paperTypes: [
    {
      title: 'Extended conference papers',
      body: `Extended conference papers are welcome provided that the submission contains at least ${site.extendedPaperNewContent} new content beyond the published conference version and explicitly references the prior version. Authors should also follow TPAMI’s guidance on substantial revisions of prior conference papers.`,
    },
    {
      title: 'Peer-review preference',
      body: 'The submission system offers single-anonymized and double-anonymized peer-review options. Please follow the on-screen instructions and prepare identifying information according to your selected option. The system states that this selection cannot be changed after submission.',
    },
  ],
  notes: ['All submissions follow TPAMI’s standard editorial and peer-review procedures.'],
};

export const editorsSection = {
  eyebrow: 'Editorial team',
  title: 'Guest Editors',
  intro: 'The guest editorial team brings together expertise in computer vision, pattern recognition, adversarial machine learning, and AI safety and security.',
};

export const contact = {
  eyebrow: 'Contact',
  title: 'Contact the Guest Editorial Team',
  body: 'For questions about the scope of the special issue or general submission enquiries, please contact the Guest Editorial Team.',
  support: 'For technical issues with the submission system, please use the support options available in the IEEE Submission Portal.',
};
