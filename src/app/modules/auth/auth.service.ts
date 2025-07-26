import AppError from "../../errorHelpers/AppError";
import httpStatus from "http-status-codes" ;
import bcryptjs from "bcryptjs" ;
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import jwt, { Secret } from "jsonwebtoken" ;
import { generateToken } from "../../ultis/jwt";


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

  const jwtPayload = {
    userId : isUserExist._id,
    email: isUserExist.email,
    role: isUserExist.role
  }

  const accessToken = generateToken(jwtPayload, "secret", "1d" )
  // provide data from .env  1. secret, 2.expire date 




  return {
    // email : isUserExist.email
    accessToken
  };
};

export const AuthServices = {
    credentialsLogin
}