import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { catchAsync } from "../../ultis/catchAsync";
import { sendResponse } from "../../ultis/SendResponse";
import { AuthServices } from "./auth.service";

const credentialsLogin = catchAsync( async (req: Request, res: Response, next: NextFunction) => {
    
    const loginInfo = await AuthServices.credentialsLogin(req.body)

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "User Logged Successfully",
      data: loginInfo,
    });
  }
);

export const AuthControllers = {
    credentialsLogin
}
