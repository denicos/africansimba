import PageHeader from "../../components/PageHeader";
import PhotoGallery from "../../components/PhotoGallery";
import VideoGrid from "../../components/VideoGrid";
import { pageMetadata } from "../../lib/metadata";
import { photos, videos } from "./data";

export const metadata = pageMetadata({
  title: "Gallery: Kampala Nightlife Photos & Videos | African Simba Events",
  description:
    "Photos and videos from African Simba Events nights in Kampala. See the crowds, DJs and flames, then book your table on WhatsApp.",
  path: "/gallery",
});

export default function GalleryPage() {
  return (
    <>
      <PageHeader eyebrow="Gallery" title="Kampala nights, captured" lead="A weekly nightlife you cannot afford to miss." />
      <section className="section section-tight">
        <div className="container">
          <PhotoGallery photos={photos} />
        </div>
      </section>
      <section className="section" aria-labelledby="videos-heading">
        <div className="container">
          <p className="eyebrow">Videos</p>
          <h2 id="videos-heading">Watch</h2>
          <VideoGrid videos={videos} />
        </div>
      </section>
    </>
  );
}
