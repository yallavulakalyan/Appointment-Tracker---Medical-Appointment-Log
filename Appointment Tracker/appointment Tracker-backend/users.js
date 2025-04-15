const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

let users = [];  // In-memory user store (for simplicity)

const register = (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = { email, password: hashedPassword };
  users.push(newUser);
  const token = jwt.sign({ email }, 'secretkey');
  res.json({ token });
};

const login = (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign({ email }, 'secretkey');
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};

module.exports = { register, login };
