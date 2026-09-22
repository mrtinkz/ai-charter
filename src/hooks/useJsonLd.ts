import { useEffect } from 'react'

/** Injects a `<script type="application/ld+json">` into `<head>` while the component is mounted. */
export function useJsonLd(id: string, data: unknown) {
  useEffect(() => {
    const script = document.createElement('script')
    script.id = id
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(data)
    document.head.appendChild(script)
    return () => {
      script.remove()
    }
  }, [id, data])
}
