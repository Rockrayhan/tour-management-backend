import { Router } from "express";
import { createUserZodSchema, updateUserZodSchema } from "./user.validation";
import { validateRequest } from "../../middlewares/validateRequet";
import { Role } from "../user/user.interface";
import { UserControllers } from "./user.controller";
import { checkAuth } from "../../middlewares/checkAuth";


const router = Router();




router.post("/register", validateRequest(createUserZodSchema) , UserControllers.createUser );
router.patch("/:id", validateRequest(updateUserZodSchema), checkAuth(...Object.values(Role)), UserControllers.updateUser)
router.get("/all-users", checkAuth(Role.ADMIN, Role.SUPER_ADMIN) , UserControllers.getAllUsers );

export const UserRoutes = router;
