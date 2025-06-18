import { prisma } from '../prisma/prismaClient.js';

const getUserByIp = async (req, res) => {
    const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    if (!ipAddress) {
        return res.status(400).json({ error: "IP address not found" });
    }

    try {
        const user = await prisma.user.findFirst({
            where: { ipAddress },
            include: {
                reviews: true,
            },
        });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({ user });
    } catch (err) {
        console.error("❌ Error fetching user:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export { getUserByIp };