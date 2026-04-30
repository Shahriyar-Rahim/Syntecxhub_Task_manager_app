import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '30d' });
  
  // Set the cookie on the response object
  res.cookie('user-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  // CRITICAL: Return the token so it can be used in res.json()
  return token; 
};

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) return res.status(400).json({ message: 'User already exists' });

  const user = await User.create({ name, email, password });
  if (user) {
    // Corrected: pass 'res' and store the returned token
    const token = generateToken(res, user._id); 
    res.status(201).json({ 
      _id: user._id, 
      name: user.name, 
      email: user.email,
      token: token // Sending it to frontend
    });
  } else {
    res.status(400).json({ message: 'Invalid user data' });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    // Corrected: pass 'res' as the first argument
    const token = generateToken(res, user._id); 

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: token, // Now this will be a real string, not undefined!
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
};

export const logoutUser = (req, res) => {
  res.cookie('user-token', '', { httpOnly: true, expires: new Date(0) });
  res.status(200).json({ message: 'Logged out successfully' });
};