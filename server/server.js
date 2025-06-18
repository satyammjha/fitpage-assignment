import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import reviewRoutes from "./routes/review.routes.js";
import userRoute from './routes/user.routes.js'
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", reviewRoutes);
app.use("/user", userRoute);

app.get('/health', (req, res) => {
    res.status(200).json({ message: "Server is healthy" });
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});