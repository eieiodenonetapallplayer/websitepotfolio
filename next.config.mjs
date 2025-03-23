/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dcdn.dstn.to",
        pathname: "/banners/**",
      },
      {
        protocol: "https",
        hostname: "cdn.discordapp.com",
        pathname: "/avatars/**",
      },
      {
        protocol: "https",
        hostname: "i.scdn.co",
        pathname: "/image/**",
      },
      {
        protocol: "https",
        hostname: "i.waifu.pics",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "count.getloli.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.postimg.cc",
        pathname: "/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840, 4096],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 512],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ["@/components"],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  poweredByHeader: false,
  compress: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  assetPrefix: process.env.NODE_ENV === "production" ? "/_next" : "",
  headers: async () => {
    return [
      {
        source: "/videos/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(mp4|webm)$/i,
      use: [
        {
          loader: "file-loader",
          options: {
            name: "[name].[hash].[ext]",
            outputPath: "static/media/",
            publicPath: "/_next/static/media/",
          },
        },
      ],
    });
    config.module.rules.push({
      test: /\.(mp3|wav)$/i,
      type: "asset/resource",
      generator: {
        filename: "static/audio/[name][ext]",
      },
    });
    return config;
  },
  output: "standalone",
  staticPageGenerationTimeout: 300,
};

export default nextConfig;
