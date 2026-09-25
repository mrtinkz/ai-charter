import { Head } from 'vite-react-ssg'

/** Emits a JSON-LD `<script>` into the document head at build and runtime. */
export function JsonLd({ data }: { data: unknown }) {
  return (
    <Head>
      <script type="application/ld+json">{JSON.stringify(data)}</script>
    </Head>
  )
}
