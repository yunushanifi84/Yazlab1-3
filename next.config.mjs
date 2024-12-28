/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        MongoDBUrl: "mongodb://admin:none+1+2+3+4+5%40.@enone.com.tr:27017/Yazlab1-3?authSource=admin",
        jwtsecret: "nomnomnom",
        ADMIN_EMAIL: "admin@admin",
        ADMIN_PASSWORD: "admin"
    }
};

export default nextConfig;
