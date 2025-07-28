import jwt ,{ JwtPayload, SignOptions } from "jsonwebtoken";


export const generateToken = ( payload: JwtPayload, secret: string, expiresIn: string ) => {
    const token = jwt.sign(payload, secret, {
        expiresIn
    }as SignOptions )

    return token
}

export const verifyToken = ( token: string, secret: string ) => {
    const verifiedToken = jwt.verify(token, secret) ;

    return verifiedToken
}




// import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
// import { envVars } from "../config/env";

// // ✅ Generate token
// export const generateToken = (
//   payload: JwtPayload,
//   expiresIn: string
// ) => {
//   const secret = envVars.JWT_ACCESS_SECRET;
//   return jwt.sign(payload, secret, { expiresIn } as SignOptions);
// };

// // ✅ Verify token
// export const verifyToken = (token: string) => {
//   const secret = envVars.JWT_ACCESS_SECRET;
//   return jwt.verify(token, secret);
// };
