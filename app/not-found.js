
import Button from "../components/Button";
import PageHeader from "../components/PageHeader";

export const metadata = {
  title: "Page not found | African Simba Events",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <PageHeader eyebrow="404" title="Page not found" lead="Sorry, we couldn't find the page you're looking for.">
      <div className="button-row">
        <Button href="/">
          Go back home
        </Button>
        <Button href="/nights" variant="outline">
          See our nights
        </Button>
      </div>
    </PageHeader>
  );
}
