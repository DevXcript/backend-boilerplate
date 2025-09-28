import Joi from "joi";

// User profile update validation
export const updateProfileSchema = Joi.object({
    name: Joi.string()
        .trim()
        .min(2)
        .max(50)
        .optional()
        .messages({
            'string.min': 'Name must be at least 2 characters long',
            'string.max': 'Name cannot exceed 50 characters'
        }),

    phone: Joi.string()
        .trim()
        .pattern(new RegExp('^[+]?[1-9]\\d{1,14}$'))
        .optional()
        .allow('')
        .messages({
            'string.pattern.base': 'Please provide a valid phone number'
        }),

    language_preference: Joi.string()
        .valid('english', 'spanish', 'french')
        .optional()
        .messages({
            'any.only': 'Language preference must be one of: english, spanish, french'
        })
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
