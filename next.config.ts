import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  output: "standalone",
  // Lets phones on the local network load dev assets (HMR) from `next dev`.
  allowedDevOrigins: ["192.168.*.*"],
};

export default withNextIntl(nextConfig);
