import express from "express";
import customerController from "../controllers/customerController.js";
import verifyToken from "../middleware/auth.middleware.js";
import verifyUserRole from "../middleware/userRole.middleware.js";
import { USER_ROLES } from "../../constants.js";

const customerRouter = express.Router();
const { OWNER, MANAGER, CASHIER } = USER_ROLES;

customerRouter.get('/', verifyToken, customerController.getAllCustomers);
customerRouter.get('/:id', verifyToken, customerController.getCustomerById);
customerRouter.post('/', verifyToken, verifyUserRole([OWNER]), customerController.createCustomer);
customerRouter.put('/:id', verifyToken, verifyUserRole([OWNER, MANAGER, CASHIER]), customerController.updateCustomer);
customerRouter.put('/:id/archive', verifyToken, verifyUserRole([OWNER, MANAGER]), customerController.archiveCustomer);
customerRouter.delete('/:id', verifyToken, verifyUserRole([OWNER]), customerController.deleteCustomer);

export default customerRouter;
