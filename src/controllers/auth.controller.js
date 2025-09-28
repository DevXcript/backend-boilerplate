import AuthService from "../services/auth.service.js";
import { ApiResponse, ApiError } from "../utils/index.js";

// Register
export const register = async (req, res) => {
    const { name, email, password, user_type, phone, language_preference } = req.body;

    try {
        const result = await AuthService.registerUser({
            name, email, password, user_type, phone, language_preference
        });

        res.status(201).json(
            new ApiResponse(201, {
                user: {
                    id: result.user._id,
                    name: result.user.name,
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
        const { user, accessToken, refreshToken } = await AuthService.loginUser({ email, password });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 15 * 60 * 1000,
        });

        res.status(200).json(
            new ApiResponse(200, {
                user: {
                    id: user._id,
                    name: user.name,
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

        const { accessToken } = await AuthService.refreshAccessToken(refreshToken);

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
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
            await AuthService.logout(req.user._id);
        }

        res.status(200).json(
            new ApiResponse(200, null, "Logged out successfully")
        );
    } catch (error) {
        throw new ApiError(400, error.message);
    }
};
