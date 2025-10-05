function isPlainObject(value) {
    return Object.prototype.toString.call(value) === "[object Object]";
}

function deepSanitize(obj) {
    if (!obj || typeof obj !== "object") return obj;

    if (Array.isArray(obj)) {
        for (let i = 0; i < obj.length; i++) {
            obj[i] = deepSanitize(obj[i]);
        }
        return obj;
    }

    if (isPlainObject(obj)) {
        for (const key of Object.keys(obj)) {
            if (key.startsWith("$") || key.includes(".")) {
                delete obj[key];
                continue;
            }
            obj[key] = deepSanitize(obj[key]);
        }
    }
    return obj;
}

export function sanitize(req, _res, next) {
    if (req.body) deepSanitize(req.body);
    if (req.params) deepSanitize(req.params);
    if (req.query) deepSanitize(req.query);
    next();
}


