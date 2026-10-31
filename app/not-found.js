import Link from "next/link";

import PageHeader from "../components/PageHeader";

export const metadata = {
  title: "Page not found | African Simba Events",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <PageHeader eyebrow="404" title="Page not found" lead="Sorry, we couldn't find the page you're looking for.">
      <div className="button-row">
        <Link href="/" className="btn btn-gold">
          Go back home
        </Link>
        <Link href="/nights" className="btn btn-outline">
          See our nights
        </Link>
      </div>
    </PageHeader>
  );
}
