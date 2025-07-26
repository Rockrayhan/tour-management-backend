import { NextFunction, Request, Response } from "express";
import AppError from "../errorHelpers/AppError";
import { verifyToken } from "../ultis/jwt";
import { JwtPayload } from "jsonwebtoken";

export const checkAuth = (...authRoles : string[]) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accessToken = req.headers.authorization;

      if (!accessToken) {
        throw new AppError(403, "no token received");
      }
      const verifiedToken = verifyToken(accessToken, "secret") as JwtPayload;
      // provide data from .env  1. secret 
      if (!authRoles.includes(verifiedToken.role)) {
        throw new AppError(403, "You are not permitted to view this route !!!");
      }
      console.log(verifiedToken);
      next();


    } catch (error) {
      console.log(error);
      next(error);
    }
  }