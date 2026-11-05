import "dotenv/config";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
    log:
        process.env.NODE_ENV === "development"
            ? ["query", "error", "warn"]
            : ["error"],
});

const connectDB = async () => {
    try {
        await prisma.$connect();
        console.log("DB connected via Prisma");
    } catch (error) {
        console.error("Database connection error:", error);
        throw error;
    }
};

const disconnectDB = async () => {
    await prisma.$disconnect();
};

export { prisma, connectDB, disconnectDB };