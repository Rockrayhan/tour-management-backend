import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { catchAsync } from "../../ultis/catchAsync";
import { sendResponse } from "../../ultis/SendResponse";
import { AuthServices } from "./auth.service";
import AppError from "../../errorHelpers/AppError";
import { setAuthCookie } from "../../ultis/setCookie";

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


const getNewAccessToken = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        throw new AppError(httpStatus.BAD_REQUEST, "No refresh token recieved from cookies")
    }
    const tokenInfo = await AuthServices.getNewAccessToken(refreshToken as string)


    setAuthCookie(res, tokenInfo);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "New Access Token Retrived Successfully",
        data: tokenInfo,
    })
})



export const AuthControllers = {
    credentialsLogin,
    getNewAccessToken
}
