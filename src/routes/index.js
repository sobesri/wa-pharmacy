import express from "express";
import userController from "../controllers/userController.js";
const router = express.Router();


// Define routes and associate them with controller methods
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
// router.post('/customers', customerController.createCustomer);
// router.put('/customers/:id', customerController.updateCustomer);
// router.delete('/customers/:id', customerController.deleteCustomer);

export default router;
