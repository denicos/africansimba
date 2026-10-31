import PageHeader from "../../components/PageHeader";
import { SITE } from "../../data/site";
import { pageMetadata } from "../../lib/metadata";

export const metadata = pageMetadata({
  title: "Terms of Service | African Simba Events, Kampala",
  description: "The terms for using the African Simba Events website and for booking tables and ordering drinks with us in Kampala.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Terms of Service" lead="Last updated: 31 October 2026" />
      <section className="section section-tight">
        <div className="container prose">
          <p>
            These terms apply when you use this website or book or order through {SITE.legalName}, trading as {SITE.name} (&quot;we&quot;,
            &quot;us&quot;). By using the site, you agree to them.
          </p>

          <h2>Age limit</h2>
          <p>
            Alcohol is not for sale to persons under 18. By ordering, or by confirming your age on this site, you confirm that you are 18 or older. We
            or the venue may ask for valid ID and may refuse service or entry. Please enjoy responsibly.
          </p>

          <h2>Bookings and orders</h2>
          <p>
            Tables and drinks are requested on WhatsApp. A request is only confirmed once we reply to confirm it. Availability, prices and any delivery
            details are given in that conversation and may change until confirmed.
          </p>

          <h2>Events and venues</h2>
          <p>
            Details of our nights, including times and line-ups, can change. Venues have their own rules, which you must follow while on their premises.
            Our events may be photographed and filmed, and these images may be used in our promotion. If you would rather not appear, tell a member of
            our team at the event or contact us.
          </p>

          <h2>Website content</h2>
          <p>
            Photos, logos and text on this site belong to us or to their owners, including our brand partners, and may not be reused without permission.
            We try to keep the site accurate, but it may contain errors, and bottle photos are for illustration.
          </p>

          <h2>Our responsibility</h2>
          <p>
            We provide this website as it is. To the extent the law allows, we are not responsible for indirect losses arising from using the site. Nothing
            in these terms limits rights you have under the law of Uganda.
          </p>

          <h2>Changes and governing law</h2>
          <p>We may update these terms and will post the new version here. These terms are governed by the laws of Uganda.</p>

          <h2>Contact us</h2>
          <p>
            Email <a href={`mailto:${SITE.email}`}>{SITE.email}</a> or call <a href={`tel:${SITE.phoneE164}`}>{SITE.phoneDisplay}</a>.
          </p>
        </div>
      </section>
    </>
  );
}
