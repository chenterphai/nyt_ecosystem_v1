/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: "http",
                hostname: "localhost",
                port: "3000"
            },
            {
                protocol: "https",
                hostname: "gcxsvuwjngrpqmekwgzc.supabase.co",
                pathname: "**"
            }
        ]
    }
};

export default nextConfig;
