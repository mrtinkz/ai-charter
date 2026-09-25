import { Link } from 'react-router-dom'
import { Seo } from '../components/Seo'

export default function Home() {
  return (
    <div className="flex flex-col gap-10">
      <Seo
        title="AI Dangers, AI Safety & Agentic AI Risk, in Plain Language"
        description="Is AI dangerous? A universal charter on AI dangers, AI safety, and agentic AI risk. Plain-language principles for responsible AI, AI governance, and AI regulation through disclosure and certification, not a development slowdown."
        path="/"
      />
      <section>
        <h1 className="text-4xl font-semibold m-0 leading-tight">Universal AI Charter</h1>
        <p className="mt-3 text-xl text-black/70 max-w-2xl">
          A universal charter for AI, in plain language.
        </p>
        <p className="mt-4 text-lg text-black/70 max-w-2xl">
          AI is moving fast, and the worry around it is real. This charter does not ask AI to slow down. It asks
          for disclosure: who trained a model, agent, or autonomous bot, on what, who it decides for, and what
          happens when it gets something wrong. Global guidance, not a national policy.
        </p>
        <div className="flex gap-3 mt-6 flex-wrap">
          <Link to="/charter" className="bg-blue-600 text-white font-medium px-5 py-2 rounded hover:bg-blue-700">
            Read the charter
          </Link>
          <Link to="/certify" className="border border-blue-600 text-blue-600 font-medium px-5 py-2 rounded hover:bg-blue-50">
            Get certified
          </Link>
          <Link to="/registry" className="border border-slate-300 text-black font-medium px-5 py-2 rounded hover:bg-slate-50">
            Browse the registry
          </Link>
        </div>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-blue-50 rounded-lg p-5">
          <h2 className="text-lg font-semibold m-0">Disclosure over restriction</h2>
          <p className="mt-2 text-sm text-black/70 m-0">
            Threats are managed by requiring models, agents, and autonomous bots to disclose what they do and why,
            not by slowing development down with costly review cycles.
          </p>
        </div>
        <div className="bg-blue-50 rounded-lg p-5">
          <h2 className="text-lg font-semibold m-0">Certification as a contract</h2>
          <p className="mt-2 text-sm text-black/70 m-0">
            A certification names the model, agent, or autonomous bot, its version, its status, and any unintended
            consequences on record, like a HAZMAT placard for software.
          </p>
        </div>
        <div className="bg-blue-50 rounded-lg p-5">
          <h2 className="text-lg font-semibold m-0">Access for everyone</h2>
          <p className="mt-2 text-sm text-black/70 m-0">
            AI should reach the common citizen as a consumer good, and be built and hosted by universities and
            governments too, not only large companies.
          </p>
        </div>
        <div className="bg-blue-50 rounded-lg p-5">
          <h2 className="text-lg font-semibold m-0">No single country in charge</h2>
          <p className="mt-2 text-sm text-black/70 m-0">
            AI should be democratized quickly so no one nation holds supremacy over it.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold">New here?</h2>
        <p className="mt-2 text-black/70">
          Read the <Link to="/faq" className="font-medium">FAQ</Link> for why this is called a charter, browse the{' '}
          <Link to="/registry" className="font-medium">certification registry</Link>, or read the{' '}
          <Link to="/blog" className="font-medium">blog</Link> for why AI development should not be slowed down.
        </p>
      </section>
    </div>
  )
}
