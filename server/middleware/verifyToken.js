import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];    
    if (!token) {
      return res.status(401).json({
        message: "You are not authorized.",
      });
    }
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded; // Attach the decoded token data (e.g., user id) to the request object
    // console.log(decoded);

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.log(error);
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        message: "Session Expired!",
      });
    }
    return res.status(500).json({
      message: "Failed to authenticate token due to an internal error.",
      error,
    });
  }
};
