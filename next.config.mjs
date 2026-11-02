import { withNextVideo } from "next-video/process";
/** @type {import('next').NextConfig} */
const nextConfig = {
  // The hero video is cached for 30 days, so it starts straight away on repeat visits. When you change the clip,
  // give the new file a new name (and update components/HeroVideo.js), or returning visitors keep the old one.
  async headers() {
    return [
      {
        source: "/videos/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=2592000" }],
      },
    ];
  },
  async redirects() {
    return [
      { source: "/home", destination: "/", permanent: true },
      { source: "/events", destination: "/nights", permanent: true },
      { source: "/bookings", destination: "/nights", permanent: true },
      { source: "/store/:path*", destination: "/", permanent: true },
      { source: "/cart", destination: "/", permanent: true },
      { source: "/contactus", destination: "/contact-us", permanent: true },
    ];
  },
};

export default withNextVideo(nextConfig);
