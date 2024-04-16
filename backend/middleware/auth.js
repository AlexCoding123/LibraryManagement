const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "Unauthorized, verify token exists" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Token does not exist" });
    }

    jwt.verify(token, 'secret', (err, decoded) => {
        if (err) {
            return res.status(400).json({ message: `Cannot verify JWT token: ${err.message}` });
        }

        // Pass decoded user information to the next middleware
        req.user = decoded;
        next();
    });
};

