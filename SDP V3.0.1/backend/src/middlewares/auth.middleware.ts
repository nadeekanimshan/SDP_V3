import { Request, Response, NextFunction } from "express";
import { TokenService } from "../utils/token";

const tokenService = new TokenService({
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET!,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET!,
  accessTokenExpiresIn: 3600, // 1 hour
  refreshTokenExpiresIn: 86400 // 1 day
});

const openRoutes = ["/api/auth/login", "/api/auth/register","/api/auth/refresh-token","/api/events","/api/auth/type"];

// 🔐 Authentication middleware
export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    if (openRoutes.includes(req.path)) {
        next();
        return;
    }
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
     res.status(401).json({ message: "Unauthorized" });
     return;
  }

  const token = authHeader.split(" ")[1];
  const payload = tokenService.verifyAccessToken(token);

  if (!payload) {
     res.status(401).json({ message: "Invalid or expired token" });
     return;
  }

  req.user = payload;
  next();
};

// 🔐 Role-based authorization middleware
export const authorize = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
       res.status(401).json({ message: "Unauthorized" });
       return;
    }

    if (!roles.includes(req.user.role || "")) {
      res.status(403).json({ message: "Forbidden: Access Denied" });
      return;
    }

    next();
  };
};
