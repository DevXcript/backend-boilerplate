// Export all validation schemas
export * from "./auth.validation.js";
export * from "./user.validation.js";

// Default export for convenience
import * as authValidation from "./auth.validation.js";
import * as userValidation from "./user.validation.js";

export default {
    auth: authValidation,
    user: userValidation
};
