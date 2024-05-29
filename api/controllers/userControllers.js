import User from '../model/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    try {
        const { fullName, username, password, confirmPassword, gender } = req.body;
        if (!fullName || !username || !password || !confirmPassword) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Password do not match" });
        }

        const user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // profile photo
        const maleProfilePhoto = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const femaleProfilePhoto = `https://avatar.iran.liara.run/public/girl?username=${username}`

        await User.create({
            fullName,
            username,
            password: hashedPassword,
            gender,
            profilePhoto: gender === "male" ? maleProfilePhoto : femaleProfilePhoto
        });

        return res.status(201).json({
            message: "Account created successfully.",
            success: true
        })
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: "User does not exist", success: false});
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials", success: false});
        }
        const tokenData={
            userId:user._id,
        }
        const token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: "1h" });
        return res.status(200).cookie("token",token, {maxAge:1*24*60*60*1000, httpOnly:true, sameSite:'strict'}).json({ 
            message: "Login successful",
            _id:user.id,
            username:user.username,
            fullName:user.fullName,
            profilePhoto:user.profilePhoto,
            success: true

         });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
