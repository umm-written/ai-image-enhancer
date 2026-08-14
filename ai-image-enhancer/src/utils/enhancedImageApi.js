import axios from "axios";

const BACKEND_URL = "https://ai-image-enhancer-py6u.onrender.com";

export const enhancedImageAPI = async (file) => {
    try {
        const formData = new FormData();
        formData.append("image", file);

        const { data } = await axios.post(
            `${BACKEND_URL}/api/enhance`,
            formData
        );

        console.log("Task ID:", data.taskId);

        const enhancedImageData = await pollForEnhancedImage(data.taskId);

        console.log("Enhanced Image Data:", enhancedImageData);

        return enhancedImageData;

    } catch (error) {
        console.log(
            "Error enhancing image:",
            error.response?.data || error.message
        );

        throw error;
    }
};

const pollForEnhancedImage = async (taskId, retries = 0) => {
    const result = await fetchEnhancedImage(taskId);

    if (result.state === 4) {
        console.log(`Processing... (${retries}/20)`);

        if (retries >= 20) {
            throw new Error(
                "Max retries reached. Please try again later."
            );
        }

        await new Promise((resolve) => setTimeout(resolve, 2000));

        return pollForEnhancedImage(taskId, retries + 1);
    }

    console.log("Enhanced Image URL:", result);

    return result;
};

const fetchEnhancedImage = async (taskId) => {
    const { data } = await axios.get(
        `${BACKEND_URL}/api/enhance/${taskId}`
    );

    if (!data?.data) {
        throw new Error(
            "Failed to fetch enhanced image! Image not found."
        );
    }

    return data.data;
};