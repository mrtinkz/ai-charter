import { useSeo } from '../hooks/useSeo'

export default function Blog() {
  useSeo({
    title: 'Blog: Why AI Development Should Not Slow Down',
    description:
      'A case against pausing AI over AI danger fears: how regulation, not prohibition, handled the automobile, leaded gasoline, and the factory, and what that means for responsible AI today.',
    path: '/blog',
  })

  return (
    <article className="flex flex-col gap-6 max-w-2xl">
      <div>
        <p className="text-sm text-blue-600 font-medium m-0">Blog</p>
        <h1 className="text-3xl font-semibold mt-1 mb-2">
          New technology always carries trade-offs. We regulate them, we do not stop building.
        </h1>
        <p className="text-black/60 text-sm m-0">A short case for why AI development should not be slowed down.</p>
      </div>

      <p>
        Every general purpose technology has arrived with real trade-offs. What consistently works is to keep
        building while disclosure and safety rules catch up, not to freeze progress until every risk is gone. That
        is the pattern this charter follows: name the risk, disclose it, regulate the specific harm, and keep
        improving in the open.
      </p>

      <h2 className="text-xl font-semibold mt-2">The automobile</h2>
      <p>
        Early cars had no seatbelts, no airbags, no crumple zones, and shared the road with almost no traffic
        rules. Accidents were common while people worked out what safe driving even looked like. Nobody banned the
        automobile. Instead, over decades, seatbelt laws, crash testing, traffic signals, and licensing rules were
        added on top of a technology that kept improving the whole time.
      </p>

      <h2 className="text-xl font-semibold mt-2">Leaded gasoline</h2>
      <p>
        For decades, gasoline contained tetraethyl lead to improve engine performance, and it released lead into
        the air people breathed, a real public health cost measured over time. Once that harm was disclosed, the
        additive was phased out through regulation, not by grounding every car overnight. The car survived. The
        harmful ingredient did not.
      </p>

      <h2 className="text-xl font-semibold mt-2">The factory</h2>
      <p>
        Industrialization moved people from fields to machines that could injure an untrained worker. The fix
        history landed on was not fewer machines. It was factory inspections, safety guards on equipment, and
        labor rules, layered on top of a manufacturing base that kept growing.
      </p>

      <h2 className="text-xl font-semibold mt-2">What this means for AI</h2>
      <p>
        None of this means AI is guaranteed to cause the same kind of harm cars or factories once did. It means
        every new technology carries real trade-offs, and the response that has consistently worked is disclosure
        and targeted regulation, not a pause. AI will keep surfacing its own deficiencies as it is used more
        widely. The charter's position is that those deficiencies should be found faster and fixed through
        disclosure, the same way a car's safety record improved through seatbelt laws and crash tests, not through
        slowing the whole technology down while every risk is resolved in advance.
      </p>
    </article>
  )
}
