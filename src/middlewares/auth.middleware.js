// auth.middleware.js
import jwt from "jsonwebtoken";
import { User } from "../models/index.js";
import { ApiError } from "../utils/index.js";
import { env } from "../config/index.js";

export const auth = async (req, _res, next) => {
    const cookieToken = req.signedCookies?.accessToken || req.cookies?.accessToken;
    const bearer = req.headers.authorization;
    const bearerToken = bearer?.startsWith("Bearer ") ? bearer.slice(7) : null;
    const token = cookieToken || bearerToken;

    if (!token) return next(new ApiError(401, "Unauthorized: token missing"));

    try {
        const decoded = jwt.verify(token, env.JWT_ACCESS_SECRET, { algorithms: ["HS256"] });
        const userId = decoded.id || decoded.sub || decoded._id;
        if (!userId) throw new ApiError(401, "Invalid token payload");

        const user = await User.findById(userId).select("-password -refreshToken");
        if (!user) throw new ApiError(401, "User not found");

        req.user = user.toObject ? user.toObject() : user;
        next();
    } catch {
        next(new ApiError(401, "Invalid or expired token"));
    }
};
