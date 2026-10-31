import { pageMetadata } from "../../lib/metadata";
import AboutUs from "./parts/about";
import AboutHero from "./parts/about.hero";
import TeamSection from "./parts/teamCards";

export const metadata = pageMetadata({
  title: "About African Simba Events | Kampala Event Company",
  description:
    "Meet African Simba Events, the Kampala events team behind five weekly nights and the official Martell brand ambassador in Uganda.",
  path: "/about",
});

export default function About() {
  return (
    <>
      <AboutHero />
      <AboutUs />
      <TeamSection />
    </>
  );
}
