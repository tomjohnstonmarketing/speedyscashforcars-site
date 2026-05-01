import { SITE } from "@/lib/site";

/**
 * Renders whatever HTML embed the user has pasted into lib/site.ts
 * (Jotform, HubSpot, Zoho Forms, Typeform, etc.)
 */
export default function ContactFormEmbed({ className }: { className?: string }) {
  return (
    <div id="quote" className={className}>
      <div dangerouslySetInnerHTML={{ __html: SITE.contactFormEmbed }} />
    </div>
  );
}
