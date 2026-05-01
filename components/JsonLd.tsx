/**
 * Drop-in JSON-LD emitter. Pass a JSON-serializable object and it renders
 * a <script type="application/ld+json"> tag.
 */
export default function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
