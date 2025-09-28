
import { User } from "../models/index.js";
import { hashPassword, comparePassword, hashRefreshToken, compareRefreshToken } from "../helper/auth.helper.js";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/index.js";
import { env } from "../config/index.js";

export default class AuthService {
    static async registerUser({ name, email, password, user_type, phone, language_preference }) {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new ApiError(400, "User already exists");
        }

        const hashedPassword = await hashPassword(password);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            user_type,
            phone,
            language_preference,
        });

        return { user };
    }

    static async loginUser({ email, password }) {
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            throw new ApiError(401, "Invalid email or password");
        }

        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) {
            throw new ApiError(401, "Invalid email or password");
        }

        const accessToken = jwt.sign(
            { _id: user._id, role: user.user_type },
            env.JWT_ACCESS_SECRET,
            { expiresIn: env.JWT_ACCESS_EXPIRES }
        );

        const refreshToken = jwt.sign(
            { _id: user._id },
            env.JWT_REFRESH_SECRET,
            { expiresIn: env.JWT_REFRESH_EXPIRES }
        );

        // Hash the refresh token before storing
        const hashedRefreshToken = await hashRefreshToken(refreshToken);
        user.refreshToken = hashedRefreshToken;
        await user.save({ validateBeforeSave: false });

        return { user, accessToken, refreshToken };
    }

    static async refreshAccessToken(refreshToken) {
        if (!refreshToken) {
            throw new ApiError(401, "Refresh token required");
        }

        let decoded;
        try {
            decoded = jwt.verify(refreshToken, env.JWT_REFRESH_SECRET);
        } catch (error) {
            throw new ApiError(401, "Invalid or expired refresh token");
        }

        const user = await User.findById(decoded._id).select("+refreshToken");
        if (!user) {
            throw new ApiError(401, "Invalid refresh token");
        }

        // Verify the refresh token matches the stored hashed version
        const isValidRefreshToken = await compareRefreshToken(refreshToken, user.refreshToken);
        if (!isValidRefreshToken) {
            throw new ApiError(401, "Invalid refresh token");
        }

        const newAccessToken = jwt.sign(
            { _id: user._id, role: user.user_type },
            env.JWT_ACCESS_SECRET,
            { expiresIn: env.JWT_ACCESS_EXPIRES }
        );

        return { accessToken: newAccessToken };
    }

    static async logout(userId) {
        const user = await User.findById(userId);
        if (user) {
            user.refreshToken = null;
            await user.save({ validateBeforeSave: false });
        }
        return true;
    }
}
