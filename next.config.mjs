/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        MongoDBUrl: "mongodb://yunyun:1436%40yunyun%2B%2B%2B@server.velnom.xyz:27017/?authSource=admin",
        jwtsecret: "nomnomnom",
        ADMIN_EMAIL: "admin@admin",
        ADMIN_PASSWORD: "admin"
    }
};

export default nextConfig;
