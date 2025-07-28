import AppError from "../../errorHelpers/AppError";
import httpStatus from "http-status-codes" ;
import bcryptjs from "bcryptjs" ;
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import { createNewAccessTokenWithRefreshToken, createUserTokens } from "../../ultis/userToken";
import { envVars } from "../../config/env";
import { JwtPayload } from "jsonwebtoken";


const credentialsLogin = async (payload: Partial<IUser>) => {
  const { email, password } = payload;

  const isUserExist = await User.findOne({email})

  if (!isUserExist) {
    throw new AppError(httpStatus.BAD_GATEWAY, "Email Does not Exists !")
  }

  const isPasswordMatched = await bcryptjs.compare(password as string, isUserExist.password as string)

  if ( !isPasswordMatched ) {
    throw new AppError(httpStatus.BAD_REQUEST, "Incorrect Password")
  }

  const userTokens = createUserTokens(isUserExist)

  const {password: pass, ...rest} = isUserExist.toObject() ;

  return {
    // email : isUserExist.email
    accessToken : userTokens.accessToken,
    refreshToken : userTokens.refreshToken,
    user : rest
  };
};


const getNewAccessToken = async (refreshToken: string) => {
    const newAccessToken = await createNewAccessTokenWithRefreshToken(refreshToken)

    return {
        accessToken: newAccessToken
    }

}



const resetPassword = async (oldPassword: string, newPassword: string, decodedToken: JwtPayload) => {

    const user = await User.findById(decodedToken.userId)

    const isOldPasswordMatch = await bcryptjs.compare(oldPassword, user!.password as string)
    if (!isOldPasswordMatch) {
        throw new AppError(httpStatus.UNAUTHORIZED, "Old Password does not match");
    }

    user!.password = await bcryptjs.hash(newPassword, Number(envVars.BCRYPT_SALT_ROUND))

    user!.save();


}

export const AuthServices = {
    credentialsLogin,
    getNewAccessToken,
    resetPassword
}