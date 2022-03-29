const { validationResult } = require('express-validator');

const User = require('../models/User');

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.json(users);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send('Server Error');
  }
};

const addUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { username, email, birthdate } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Email already been used' }] });
    }

    user = new User({
      username,
      email,
      birthdate,
    });

    await user.save();
    return res.json(user);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server error');
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    await user.remove();

    return res.json({ msg: 'User removed' });
  } catch (error) {
    console.error(error.message);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'User not found' });
    }
    return res.status(500).send('Server Error');
  }
};

module.exports = {
  getUsers,
  addUser,
  deleteUser,
};
