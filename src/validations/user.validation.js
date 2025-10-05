import Joi from "joi";

// User profile update validation
export const updateProfileSchema = Joi.object({
    fullName: Joi.string()
        .trim()
        .min(2)
        .max(50)
        .optional(),

    userName: Joi.string()
        .trim()
        .lowercase()
        .min(3)
        .max(30)
        .optional(),
});

// User ID validation (for params)
export const userIdSchema = Joi.object({
    id: Joi.string()
        .pattern(new RegExp('^[0-9a-fA-F]{24}$'))
        .required()
        .messages({
            'string.pattern.base': 'Invalid user ID format',
            'string.empty': 'User ID is required'
        })
});

// Query parameters validation
export const querySchema = Joi.object({
    page: Joi.number()
        .integer()
        .min(1)
        .default(1)
        .optional(),

    limit: Joi.number()
        .integer()
        .min(1)
        .max(100)
        .default(10)
        .optional(),

    sort: Joi.string()
        .valid('name', 'email', 'createdAt', 'updatedAt', '-name', '-email', '-createdAt', '-updatedAt')
        .default('-createdAt')
        .optional(),

    search: Joi.string()
        .trim()
        .max(100)
        .optional()
        .messages({
            'string.max': 'Search term cannot exceed 100 characters'
        })
});
