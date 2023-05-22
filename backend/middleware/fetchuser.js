const jwt = require('jsonwebtoken');
const JWT_SECRET = 'imran@3';

const fetchuser = (req, res, next) => {
  const token = req.headers['auth-token'];
  if (!token) {
    res.status(401).json({ error: 'Please authenticate using a valid token' });
    return;
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Please authenticate using a valid token' });
  }
};

module.exports = fetchuser;
