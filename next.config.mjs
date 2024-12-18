/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        MongoDBUrl: "mongodb://localhost:27017",
        jwtsecret: "nomnomnom",
    }
};

export default nextConfig;
