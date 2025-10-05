import Joi from "joi";

// User registration validation
export const registerSchema = Joi.object({
    fullName: Joi.string()
        .trim()
        .min(2)
        .max(50)
        .required()
        .messages({
            'string.empty': 'Full name is required',
            'string.min': 'Full name must be at least 2 characters long',
            'string.max': 'Full name cannot exceed 50 characters'
        }),

    userName: Joi.string()
        .trim()
        .lowercase()
        .min(3)
        .max(30)
        .required()
        .messages({
            'string.empty': 'Username is required',
            'string.min': 'Username must be at least 3 characters long',
            'string.max': 'Username cannot exceed 30 characters'
        }),

    email: Joi.string()
        .email()
        .lowercase()
        .trim()
        .required()
        .messages({
            'string.email': 'Please provide a valid email address',
            'string.empty': 'Email is required'
        }),

    password: Joi.string()
        .min(6)
        .max(128)
        .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)'))
        .required()
        .messages({
            'string.min': 'Password must be at least 6 characters long',
            'string.max': 'Password cannot exceed 128 characters',
            'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, and one number',
            'string.empty': 'Password is required'
        }),
    user_type: Joi.string()
        .valid('client', 'consultant', 'admin')
        .default('client')
        .messages({
            'any.only': 'User type must be one of: client, consultant, admin'
        })
});

// User login validation
export const loginSchema = Joi.object({
    email: Joi.string()
        .email()
        .lowercase()
        .trim()
        .required()
        .messages({
            'string.email': 'Please provide a valid email address',
            'string.empty': 'Email is required'
        }),

    password: Joi.string()
        .required()
        .messages({
            'string.empty': 'Password is required'
        })
});

// Refresh token validation
export const refreshTokenSchema = Joi.object({
    refreshToken: Joi.string()
        .required()
        .messages({
            'string.empty': 'Refresh token is required'
        })
});

// Password change validation (for future use)
export const changePasswordSchema = Joi.object({
    currentPassword: Joi.string()
        .required()
        .messages({
            'string.empty': 'Current password is required'
        }),

    newPassword: Joi.string()
        .min(6)
        .max(128)
        .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)'))
        .required()
        .messages({
            'string.min': 'New password must be at least 6 characters long',
            'string.max': 'New password cannot exceed 128 characters',
            'string.pattern.base': 'New password must contain at least one uppercase letter, one lowercase letter, and one number',
            'string.empty': 'New password is required'
        }),

    confirmPassword: Joi.string()
        .valid(Joi.ref('newPassword'))
        .required()
        .messages({
            'any.only': 'Confirm password must match new password',
            'string.empty': 'Confirm password is required'
        })
});
