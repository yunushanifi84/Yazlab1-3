/** @type {import('next').NextConfig} */
const nextConfig = {

    serverExternalPackages: ['websocket'],
    env: {
        MongoDBUrl: "mongodb://localhost:27017/",
        JWTSECRET: "nomnomnom",
        ADMIN_EMAIL: "admin@admin",
        ADMIN_PASSWORD: "admin"
    }

};

export default nextConfig;
