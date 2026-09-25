import { CHARTER_PREAMBLE, CHARTER_SECTIONS } from '../data/charter'
import { Seo } from '../components/Seo'

export default function Charter() {
  return (
    <div className="flex flex-col gap-10">
      <Seo
        title="The Charter"
        description="Read the full Universal AI Charter: articles on AI governance, AI regulation, agentic AI risk, and responsible AI development, built around disclosure instead of a development slowdown."
        path="/charter"
      />
      <header>
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide m-0">The charter</p>
        <h1 className="text-3xl sm:text-4xl font-semibold mt-1 mb-4">The Universal AI Charter</h1>
        <p className="text-lg text-black/80 max-w-3xl leading-relaxed">{CHARTER_PREAMBLE}</p>
        <p className="mt-4 max-w-3xl text-sm text-amber-900 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3">
          This charter is not set in stone. It is a living document, revised as AI, its risks, and its governance
          needs keep changing.
        </p>
      </header>

      <nav aria-label="Charter sections" className="flex flex-wrap gap-2 border-y border-slate-200 py-4">
        {CHARTER_SECTIONS.map((section, index) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className="text-sm px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 hover:bg-blue-100"
          >
            {index + 1}. {section.title}
          </a>
        ))}
      </nav>

      <div className="flex flex-col gap-14">
        {CHARTER_SECTIONS.map((section, sectionIndex) => (
          <section key={section.id} id={section.id} className="scroll-mt-20">
            <h2 className="text-2xl font-semibold m-0">
              <span className="text-blue-600">{sectionIndex + 1}.</span> {section.title}
            </h2>
            <p className="mt-2 mb-5 text-black/70 max-w-2xl">{section.intro}</p>

            <ol className="flex flex-col gap-3 list-none p-0 m-0">
              {section.articles.map((article, articleIndex) => (
                <li key={article} className="flex gap-4 bg-blue-50 rounded-lg px-4 py-3">
                  <span className="shrink-0 font-mono text-sm text-blue-700 font-semibold">
                    {sectionIndex + 1}.{articleIndex + 1}
                  </span>
                  <p className="m-0 text-[15px] leading-relaxed">{article}</p>
                </li>
              ))}
            </ol>
          </section>
        ))}
      </div>
    </div>
  )
}
