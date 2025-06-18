import uploadToSupabase from '../utils/fileUploader.js';
import { prisma } from '../prisma/prismaClient.js';

const submitReview = async (req, res) => {
    const { username, productId, rating, review } = req.body;
    const file = req.file;
    const ipAddress = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

    if (!username || !productId || !rating) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {
        let user = await prisma.user.findFirst({
            where: { ipAddress },
        });

        if (!user) {
            user = await prisma.user.create({
                data: { username, ipAddress },
            });
        } else {
            console.log(`User already exists for IP ${ipAddress} as ${user.username}`);
        }

        const existing = await prisma.review.findFirst({
            where: {
                productId,
                userId: user.id,
            },
        });

        if (existing) {
            return res.status(403).json({ error: "Already reviewed" });
        }

        let imageUrl = null;
        if (file) {
            imageUrl = await uploadToSupabase(file);
        }

        await prisma.review.create({
            data: {
                productId,
                rating: parseInt(rating),
                review,
                imageUrl,
                userId: user.id,
            },
        });

        const updatedUser = await prisma.user.findUnique({
            where: { id: user.id },
            include: { reviews: true },
        });

        res.status(201).json({
            message: "Review submitted successfully",
            user: updatedUser,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export { submitReview };