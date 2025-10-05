import { ApiError } from "../utils/index.js";

export function isAdmin(req, _res, next) {
    const role = req.user?.user_type;
    if (!req.user) return next(new ApiError(401, "Unauthorized"));
    if (role !== "admin") return next(new ApiError(403, "Forbidden: admin only"));
    next();
}


