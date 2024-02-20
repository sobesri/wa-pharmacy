import express from "express";
import customerController from "../controllers/customerController.js";
const customerRouter = express.Router();

customerRouter.get('/', customerController.getAllCustomers);
customerRouter.get('/:id', customerController.getCustomerById);
customerRouter.post('/', customerController.createCustomer);
customerRouter.put('/:id', customerController.updateCustomer);
customerRouter.put('/:id/archive', customerController.archiveCustomer);
customerRouter.delete('/:id/delete', customerController.deleteCustomer);

export default customerRouter;
