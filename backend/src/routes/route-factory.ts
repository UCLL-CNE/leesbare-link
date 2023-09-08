import { NextFunction, Request, Response } from "express";
import { CustomError } from "../domain/custom-error";
import { UserService } from "../service/user-service";

export const errorHandler = (error: unknown, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(error);
  }
  if ((error as any).code) {
    const cError = error as CustomError;
    res.status(cError.code).json({ message: cError.message });
  } else {
    res.status(500).json({ message: (error as Error).message });
  }
}

export const unauthenticatedRoute = async (req: Request, res: Response, next: NextFunction) => {
  if (req.headers.authorization) {
    next(CustomError.authenticated("Must be unauthenticated to perform this action."));
  } else {
    next();
  }
}

export const authenticatedRoute = async (req: Request, res: Response, next: NextFunction) => {
  const b64auth = (req.headers.authorization || '').split(' ')[1] || ''
  const [email, password] = Buffer.from(b64auth, 'base64').toString().split(':')

  if (email && password) {
    try {
      const user = await UserService.getInstance().getUser(email);
      await user.validate(password);
      req.user = user.toSimpleUser();
      return next()
    } catch (error) {
      return next(CustomError.unauthenticated("Not authenticated."));
    }
  } else {
    next(CustomError.unauthenticated("Not authenticated."));
  }
}

export const wrapRoute = (handler: () => Promise<void>, next: NextFunction) => {
  handler().catch(next);
}