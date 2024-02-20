import express from "express";
import userController from "../controllers/userController.js";
const userRouter = express.Router();

userRouter.get('/login', userController.logIn);
userRouter.get('/', userController.getAllUsers);
userRouter.get('/:id', userController.getUserById);
userRouter.post('/', userController.createUser);
userRouter.put('/:id', userController.updateUser);
userRouter.put('/:id/role', userController.updateUserRole);
userRouter.put('/:id/archive', userController.archiveUser);
userRouter.delete('/:id/delete', userController.deleteUser);

export default userRouter;