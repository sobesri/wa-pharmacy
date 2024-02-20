import User from '../models/User.js';

const userController = {
  getAllUsers: async (req = {}, res) => {
    try {
      const users = await User.getAll(req.query || {});
      res.json(users);
    } catch (err) {
      res.status(500);
      res.json({ error: err })
    }
  },
  getUserById: async (req, res) => {
    try {
      const user = await User.getById(req.params.id);
      if (user) {
        res.json(user);
      } else {
        res.status(404);
        res.json({ error: 'User not found' })
      }
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
  updateUserRole: async (req, res) => {
    try {
      const updatedUser = await User.updateRole(req.params.id, req.body.role);
      res.json(updatedUser);
    } catch (err) {
      res.status(500);
      res.json({ error: err })
    }
  },
  logIn: async (req, res) => {
    try {
      const access = await User.authenticate(req.query);

      if (access.error) {
        res.status(access.code);
        res.json({ error: access.error })
      } else {
        res.json(access);
      }
    } catch (err) {
      res.status(500);
      res.json({ error: err })
    }
  },
};

export default userController;
