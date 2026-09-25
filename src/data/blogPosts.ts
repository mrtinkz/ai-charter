export interface BlogPostSection {
  heading?: string
  paragraphs: string[]
}

export interface BlogPostSource {
  /** Full APA 7 reference string, e.g. "Stanford HAI. (2025). The 2025 AI Index report...". */
  citation: string
  url: string
}

export interface BlogPost {
  slug: string
  title: string
  description: string
  dek: string
  datePublished: string
  dateModified: string
  sections: BlogPostSection[]
  /** APA-style references shown at the end of the post. Optional: only posts making factual claims carry them. */
  sources?: BlogPostSource[]
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'agentic-ai-risk-needs-labels-not-slowdowns',
    title: 'Agentic AI Risk: Why Every Autonomous AI Decision Needs a Label',
    description:
      'Agentic AI risk explained in plain language: why AI agents that decide on their own must be labeled as such, why a human-in-the-loop ratio of 1:8 to 1:15 matters, and why disclosure beats an AI development slowdown.',
    dek: 'An AI agent that decides on its own is not a risk to hide. It is a risk to label.',
    datePublished: '2026-09-22',
    dateModified: '2026-09-25',
    sections: [
      {
        paragraphs: [
          'Agentic AI now books flights, moves money, writes code that ships, and answers customers without a person checking each step. That is the point of the technology, and it is also where most of the current worry about AI comes from (Stanford HAI, 2025). Agentic systems also add multi-agent risks that a single model never had (MIT FutureTech, 2025). The charter\'s answer is not to slow this down. It is to label it.',
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
          'Every AI agent, model, or system carries a no harm baseline as its starting principle. When that baseline is crossed, the charter treats the failure the way a product recall or an internal ethics issue is treated: reported, not buried, and filed somewhere the public can find it. That mirrors established risk-management practice, where a failure is governed and managed rather than hidden (National Institute of Standards and Technology, 2023).',
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
    sources: [
      {
        citation:
          'Stanford HAI. (2025). The 2025 AI Index report. Stanford Institute for Human-Centered Artificial Intelligence.',
        url: 'https://hai.stanford.edu/ai-index/2025-ai-index-report',
      },
      {
        citation: 'MIT FutureTech. (2025). The AI Risk Repository. Massachusetts Institute of Technology.',
        url: 'https://airisk.mit.edu/',
      },
      {
        citation:
          'National Institute of Standards and Technology. (2023). AI Risk Management Framework (AI RMF 1.0). U.S. Department of Commerce.',
        url: 'https://www.nist.gov/itl/ai-risk-management-framework',
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
    dateModified: '2026-09-25',
    sections: [
      {
        paragraphs: [
          'Most AI governance proposals still assume a single body will eventually write the rules: one country\'s regulator, one bloc\'s law, one company\'s internal policy adopted as a default standard. In 2024 alone, bodies including the OECD, the EU, and the UN released AI governance frameworks centered on transparency and trustworthiness (Stanford HAI, 2025). The charter takes a different starting point. It is written as global guidance, not a national policy or a binding law, and it argues that no single country should hold supremacy over AI at all.',
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
          'Instead of a single reviewing authority, the charter asks every model to self-disclose its origin, its training sources, and proof of that training through a certification. That certification states whether the model makes agentic decisions, what it was trained on, and what has already gone wrong, the way a HAZMAT placard tells a first responder what they are dealing with before they open the truck. This is the same instinct behind the EU AI Act\'s transparency duties (Future of Life Institute, 2024) and voluntary frameworks such as the NIST AI Risk Management Framework (National Institute of Standards and Technology, 2023).',
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
    sources: [
      {
        citation: 'Future of Life Institute. (2024). The EU Artificial Intelligence Act.',
        url: 'https://artificialintelligenceact.eu/',
      },
      {
        citation:
          'National Institute of Standards and Technology. (2023). AI Risk Management Framework (AI RMF 1.0). U.S. Department of Commerce.',
        url: 'https://www.nist.gov/itl/ai-risk-management-framework',
      },
      {
        citation:
          'Stanford HAI. (2025). The 2025 AI Index report. Stanford Institute for Human-Centered Artificial Intelligence.',
        url: 'https://hai.stanford.edu/ai-index/2025-ai-index-report',
      },
    ],
  },
  {
    slug: 'why-ai-development-should-not-slow-down',
    title: 'Is AI Dangerous? Why We Regulate New Technology Instead of Banning It',
    description:
      'Is AI dangerous, and should we pause it? A plain-language case that AI dangers are best handled the way we handled the automobile, leaded gasoline, and the factory: disclosure and targeted regulation, not prohibition.',
    dek: 'A short case for why AI development should not be slowed down.',
    datePublished: '2026-09-21',
    dateModified: '2026-09-25',
    sections: [
      {
        paragraphs: [
          'Every general purpose technology has arrived with real trade-offs. What consistently works is to keep building while disclosure and safety rules catch up, not to freeze progress until every risk is gone. That is the pattern this charter follows: name the risk, disclose it, regulate the specific harm, and keep improving in the open.',
        ],
      },
      {
        heading: 'The automobile',
        paragraphs: [
          'Early cars had no seatbelts, no airbags, no crumple zones, and shared the road with almost no traffic rules. Accidents were common while people worked out what safe driving even looked like. Nobody banned the automobile. Instead, over decades, the response was regulation layered on top of a technology that kept improving: the Highway Safety Act and the National Traffic and Motor Vehicle Safety Act of 1966 authorized federal safety standards, which brought seat belts, energy-absorbing steering wheels, and shatter-resistant windshields, while states added driver licensing, vehicle inspections, and traffic laws (Centers for Disease Control and Prevention, 1999). The payoff was measurable: the motor-vehicle death rate per mile traveled fell about 90% between 1925 and 1997 (Centers for Disease Control and Prevention, 1999).',
        ],
      },
      {
        heading: 'Leaded gasoline',
        paragraphs: [
          'From the early 1920s, gasoline was blended with tetraethyl lead to boost octane, and by 1973 that put roughly 200,000 tons of lead a year into the air people breathed, a real public health cost (U.S. Environmental Protection Agency, 1996). Once that harm was disclosed, the additive was phased out through regulation rather than by grounding every car overnight: the EPA issued its first reduction standards in 1973 and the Clean Air Act banned leaded fuel for on-road vehicles effective January 1, 1996, after which children\'s blood lead levels dropped about 70% (U.S. Environmental Protection Agency, 1996). The car survived. The harmful ingredient did not.',
        ],
      },
      {
        heading: 'The factory',
        paragraphs: [
          'Industrialization moved people from fields to machines that could injure an untrained worker. The fix history landed on was not fewer machines. It was inspections, safety standards on equipment, and enforceable labor rules, layered on top of a manufacturing base that kept growing. In the United States, the Occupational Safety and Health Act of 1970 codified that approach, authorizing mandatory workplace safety standards, on-site inspections, and citations for employers who expose workers to recognized hazards (Occupational Safety and Health Act, 1970).',
        ],
      },
      {
        heading: 'What this means for AI',
        paragraphs: [
          'None of this means AI is guaranteed to cause the same kind of harm cars or factories once did. It means every new technology carries real trade-offs, and the response that has consistently worked is disclosure and targeted regulation, not a pause. AI will keep surfacing its own deficiencies as it is used more widely. The charter\'s position is that those deficiencies should be found faster and fixed through disclosure, the same way a car\'s safety record improved through seatbelt laws and crash tests, not through slowing the whole technology down while every risk is resolved in advance.',
          'This is not a fringe view. The AI Index for 2025 records both a sharp rise in AI incidents and a wave of new government frameworks built around transparency and trustworthiness rather than prohibition (Stanford HAI, 2025), and living resources like the MIT AI Risk Repository (MIT FutureTech, 2025) and the AI Incident Database (Responsible AI Collaborative, 2026) exist precisely so those harms can be named and learned from in the open.',
        ],
      },
    ],
    sources: [
      {
        citation:
          'Centers for Disease Control and Prevention. (1999). Achievements in public health, 1900-1999: Motor-vehicle safety: A 20th century public health achievement. Morbidity and Mortality Weekly Report, 48(18), 369-374.',
        url: 'https://www.cdc.gov/mmwr/preview/mmwrhtml/mm4818a1.htm',
      },
      {
        citation:
          'U.S. Environmental Protection Agency. (1996). EPA takes final step in phaseout of leaded gasoline [Press release].',
        url: 'https://www.epa.gov/archive/epa/aboutepa/epa-takes-final-step-phaseout-leaded-gasoline.html',
      },
      {
        citation:
          'Occupational Safety and Health Act of 1970, Pub. L. No. 91-596, 84 Stat. 1590 (1970).',
        url: 'https://www.osha.gov/laws-regs/oshact/completeoshact',
      },
      {
        citation:
          'Stanford HAI. (2025). The 2025 AI Index report. Stanford Institute for Human-Centered Artificial Intelligence.',
        url: 'https://hai.stanford.edu/ai-index/2025-ai-index-report',
      },
      {
        citation: 'MIT FutureTech. (2025). The AI Risk Repository. Massachusetts Institute of Technology.',
        url: 'https://airisk.mit.edu/',
      },
      {
        citation: 'Responsible AI Collaborative. (2026). AI Incident Database.',
        url: 'https://incidentdatabase.ai/',
      },
    ],
  },
]

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug)
}
