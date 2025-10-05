// Export all middlewares
import { auth } from "./auth.middleware.js";
import errorHandler from "./error.middleware.js";
import notFoundHandler from "./notFound.middleware.js";
import { validate, validateBody, validateParams, validateQuery, validateHeaders } from "./validation.middleware.js";
import { sanitize } from "./sanitize.middleware.js";
import { isAdmin } from "./isAdmin.middleware.js";

export {
    auth,
    errorHandler,
    notFoundHandler,
    sanitize,
    isAdmin,
    validate,
    validateBody,
    validateParams,
    validateQuery,
    validateHeaders
};

// Default export for convenience
export default {
    auth,
    errorHandler,
    notFoundHandler,
    sanitize,
    isAdmin,
    validate,
    validateBody,
    validateParams,
    validateQuery,
    validateHeaders
};
