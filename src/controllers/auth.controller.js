import { authService } from "../services/index.js";
import { ApiResponse, ApiError } from "../utils/index.js";
import { env } from "../config/index.js";

// Register
export const register = async (req, res) => {
    const { fullName, userName, email, password, user_type } = req.body;

    try {
        const result = await authService.registerUser({
            fullName, userName, email, password, user_type
        });

        res.status(201).json(
            new ApiResponse(201, {
                user: {
                    id: result.user._id,
                    fullName: result.user.fullName,
                    userName: result.user.userName,
                    email: result.user.email,
                    user_type: result.user.user_type,
                }
            }, "Registration successful")
        );
    } catch (error) {
        throw new ApiError(400, error.message);
    }
};

// Login
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const { user, accessToken, refreshToken } = await authService.loginUser({ email, password });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 15 * 60 * 1000,
        });

        res.status(200).json(
            new ApiResponse(200, {
                user: {
                    id: user._id,
                    fullName: user.fullName,
                    userName: user.userName,
                    email: user.email,
                    user_type: user.user_type,
                },
                accessToken,
                refreshToken,
            }, "Login successful")
        );
    } catch (error) {
        throw new ApiError(400, error.message);
    }
};

// Refresh Token
export const refreshToken = async (req, res) => {
    try {
        const { refreshToken } = req.cookies || req.body;

        const { accessToken } = await authService.refreshAccessToken(refreshToken);

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 15 * 60 * 1000,
        });

        res.status(200).json(
            new ApiResponse(200, { accessToken }, "Token refreshed successfully")
        );
    } catch (error) {
        throw new ApiError(401, error.message);
    }
};

// Logout
export const logout = async (req, res) => {
    try {
        // Clear cookies
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");

        // Clear refresh token from database
        if (req.user) {
            await authService.logout(req.user._id);
        }

        res.status(200).json(
            new ApiResponse(200, null, "Logged out successfully")
        );
    } catch (error) {
        throw new ApiError(400, error.message);
    }
};
