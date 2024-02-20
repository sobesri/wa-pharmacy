import express from "express";
import medicineController from "../controllers/medicineController.js";
const medicineRouter = express.Router();

medicineRouter.get('/', medicineController.getAllMedicines);
medicineRouter.get('/:id', medicineController.getMedicineById);
medicineRouter.post('/', medicineController.createMedicine);
medicineRouter.put('/:id', medicineController.updateMedicine);
medicineRouter.put('/:id/archive', medicineController.archiveMedicine);
medicineRouter.delete('/:id/delete', medicineController.deleteMedicine);

export default medicineRouter;
