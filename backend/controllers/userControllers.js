const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const registerUser = asyncHandler(async (req, res) => {

    try {

        const { name, email, password, phoneNumber, role } = req.body;

        if (!name || !email || !password || !phoneNumber || !role) {
            return res.status(400).json({ message: "Please send all the fields" });
        }

        const userExist = await User.findOne({ email });

        if (userExist) {
            return res.status(400).json({ message: "Email already used, please sign in" });
        }
        else {

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const newUser = {
                name, email, password: hashedPassword, phoneNumber, role,
            }

            const user = await User.create(newUser);

            if (user) {
                return res.status(201).json({ message: 'User created Successfully' });
            }
            else {
                return res.status(400).json({ message: "User not registered!!" });
            }
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

const loginUser = asyncHandler(async (req, res) => {

    try {

        const { email, password, role } = req.body;

        if (!email || !password || !role) {
            return res.status(400).json({ message: "Please send all the fileds" });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not exist, please sign up" });
        }
        else {
            const compare = await bcrypt.compare(password, user.password);
            if (!compare) {
                return res.status(400).json({ message: "Wrong credentials, try again" });
            }
            if (role !== user.role) {
                return res.status(400).json({ message: 'check your role again' });
            }

            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
            return res.status(200).cookie('token', token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, secure: true, sameSite: 'strict' })
                .json({
                    message: `welcome back ${user.name}`,
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    phoneNumber: user.phoneNumber,
                    role: user.role,
                    profile: user.profile,
                });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }

});

const logOut = asyncHandler(async (req, res) => {

    try {
        res.status(200).cookie('token', '', { maxAge: 0 }).json({ message: 'User logged out successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }

});

const updateProfile = asyncHandler(async (req, res) => {
    try {

        const { name, email, bio, phoneNumber, skills } = req.body;
        const file = req.file;

        // cloudinaryy
        if (skills) {
            const skillsArray = skills.split(',');
        }
        const user = await User.findById(req.user._id);

        //updating the values 
        if (name) user.name = name;
        if (email) user.email = email;
        if (phoneNumber) user.phoneNumber = phoneNumber;
        if (bio) user.profile.bio = bio;
        if (skills) user.profile.skills = skillsArray;

        //write logic for resume later

        //saving the updated values 

        await user.save();

        res.status(200).json({
            message: "User updated successfully",
            _id: user._id,
            name: user.name,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile,
        });


    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Down" });
    }
})

module.exports = { registerUser, loginUser, logOut, updateProfile };