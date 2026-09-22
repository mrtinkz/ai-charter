export interface CharterSection {
  id: string
  title: string
  intro: string
  articles: string[]
}

export const CHARTER_PREAMBLE =
  'AI is arriving faster than most institutions can react to it, and public debate about it swings between ' +
  'utopia and existential threat. This charter takes a third position: AI development should speed up, not slow ' +
  'down, while every model and every operator discloses what it does, what it was trained on, and what has ' +
  'already gone wrong. Disclosure, not delay, is how a technology moving this fast gets managed. What follows are ' +
  'the principles, grouped by theme.'

export const CHARTER_SECTIONS: CharterSection[] = [
  {
    id: 'access-equity',
    title: 'Access & Equity',
    intro: 'AI should reach ordinary people and public institutions, not stay locked inside a handful of companies.',
    articles: [
      'AI must be accessible to the common citizen, as a consumer good, not a privilege reserved for large institutions.',
      'AI must be embraced by all for the betterment of humanity.',
      'AI must be treated as a capital good, an asset that, once acquired, is put to work producing other goods.',
      'AI must be used to improve government efficiency and reduce the time it takes to deliver public services.',
      'Universities, governments, and public and non-profit bodies must build AI and host it for public use, alongside private industry.',
    ],
  },
  {
    id: 'innovation-freedom',
    title: 'Innovation & Freedom',
    intro:
      'Development itself should not be slowed, blocked, or criminalized. It should speed up so its flaws surface, and get fixed, sooner.',
    articles: [
      'AI development should target consumer electronics, information technology hardware, and digital appliances, not stay confined to specialist systems.',
      'AI development must not be limited in any capacity.',
      'Open-source development of AI must not be blocked.',
      'Use of AI must not be blocked.',
      'The use, building, or distribution of AI must never be criminalized, for a company or an individual.',
      'AI development should speed up so it surfaces its own deficiencies sooner, and those deficiencies get fixed through efficient solutions rather than delay.',
      'AI should be applied first to focused, prioritized fields, such as finding cures for disease, before it automates already-obvious tasks.',
    ],
  },
  {
    id: 'governance-disclosure',
    title: 'Governance & Disclosure',
    intro:
      "The tool for managing AI's risk is disclosure: a model states plainly what it was trained on, what it decides, and what has already gone wrong.",
    articles: [
      'AI tokens must be fingerprinted to protect intellectual property.',
      'AI models must self-disclose their origin, their training sources, and proof of that training, i.e., a certification.',
      "A certification must disclose whether the model is involved in decision-making, including the unintended consequences that decision could carry, the way a HAZMAT placard warns the public and first responders at a glance.",
      'Agentic decisions must be disclosed as decisions made by an agent, not presented as if a human made them.',
      'Every AI model should self-disclose, on a yearly basis, the categorization and sub-categorization of the decisions it made, filed publicly and accessible through right-of-information requests.',
      'The destruction of knowledge, books or any other source, must be criminalized once that knowledge has been used to train an AI.',
      'All sources used to train an AI, such as books and datasets, must be disclosed.',
      'Agentic bias in how information is surfaced or withheld must be disclosed.',
      'The risks of relying on AI, such as the loss of human analytical skill from overuse, must be disclosed, the way warning labels disclose the risks of alcohol or tobacco.',
      'Distillation, training a smaller model to copy a larger one, raises its own open questions that this charter does not attempt to resolve here.',
    ],
  },
  {
    id: 'accountability-safety',
    title: 'Accountability & Safety',
    intro: 'Oversight should scale with agents, and failures should be reported the moment they are found.',
    articles: [
      'The ratio of AI agents to a human in the loop should stay between 1:8 and 1:15, so oversight remains meaningful in either direction.',
      'Every AI agent, model, or system must abide by core principles, starting with no harm.',
      'Unintended consequences and events must be reported, the same way a product recall or an internal ethics issue would be.',
      "Threats should be managed through disclosure, not through slower, costlier review processes. If a system already discloses what it controls and why it was built that way, that disclosure is the safeguard, and company ethics carries it from there.",
    ],
  },
  {
    id: 'infrastructure-data-centers',
    title: 'Infrastructure & Data Centers',
    intro: 'The infrastructure behind AI should be as transparent as the models it powers.',
    articles: [
      'AI data centers should be public companies.',
      'AI data centers should disclose their power grid usage, automation rates, and similar operating data.',
      'Data centers should not be incentivized through land grants, tax credits, or similar subsidies.',
      'Data centers must harness their own waste heat rather than discard it.',
      'Every data center must disclose how much of its spend went to focused fields, such as disease research, versus automation fields.',
      'Model efficiency and power consumption should carry an energy guide label, the way televisions and appliances already do.',
    ],
  },
  {
    id: 'global-historical',
    title: 'Global & Historical',
    intro: "AI's arrival is significant enough to call for global coordination, not a single nation's policy.",
    articles: [
      'AI must be democratized as soon as possible so no single country holds supremacy over it, an imbalance history shows can lead to war between great powers.',
      'Some already speak of an AI era the way BCE and CE once marked a turn in history. This charter does not assert a new calendar; it uses that comparison only to signal how large a turning point AI is.',
      'This charter is global guidance meant to ensure balance. It is not a national policy or a binding law.',
    ],
  },
]
