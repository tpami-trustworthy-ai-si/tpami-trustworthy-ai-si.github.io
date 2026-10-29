# IEEE TPAMI Special Issue on Trustworthy AI

Public website for **Trustworthy AI in Pattern Recognition and Computer Vision: Attacks, Robustness, Safety, and Beyond**.

- Website: https://tpami-trustworthy-ai-si.github.io/
- Contact: tpami.trustworthyai@gmail.com
- Maintained by the Guest Editorial Team.

This repository contains the public website source, images and deployment configuration. Internal editorial documents and correspondence are kept separately.

## Local development

Use Node.js 22 and npm:

```sh
npm ci
npm run dev
```

The site is served from `/`, rather than a personal website's subdirectory.

```sh
npm run build
npm run preview
```

## Content maintenance

| File | Contents |
| --- | --- |
| `src/config/site.ts` | Journal and title, submission status, portal URL, Article Type, team email, website URL and last-updated date |
| `src/config/dates.ts` | Submission deadline and target review/publication milestones |
| `src/config/content.ts` | Scope and submission instructions |
| `src/config/topics.ts` | Topics of interest |
| `src/config/editors.ts` | Public editor names, roles, affiliations, portraits and homepage links |
| `public/images/editors/` | Editor portraits |

Use `submissionStatus: 'open'` while accepting manuscripts; explicitly change it to `'closed'` when appropriate. The deadline currently specifies a calendar date without a cutoff time or timezone.

The secondary button displays **View Topics** until `cfpPdf` refers to an existing public CFP PDF in `public/`.

When the title, deadline, website URL or submission status changes, regenerate the social preview image and commit it:

```sh
npm run og
npm run build
```

`npm run check:assets` reports portrait dimensions and missing assets. Inter fonts used by the image generator are included with their SIL Open Font License in `scripts/og-assets/`.

## GitHub Pages deployment

The organization must be named `tpami-trustworthy-ai-si`, with this public repository named `tpami-trustworthy-ai-si.github.io`.

1. In **Settings → Pages → Build and deployment**, choose **GitHub Actions** as the source.
2. Push to `main`, or run **Build and deploy website** from the Actions tab.
3. The workflow checks and builds the site, then publishes the generated `dist/` artifact to GitHub Pages.

Pull requests run the build without publishing. Merging into `main` automatically deploys the approved changes; no personal-site checkout or file synchronization is needed.

If the website address changes, update `astro.config.mjs` and `src/config/site.ts`, regenerate `public/og.png`, and check sharing links and canonical metadata before deploying.

Keep at least two team members able to maintain the organization and repository. The public source and deployment artifact should contain only information intended for visitors; do not add internal documents or account credentials.
