import express from "express";
import userController from "../controllers/userController.js";
import verifyToken from "../middleware/auth.middleware.js";
import verifyUserRole from "../middleware/userRole.middleware.js";
import { USER_ROLES } from "../../constants.js";

const userRouter = express.Router();
const { OWNER } = USER_ROLES;

userRouter.get('/login', userController.logIn);
userRouter.get('/', verifyToken, userController.getAllUsers);
userRouter.get('/:id', verifyToken, userController.getUserById);
userRouter.post('/', verifyToken, verifyUserRole([OWNER]), userController.createUser);
userRouter.put('/:id', verifyToken, verifyUserRole([OWNER]), userController.updateUser);
userRouter.put('/:id/role', verifyToken, verifyUserRole([OWNER]), userController.updateUserRole);
userRouter.put('/:id/archive', verifyToken, verifyUserRole([OWNER]), userController.archiveUser);
userRouter.delete('/:id', verifyToken, verifyUserRole([OWNER]), userController.deleteUser);

export default userRouter;
