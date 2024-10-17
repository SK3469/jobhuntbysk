import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token; // Ensure token is being set in cookies
        if (!token) {
            return res.status(401).json({
                message: "Unauthorized Request: No token provided",
                success: false,
            });
        }

        const decode = await jwt.verify(token, process.env.SECRET_KEY);
        if (!decode || !decode.userId) {
            return res.status(401).json({
                message: "Invalid Token or Authentication Error",
                success: false,
            });
        }

        // Attaching the decoded userId to the request object
        req.id = decode.userId;
        next(); // Proceed to the next middleware or route handler

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server error during authentication",
            success: false,
            error: error.message // Optional, for more detailed error reporting
        });
    }
};

export default isAuthenticated;
