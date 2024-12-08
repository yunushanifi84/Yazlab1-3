/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        MongoDBUrl: "mongodb://nom:1436%40yunyun@185.240.104.130/?authSource=admin",
        jwtsecret: "nomnomnom",
    }
};

export default nextConfig;
