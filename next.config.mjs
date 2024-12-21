/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        MongoDBUrl: "mongodb://localhost:27017/",
        jwtsecret: "nomnomnom",
        ADMIN_EMAIL: "admin@admin",
        ADMIN_PASSWORD: "admin"
    }
};

export default nextConfig;
