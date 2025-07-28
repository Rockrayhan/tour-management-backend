import { Router } from "express";
import { AuthControllers } from "./auth.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";


const router = Router();

router.post("/login", AuthControllers.credentialsLogin);
router.post("/refresh-token", AuthControllers.getNewAccessToken)
router.post("/logout", AuthControllers.logout)
router.post("/reset-password", checkAuth(...Object.values(Role)), AuthControllers.resetPassword)


// http://localhost:5000/api/v1/auth/login

 /* 1. app.ts
 app.use("/api/v1", router) */

 /* 2. router - index.ts
    {
     path: "/auth",
     route: AuthRoutes,
    }, 
    
*/


  /*3. route.ts
    router.post("/login", AuthControllers.credentialsLogin);
  */

export const AuthRoutes = router;
