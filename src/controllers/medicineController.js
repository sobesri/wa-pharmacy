import Medicine from '../models/Medicine.js';

const medicineController = {
  getAllMedicines: async (req, res) => {
    try {
      const medicines = await Medicine.getAll(req.body);
      res.json(medicines);
    } catch (err) {
      res.status(500);
      res.json({ error: err })
    }
  },
  getMedicineById: async (req, res) => {
    try {
      const medicine = await Medicine.getById(req.params.id);
      res.json(medicine);
    } catch (err) {
      res.status(500);
      res.json({ error: err })
    }
  },
  createMedicine: async (req, res) => {
    try {
      const newMedicine = await Medicine.insert(req.body);
      res.json(newMedicine);
    } catch (err) {
      res.status(500);
      res.json({ error: err })
    }
  },
  updateMedicine: async (req, res) => {
    try {
      const updatedMedicine = await Medicine.update(req.params.id, req.body);
      res.json(updatedMedicine);
    } catch (err) {
      res.status(500);
      res.json({ error: err })
    }
  },
  archiveMedicine: async (req, res) => {
    try {
      // Soft delete medicine
      await Medicine.delete(req.params.id, true);
      res.status(204).end();
    } catch (err) {
      res.status(500);
      res.json({ error: err })
    }
  },
  deleteMedicine: async (req, res) => {
    try {
      await Medicine.delete(req.params.id, false);
      res.status(204).end();
    } catch (err) {
      res.status(500);
      res.json({ error: err })
    }
  },
};

export default medicineController;
