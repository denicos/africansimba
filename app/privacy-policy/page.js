import PageHeader from "../../components/PageHeader";
import { SITE } from "../../data/site";
import { pageMetadata } from "../../lib/metadata";

export const metadata = pageMetadata({
  title: "Privacy Policy | African Simba Events, Kampala",
  description: "How African Simba Events in Kampala collects, uses and protects your personal information when you use our website and WhatsApp.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Privacy Policy" lead="Last updated: 31 October 2026" />
      <section className="section section-tight">
        <div className="container prose">
          <p>
            This website is run by {SITE.legalName}, trading as {SITE.name}, of Kansanga, Makindye, Kampala, Uganda (&quot;we&quot;,
            &quot;us&quot;). This policy explains what personal information we collect and how we use it, in line with the Data Protection and
            Privacy Act, 2019 of Uganda.
          </p>

          <h2>What we collect</h2>
          <ul>
            <li>
              <strong>Messages you send us.</strong> Our website has no accounts or forms. When you tap a WhatsApp button, your WhatsApp app opens
              with a suggested message. If you send it, we receive your phone number, your WhatsApp profile name and what you write.
            </li>
            <li>
              <strong>Email and phone calls.</strong> If you contact us this way, we receive your contact details and your message.
            </li>
            <li>
              <strong>Website usage.</strong> We use Google Analytics to understand how the site is used, such as pages viewed, general location,
              device type and which WhatsApp buttons are tapped. Google Analytics uses cookies to do this.
            </li>
            <li>
              <strong>Your 18+ answer.</strong> When you confirm you are 18 or older, we save that answer in your browser so we do not ask again. It
              stays on your device and is not sent to us.
            </li>
          </ul>

          <h2>How we use it</h2>
          <ul>
            <li>To respond to you and handle your table bookings and drink orders.</li>
            <li>To improve our website and understand which nights and drinks interest visitors.</li>
            <li>To meet our legal obligations.</li>
          </ul>

          <h2>Who we share it with</h2>
          <p>
            We do not sell your personal information. Some services we use process information for us or under their own terms: WhatsApp (Meta) for
            messages, Google for analytics, YouTube if you choose to play a video, and Vercel for hosting. These companies may process information
            outside Uganda.
          </p>

          <h2>How long we keep it</h2>
          <p>We keep your messages and booking details only for as long as we need them for the purposes above, or as the law requires.</p>

          <h2>Your rights</h2>
          <p>
            You can ask us for a copy of the personal information we hold about you, ask us to correct or delete it, or object to how we use it. You
            can also clear cookies and saved data in your browser at any time. If you are unhappy with how we handle your information, you can
            complain to the Personal Data Protection Office of Uganda.
          </p>

          <h2>Under 18s</h2>
          <p>Our services are for adults. We do not knowingly collect personal information from anyone under 18.</p>

          <h2>Contact us</h2>
          <p>
            Email <a href={`mailto:${SITE.email}`}>{SITE.email}</a> or call <a href={`tel:${SITE.phoneE164}`}>{SITE.phoneDisplay}</a>.
          </p>
        </div>
      </section>
    </>
  );
}
