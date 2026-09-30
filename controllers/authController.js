const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

exports.register = async (req, res) => {
  try {

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email et mot de passe requis' });
    }

    const user = await User.create({ email, password });
    res.status(201).json({ id: user.id, email: user.email });

  } 
  catch (error) {

    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ message: 'Email déjà utilisé' });
    }
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email et mot de passe requis' });
    }

    const user = await User.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Identifiants invalides' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '5m' });
    res.status(200).json({ token });

  } 
  catch (error) {
    res.status(500).json({ message: error.message });
  }
};