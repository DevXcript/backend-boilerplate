
import { User } from "../models/index.js";
import { ApiError } from "../utils/index.js";

export async function getProfile(userId) {
    const user = await User.findById(userId).select("-password -refreshToken");
    if (!user) {
        throw new ApiError(404, "User not found");
    }
    return user;
}

export async function updateProfile(userId, updateData) {
    const allowedFields = ["name", "phone", "language_preference"];
    const updates = {};

    for (let field of allowedFields) {
        if (updateData[field] !== undefined) {
            updates[field] = updateData[field];
        }
    }

    const user = await User.findByIdAndUpdate(
        userId,
        { $set: updates },
        { new: true, runValidators: true }
    ).select("-password -refreshToken");

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    return user;
}
