# AI Charter

A public site for the Universal AI Charter: a governance charter built on disclosure instead of a development
slowdown, plus a certification registry so companies can certify their models against it.

The charter argues AI development should speed up, not slow down, while every model and every operator discloses
what it does, what it was trained on, and what has already gone wrong. It is a living document, revised as AI and
its governance needs change.

## What's in this site

- **Charter** (`/charter`) — the full charter, grouped into sections: Access & Equity, Innovation & Freedom,
  Governance & Disclosure, Accountability & Safety, Infrastructure & Data Centers, Global & Historical.
- **Certify** (`/certify`) — a form for companies to generate a certification file for a model (company, version,
  status, training sources, agentic decision-making, hazard categories, yearly decision categorization and
  sub-categorization, unintended consequences), and to upload/render an existing one.
- **Registry** (`/registry`) — a searchable, filterable list of certified models, sourced from JSON files under
  [`src/data/certifications/`](src/data/certifications/).
- **Placards** (`/placards`) — the hazard placard categories a certification can disclose, colour-coded by
  severity. The list is open-ended; propose a new placard by pull request.
- **Blog** (`/blog`) — the case for why AI development should not be slowed down.
- **FAQ** (`/faq`) — common questions about the charter and certification process.

## Contributing a certification

1. Go to [`/certify`](/certify), fill in the form, and download the certification JSON file.
2. Add the file to [`src/data/certifications/`](src/data/certifications/) in this repository.
3. Open a pull request. Anyone can review it before it goes live in the registry.

## Contributing a placard

Open a pull request against [`src/types/certification.ts`](src/types/certification.ts), adding an entry to
`HAZARD_CATEGORY_DEFINITIONS` with a label, severity, and one-line description.

## Development

```sh
npm install
npm run dev      # start the dev server
npm run build    # type-check and build for production
npm run lint     # run oxlint
npm run preview  # preview a production build locally
```

## Stack

React, TypeScript, Vite, Tailwind CSS, React Router.

## License

MIT, see [LICENSE](LICENSE).
