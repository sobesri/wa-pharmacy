import User from '../models/User.js';

const userController = {
  getAllUsers: async (req = {}, res) => {
    try {
      const users = await User.getAll(req.query || {});
      res.json(users);
    } catch (err) {
      console.log('error', err);
      res.status(500);
      res.json({ error: err })
    }
  },
  getUserById: async (req, res) => {
    try {
      const user = await User.getById(req.params.id);
      res.json(user);
    } catch (err) {
      res.status(500);
      res.json({ error: err })
    }
  },
  createUser: async (req, res) => {
    try {
      const newUser = await User.insert(req.body);
      res.json(newUser);
    } catch (err) {
      res.status(500);
      res.json({ error: err })
    }
  },
  updateUser: async (req, res) => {
    try {
      const updatedUser = await User.update(req.params.id, req.body);
      res.json(updatedUser);
    } catch (err) {
      res.status(500);
      res.json({ error: err })
    }
  },
  archiveUser: async (req, res) => {
    try {
      await User.delete(req.params.id, true);
      res.status(204).end();
    } catch (err) {
      res.status(500);
      res.json({ error: err })
    }
  },
  deleteUser: async (req, res) => {
    try {
      await User.delete(req.params.id, false);
      res.status(204).end();
    } catch (err) {
      res.status(500);
      res.json({ error: err })
    }
  },
};

export default userController;
