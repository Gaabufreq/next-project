import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images:{
    remotePatterns:[
      {
        hostname:'lh3.googleusercontent.com'
      },
      {
        hostname: "ttndqjjdkryurosapixv.supabase.co",
        pathname: "/storage/v1/object/public/**",
      }
    ]
  }
};

export default nextConfig;
