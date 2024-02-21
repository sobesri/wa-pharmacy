import express from "express";
import medicineController from "../controllers/medicineController.js";
import verifyToken from "../middleware/auth.middleware.js";
import verifyUserRole from "../middleware/userRole.middleware.js";
import { USER_ROLES } from "../../constants.js";

const medicineRouter = express.Router();
const { OWNER, MANAGER, CASHIER } = USER_ROLES;

medicineRouter.get('/', verifyToken, medicineController.getAllMedicines);
medicineRouter.get('/:id', verifyToken, medicineController.getMedicineById);
medicineRouter.post('/', verifyToken, verifyUserRole([OWNER]), medicineController.createMedicine);
medicineRouter.put('/:id', verifyToken, verifyUserRole([OWNER, MANAGER, CASHIER]), medicineController.updateMedicine);
medicineRouter.put('/:id/archive', verifyToken, verifyUserRole([OWNER, MANAGER]), medicineController.archiveMedicine);
medicineRouter.delete('/:id', verifyToken, verifyUserRole([OWNER]), medicineController.deleteMedicine);

export default medicineRouter;
