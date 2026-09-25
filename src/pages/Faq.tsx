import { Seo } from '../components/Seo'
import { JsonLd } from '../components/JsonLd'

const FAQ_ITEMS = [
  {
    q: 'Why call this a "charter" and not a policy, framework, or manifesto?',
    a: 'A policy usually belongs to one government or company. A charter is a founding document written for everyone who signs on to it, the way a city charter or a founding charter of an organization sets shared ground rules. This project is written as global guidance, not as one country\'s law, so charter fits the goal better than policy or framework.',
  },
  {
    q: 'Why call it "universal" or "global" when no single body enforces it?',
    a: 'It is universal in scope, not in enforcement. The principles are written to apply anywhere AI is built or used, and any company, government, or individual can choose to follow them and certify against them. Adoption is voluntary and grows one certification at a time, the same way early open standards spread before any regulator required them.',
  },
  {
    q: 'Does this charter want AI to slow down?',
    a: 'No. It asks for faster, more open AI development, paired with disclosure. The charter\'s view is that AI should be sped up to find its own deficiencies and fix them, not paused while problems go unaddressed.',
  },
  {
    q: 'Why disclosure instead of stricter review before release?',
    a: 'Slow review adds cost and delay without guaranteeing safety, and it favors whoever can afford the longest legal process. Disclosure works differently: a model states up front what it can decide, what it was trained on, and what has already gone wrong. That is checkable by anyone, immediately, the way a nutrition label works.',
  },
  {
    q: 'What does certification actually certify?',
    a: 'A certification is a small contract about one model or specialized agent, and one version: who owns it and where it originates, what it is capable of (text, image, audio, video, embeddings), its training parameter scale, whether it fingerprints its output, whether it is active, whether it makes agentic decisions on its own, what it was trained on, and any unintended consequences already on record. It can be downloaded, shared, and re-uploaded elsewhere to render the same information.',
  },
  {
    q: 'Why do certifications use hazard icons like HAZMAT placards?',
    a: 'A HAZMAT placard lets a first responder understand risk at a glance, without reading a manual. The icons on a certification do the same job for AI: they flag at a glance whether a model makes agentic decisions, touches public infrastructure, or carries other risks worth knowing about immediately.',
  },
  {
    q: 'What is the 1:8 to 1:15 human in the loop ratio about?',
    a: 'It is a suggested range for how many AI agents one human overseer can reasonably supervise at once. Below the range, oversight is likely too thin. Above it, a single person is likely reviewing more decisions than they can meaningfully check.',
  },
  {
    q: 'Why does the charter say data centers should not get tax breaks or land incentives?',
    a: 'The charter treats AI infrastructure as productive capital, not as a project that needs public subsidy to exist. If a data center is economically viable, it should be built on its own merits, and the disclosures it makes (power use, automation rates, spend on focused research versus automation) should be public either way.',
  },
  {
    q: 'What is "distillation" and why does the charter skip it?',
    a: 'Distillation is the practice of training a smaller model to copy a larger one\'s behavior. It raises its own set of open questions about attribution and training data that this charter does not try to resolve. It is called out so nobody assumes it was overlooked by accident.',
  },
  {
    q: 'Is any of this legal advice or a binding standard?',
    a: 'No. It is a plain-language starting point. Anyone using it for a real certification, regulation, or contract should have that reviewed by their own legal counsel.',
  },
]

export default function Faq() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }

  return (
    <div className="flex flex-col gap-8">
      <Seo
        title="FAQ"
        description="Answers on AI danger, why this is a charter not a law, the 1:8 to 1:15 human-in-the-loop ratio, and why disclosure beats a development slowdown."
        path="/faq"
      />
      <JsonLd data={faqJsonLd} />
      <div>
        <h1 className="text-3xl font-semibold m-0">Frequently asked questions</h1>
        <p className="mt-2 text-black/70">Plain answers, no fine print.</p>
      </div>

      <div className="flex flex-col gap-6">
        {FAQ_ITEMS.map((item) => (
          <div key={item.q} className="border-b border-slate-200 pb-6">
            <h2 className="text-lg font-semibold m-0">{item.q}</h2>
            <p className="mt-2 text-black/80 m-0">{item.a}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
