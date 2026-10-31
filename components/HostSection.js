import { FaInstagram } from "react-icons/fa6";

import Button from "./Button";
import CoverFlow from "./CoverFlow";
import { HOST, HOST_FULL_NAME } from "../data/site";
import { venueLogos } from "../lib/photos";

export default function HostSection() {
  return (
    <section className="section host-section" aria-labelledby="host-heading">
      <div className="container">
        <div className="host-heading">
          <div>
            <p className="eyebrow">Your host, five nights a week</p>
            <h2 id="host-heading">Meet Your Host</h2>
            <p className="host-name">{HOST_FULL_NAME}</p>
            {HOST.bio && <p className="lead">{HOST.bio}</p>}
          </div>
          {HOST.instagram && (
            <Button href={HOST.instagram} external variant="outline">
              <FaInstagram aria-hidden="true" /> Follow on Instagram
            </Button>
          )}
        </div>
        <CoverFlow venueLogos={venueLogos()} />
      </div>
    </section>
  );
}
