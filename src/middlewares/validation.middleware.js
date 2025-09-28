import { ApiError } from "../utils/index.js";

export const validate = (schema, source = 'body') => {
    return (req, res, next) => {
        const dataToValidate = req[source];

        const { error, value } = schema.validate(dataToValidate, {
            abortEarly: false,
            allowUnknown: true,
            stripUnknown: true
        });

        if (error) {
            const errorDetails = error.details.map(detail => ({
                field: detail.path.join('.'),
                message: detail.message,
                value: detail.context.value
            }));

            const validationError = new ApiError(400, 'Validation Error');
            validationError.details = errorDetails;
            return next(validationError);
        }

        req[source] = value;
        next();
    };
};

export const validateBody = (schema) => validate(schema, 'body');

export const validateParams = (schema) => validate(schema, 'params');

export const validateQuery = (schema) => validate(schema, 'query');

export const validateHeaders = (schema) => validate(schema, 'headers');
