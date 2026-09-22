export interface BlogPostSection {
  heading?: string
  paragraphs: string[]
}

export interface BlogPost {
  slug: string
  title: string
  description: string
  dek: string
  datePublished: string
  dateModified: string
  sections: BlogPostSection[]
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'agentic-ai-risk-needs-labels-not-slowdowns',
    title: 'Agentic AI Risk: Why Every Autonomous Decision Needs a Label',
    description:
      'Agentic AI risk explained in plain language: why agent made decisions must be labeled as such, why a human in the loop ratio of 1:8 to 1:15 matters, and why disclosure beats a slowdown.',
    dek: 'An agent that decides on its own is not a risk to hide. It is a risk to label.',
    datePublished: '2026-09-22',
    dateModified: '2026-09-22',
    sections: [
      {
        paragraphs: [
          'Agentic AI now books flights, moves money, writes code that ships, and answers customers without a person checking each step. That is the point of the technology, and it is also where most of the current worry about AI comes from. The charter\'s answer is not to slow this down. It is to label it.',
        ],
      },
      {
        heading: 'Call the decision what it is',
        paragraphs: [
          'The charter states that agentic decisions must be disclosed as decisions made by an agent, not presented as if a human made them. That single rule does most of the work. A customer who is told "our agent approved this" can weigh that differently than one who is told "we approved this," even when the outcome is identical.',
          'Hiding the agent behind a human sounding process is the actual danger, more than the agent itself. Once a decision is labeled correctly, everyone downstream, the customer, the auditor, the regulator, can trace it back to the system that made it.',
        ],
      },
      {
        heading: 'Oversight has a ratio, not a vibe',
        paragraphs: [
          'The charter proposes a human in the loop ratio between 1:8 and 1:15, meaning one human overseer per eight to fifteen active agents. Fewer agents per human and oversight is likely too thin to be worth the cost. More agents per human and one person is reviewing more decisions than they can meaningfully check.',
          'A ratio is not a guarantee against every failure, but it turns "we have oversight" from a claim into a number that can be checked, the same way a staffing ratio in a hospital or a classroom can be checked.',
        ],
      },
      {
        heading: 'Report failures like a product recall',
        paragraphs: [
          'Every AI agent, model, or system carries a no harm baseline as its starting principle. When that baseline is crossed, the charter treats the failure the way a product recall or an internal ethics issue is treated: reported, not buried, and filed somewhere the public can find it.',
          'That reporting duty pairs with the yearly disclosure the charter already asks for, where a model publishes the categorization of decisions it made. Put the label, the ratio, and the recall style reporting together, and agentic risk stops being a vague fear and becomes something a person can actually inspect.',
        ],
      },
      {
        heading: 'Where to check the label',
        paragraphs: [
          'A model\'s hazard placards show at a glance whether it makes agentic decisions and what category of risk that touches. The certification registry lists which models have made that disclosure and which have not. Neither replaces judgment, but both make the judgment easier to exercise.',
        ],
      },
    ],
  },
  {
    slug: 'ai-governance-without-a-single-regulator',
    title: 'AI Governance in 2026: Why No Single Country or Company Should Write the Rules',
    description:
      'AI governance explained through disclosure and certification instead of one national regulator: why the charter treats democratized AI access as a safeguard, not just a growth goal.',
    dek: 'Governance built around one gatekeeper is fragile. Governance built around disclosure scales.',
    datePublished: '2026-09-22',
    dateModified: '2026-09-22',
    sections: [
      {
        paragraphs: [
          'Most AI governance proposals still assume a single body will eventually write the rules: one country\'s regulator, one bloc\'s law, one company\'s internal policy adopted as a default standard. The charter takes a different starting point. It is written as global guidance, not a national policy or a binding law, and it argues that no single country should hold supremacy over AI at all.',
        ],
      },
      {
        heading: 'Why concentration is the risk, not the technology',
        paragraphs: [
          'The charter draws a direct historical comparison: an imbalance where one power holds a decisive technological advantage over others has, in the past, been a path toward conflict between great powers. Its answer is to democratize AI as fast as possible, so that advantage never concentrates in one place long enough to matter.',
          'That is also why the charter treats access as a governance tool, not just an economic one. AI reaching ordinary people, universities, and public institutions, not only large companies, is itself a check on any one actor cornering the technology.',
        ],
      },
      {
        heading: 'Disclosure does what a regulator would otherwise have to do',
        paragraphs: [
          'Instead of a single reviewing authority, the charter asks every model to self-disclose its origin, its training sources, and proof of that training through a certification. That certification states whether the model makes agentic decisions, what it was trained on, and what has already gone wrong, the way a HAZMAT placard tells a first responder what they are dealing with before they open the truck.',
          'A rule enforced by one regulator can be captured, delayed, or ignored outside that regulator\'s reach. A disclosure standard that anyone can check does not depend on any single authority agreeing to enforce it.',
        ],
      },
      {
        heading: 'A charter, not a law',
        paragraphs: [
          'Calling this a charter instead of a policy is deliberate. A policy belongs to whoever wrote it. A charter is written for anyone who chooses to sign on, the way a founding charter sets shared ground rules without needing a single owner. Adoption grows one certification at a time, through the registry, not through a mandate from any one government.',
        ],
      },
    ],
  },
  {
    slug: 'why-ai-development-should-not-slow-down',
    title: 'New Technology Always Carries Trade-offs. We Regulate Them, We Do Not Stop Building.',
    description:
      'A case against pausing AI over AI danger fears: how regulation, not prohibition, handled the automobile, leaded gasoline, and the factory, and what that means for responsible AI today.',
    dek: 'A short case for why AI development should not be slowed down.',
    datePublished: '2026-09-21',
    dateModified: '2026-09-21',
    sections: [
      {
        paragraphs: [
          'Every general purpose technology has arrived with real trade-offs. What consistently works is to keep building while disclosure and safety rules catch up, not to freeze progress until every risk is gone. That is the pattern this charter follows: name the risk, disclose it, regulate the specific harm, and keep improving in the open.',
        ],
      },
      {
        heading: 'The automobile',
        paragraphs: [
          'Early cars had no seatbelts, no airbags, no crumple zones, and shared the road with almost no traffic rules. Accidents were common while people worked out what safe driving even looked like. Nobody banned the automobile. Instead, over decades, seatbelt laws, crash testing, traffic signals, and licensing rules were added on top of a technology that kept improving the whole time.',
        ],
      },
      {
        heading: 'Leaded gasoline',
        paragraphs: [
          'For decades, gasoline contained tetraethyl lead to improve engine performance, and it released lead into the air people breathed, a real public health cost measured over time. Once that harm was disclosed, the additive was phased out through regulation, not by grounding every car overnight. The car survived. The harmful ingredient did not.',
        ],
      },
      {
        heading: 'The factory',
        paragraphs: [
          'Industrialization moved people from fields to machines that could injure an untrained worker. The fix history landed on was not fewer machines. It was factory inspections, safety guards on equipment, and labor rules, layered on top of a manufacturing base that kept growing.',
        ],
      },
      {
        heading: 'What this means for AI',
        paragraphs: [
          'None of this means AI is guaranteed to cause the same kind of harm cars or factories once did. It means every new technology carries real trade-offs, and the response that has consistently worked is disclosure and targeted regulation, not a pause. AI will keep surfacing its own deficiencies as it is used more widely. The charter\'s position is that those deficiencies should be found faster and fixed through disclosure, the same way a car\'s safety record improved through seatbelt laws and crash tests, not through slowing the whole technology down while every risk is resolved in advance.',
        ],
      },
    ],
  },
]

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug)
}
