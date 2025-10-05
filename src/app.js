import express from "express";
import cors from "cors";
import helmet from "helmet";
import xssClean from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";

import { notFoundHandler, errorHandler } from "./middlewares/index.js";
import routes from "./routes/index.js";
import { env } from "./config/index.js";

const app = express();

const allowedOrigins = (env.CORS_ORIGINS || env.CLIENT_URL || env.ADMIN_URL || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .concat(["http://localhost:3000", "http://localhost:3001"])
    .filter((v, i, arr) => arr.indexOf(v) === i);


app.use(
    cors({
        origin: (origin, cb) => {
            if (!origin) return cb(null, true);
            return allowedOrigins.includes(origin)
                ? cb(null, true)
                : cb(new Error(`CORS blocked: ${origin} is not in allowlist`));
        },
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    })
);

// helmet → browser protection via headers.
app.use(helmet());
// xssClean → block JavaScript injection.
app.use(xssClean());
// mongoSanitize → block database injection
app.use(mongoSanitize());

app.use(cookieParser(env.COOKIE_SECRET));
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));



if (env.NODE_ENV === "development") {
    try {
        const morgan = (await import("morgan")).default;
        app.use(morgan("dev"));
    } catch {
        console.warn("Morgan not installed; skipping logger");
    }
}

if (env.NODE_ENV === "production" || env.TRUST_PROXY === "1") {
    app.set("trust proxy", 1);
}

const limiter = rateLimit({
    windowMs: Number(env.RATE_LIMIT_WINDOW_MS ?? 15 * 60 * 1000),
    max: Number(env.RATE_LIMIT_MAX_REQUESTS ?? 100),
    standardHeaders: true,
    legacyHeaders: false,
    message: "Too many requests from this IP, please try again later.",
});
app.use("/api/v1", limiter);

app.use("/api/v1", routes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
