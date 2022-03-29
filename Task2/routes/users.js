const { check } = require('express-validator');
const {
  getUsers,
  addUser,
  deleteUser,
} = require('../controllers/UserController');
const express = require('express');
const router = express.Router();

router.get('/', getUsers);

router.post(
  '/',
  [
    check('username', 'Username is required').not().isEmpty(),
    check('email', 'Email is required').not().isEmpty(),
    check('birthdate', 'Birthdate is required').not().isEmpty(),
  ],
  addUser
);

router.delete('/:id', deleteUser);

module.exports = router;
