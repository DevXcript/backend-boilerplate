import bcrypt from "bcryptjs";

export const hashPassword = async (password) => {
    return bcrypt.hash(password, 10);
};

export const comparePassword = async (password, hashed) => {
    return bcrypt.compare(password, hashed);
};

export const hashRefreshToken = async (token) => {
    return bcrypt.hash(token, 10);
};

export const compareRefreshToken = async (token, hashedToken) => {
    return bcrypt.compare(token, hashedToken);
};
