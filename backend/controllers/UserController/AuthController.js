import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../../models/UserModel/UserCredential.js'; // Import the User model
import { connectUserDatabase } from '../../config/database.js'; // Import the function to connect to the user database

export const signup = async (req, res) => {
  const { name, email, phone_number, password } = req.body;
  console.log(req.body);

  // Check for empty fields
  if (!name || !email || !phone_number || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Validate email format
  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  // Validate phone number format (10 digits)
  const phoneRegex = /^\d{10}$/;
  if (!phoneRegex.test(phone_number)) {
    return res.status(400).json({ message: 'Phone number must be 10 digits' });
  }

  try {
    console.log('Received values:', { name, email, phone_number, password });

    // Establish connection to the user database
    const userDbConnection = await connectUserDatabase();

    // Use the User model with the userDbConnection
    const UserModel = User(userDbConnection);

    // Check if the user already exists by email
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create a new user
    const newUser = new UserModel({
      name,
      email: email.toLowerCase(),
      phone_number,
      password: hashedPassword,
    });

    // Save user to the database
    const savedUser = await newUser.save();

    // Create JWT token
    const token = jwt.sign({ userId: savedUser._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    // Respond with success and user data
    res.status(201).json({
      message: 'User created successfully',
      user: {
        user_id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
export const signin = async (req, res) => {
  const { email, password } = req.body;

  // Check for empty fields
  if (!email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Establish connection to the user database
    const userDbConnection = await connectUserDatabase();

    // Use the User model with the userDbConnection
    const UserModel = User(userDbConnection);

    // Check if the user exists by email
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    // Respond with success and user data
    res.status(200).json({
      message: 'Sign-in successful',
      user: {
        user_id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};