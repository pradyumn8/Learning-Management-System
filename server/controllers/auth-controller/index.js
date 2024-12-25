const User = require('../../models/User');
const bcrypt = require('bcryptjs');

const registerUser = async (req, res) => {
    const { userName, userEmail, password, role } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({
            $or: [{ userName }, { userEmail }],
        });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User name or user email already exists',
            });
        }

        // Hash the password
        const hashPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            userName,
            userEmail,
            role: role || "user", // Default role to "user" if not provided
            password: hashPassword,
        });

        await newUser.save();

        return res.status(201).json({
            success: true,
            message: 'User registered successfully!',
        });
    } catch (error) {
        console.error(`Error in registerUser: ${error.message}`);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while registering the user.',
            error: error.message,
        });
    }
};

module.exports = { registerUser };
