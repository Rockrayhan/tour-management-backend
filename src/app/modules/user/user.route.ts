import { Router } from "express";
import { createUserZodSchema } from "./user.validation";
import { validateRequest } from "../../middlewares/validateRequet";
import { Role } from "../user/user.interface";
import { UserControllers } from "./user.controller";
import { checkAuth } from "../../middlewares/checkAuth";


const router = Router();




router.post("/register", validateRequest(createUserZodSchema) , UserControllers.createUser );
// router.get("/all-users", UserControllers.getAllUsers);


router.get("/all-users", checkAuth(Role.ADMIN, Role.SUPER_ADMIN) , UserControllers.getAllUsers );

export const UserRoutes = router;
