import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import axios from "axios";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

const upload = multer({ storage: multer.memoryStorage() });

const API_KEY = process.env.API_KEY;
const BASE_URL = "https://techhk.aoscdn.com";

app.get("/", (req, res) => {
    res.json({ message: "AI Image Enhancer Backend is running!" });
});

app.post("/api/enhance", upload.single("image"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                error: "No image uploaded."
            });
        }

        const formData = new FormData();

        formData.append(
            "image_file",
            new Blob([req.file.buffer]),
            req.file.originalname
        );

        const response = await axios.post(
            `${BASE_URL}/api/tasks/visual/scale`,
            formData,
            {
                headers: {
                    "X-API-KEY": API_KEY
                }
            }
        );

        const taskId = response.data?.data?.task_id;

        if (!taskId) {
            return res.status(500).json({
                error: "Task ID not received from TechHK."
            });
        }

        console.log("Task created:", taskId);

        res.json({
            taskId
        });

    } catch (error) {
        console.error(
            "TechHK upload error:",
            error.response?.data || error.message
        );

        res.status(500).json({
            error: "Failed to upload image for enhancement."
        });
    }
});

app.get("/api/enhance/:taskId", async (req, res) => {
    try {
        const { taskId } = req.params;

        const response = await axios.get(
            `${BASE_URL}/api/tasks/visual/scale/${taskId}`,
            {
                headers: {
                    "X-API-KEY": API_KEY
                }
            }
        );

        res.json({
            data: response.data?.data
        });

    } catch (error) {
        console.error(
            "TechHK fetch error:",
            error.response?.data || error.message
        );

        res.status(500).json({
            error: "Failed to fetch enhanced image."
        });
    }
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Backend running on port ${PORT}`);
});