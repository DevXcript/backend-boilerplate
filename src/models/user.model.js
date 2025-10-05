import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { env } from "../config/index.js";
import { hashPassword, comparePassword } from "../helper/auth.helper.js";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: 6,
            select: false,
        },
        refreshToken: {
            type: String,
            default: null,
            select: false,
        },
        user_type: {
            type: String,
            enum: ["client", "consultant", "admin"],
            default: "client",
        },
        phone: {
            type: String,
            trim: true,
        },
        language_preference: {
            type: String,
            enum: ["english", "spanish", "french"],
            default: "english",
        },
    },
    { timestamps: true }
);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await hashPassword(this.password);
    next();
});

userSchema.methods.comparePassword = function (candidatePassword) {
    return comparePassword(candidatePassword, this.password);
};

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        { id: this._id, role: this.user_type },
        env.JWT_ACCESS_SECRET,
        { expiresIn: env.JWT_ACCESS_EXPIRES || "15m" }
    );
};

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        { id: this._id },
        env.JWT_REFRESH_SECRET,
        { expiresIn: env.JWT_REFRESH_EXPIRES || "7d" }
    );
};

const User = mongoose.model("User", userSchema);
export default User;
