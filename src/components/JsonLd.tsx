/**
 * JsonLd — injects a <script type="application/ld+json"> tag.
 * Use in Server Components only (no "use client").
 */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data, null, 0) }}
    />
  );
}
