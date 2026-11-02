import PageHeader from "../../components/PageHeader";
import WeekList from "../../components/WeekList";
import { pageMetadata } from "../../lib/metadata";

export const metadata = pageMetadata({
  title: "Our Weekly Nights in Kampala | African Simba Events",
  description:
    "Five weekly nights in Kampala: Bandali Mondays, Wahala Wednesday, Swift Fridays, Illicit Saturday and Belle Vie Sunday at Thrones, Nomad and Vanquish.",
  path: "/nights",
});

export default function NightsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our Nights"
        title="Our weekly nights in Kampala"
        lead="Five official Martell nights by African Simba Events, every week at Thrones, Nomad and Vanquish."
      />
      <section className="section section-tight">
        <div className="container">
          <WeekList />
        </div>
      </section>
    </>
  );
}
