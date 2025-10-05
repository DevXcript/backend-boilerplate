
import { userService } from "../services/index.js";
import { ApiResponse, ApiError } from "../utils/index.js";

// Get profile
export const getProfile = async (req, res) => {
    try {
        const user = await userService.getProfile(req.user._id);

        res.status(200).json(
            new ApiResponse(200, { user }, "Profile fetched successfully")
        );
    } catch (error) {
        throw new ApiError(error.statusCode || 400, error.message);
    }
};

// Update profile
export const updateProfile = async (req, res) => {
    try {
        const user = await userService.updateProfile(req.user._id, req.body);

        res.status(200).json(
            new ApiResponse(200, { user }, "Profile updated successfully")
        );
    } catch (error) {
        throw new ApiError(error.statusCode || 400, error.message);
    }
};
