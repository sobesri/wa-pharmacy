import Customer from '../models/Customer.js';

const customerController = {
  getAllCustomers: async (req, res) => {
    try {
      const customers = await Customer.getAll(req.body);
      res.json(customers);
    } catch (err) {
      res.status(500);
      res.json({ error: err })
    }
  },
  getCustomerById: async (req, res) => {
    try {
      const customer = await Customer.getById(req.params.id);
      res.json(customer);
    } catch (err) {
      res.status(500);
      res.json({ error: err })
    }
  },
  createCustomer: async (req, res) => {
    try {
      const newCustomer = await Customer.insert(req.body);
      res.json(newCustomer);
    } catch (err) {
      res.status(500);
      res.json({ error: err })
    }
  },
  updateCustomer: async (req, res) => {
    try {
      const updatedCustomer = await Customer.update(req.params.id, req.body);
      res.json(updatedCustomer);
    } catch (err) {
      res.status(500);
      res.json({ error: err })
    }
  },
  archiveCustomer: async (req, res) => {
    try {
      // Soft delete customer
      await Customer.delete(req.params.id, true);
      res.status(204).end();
    } catch (err) {
      res.status(500);
      res.json({ error: err })
    }
  },
  deleteCustomer: async (req, res) => {
    try {
      await Customer.delete(req.params.id, false);
      res.status(204).end();
    } catch (err) {
      res.status(500);
      res.json({ error: err })
    }
  },
};

export default customerController;
