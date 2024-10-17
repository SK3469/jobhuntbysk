import { User } from "../models/User.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from '../utils/dataUri.js'
import cloudinary from '../utils/cloudinary.js'
import { Company } from "../models/company.model.js";

//register function

export const register = async (req, res) => {
    try {
        const { fullname, email, phonenumber, password, role } = req.body;
        // console.log(fullname, email, phonenumber, password, role);
        if (!fullname || !email || !phonenumber || !password || !role) {
            return res.status(400).json({
                message: "All fields are required.",
                success: false
            });
        };
        const file = req.file;
        const fileUri = getDataUri(file);
        const cloudResponse= await cloudinary.uploader.upload(fileUri.content);

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "User already exists, try another one!",
                success: false
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            fullname,
            email,
            phonenumber,
            password: hashedPassword,
            role,
            profile:{
                profilePhoto:cloudResponse.secure_url,
            }
        });

        return res.status(201).json({
            message: "Account has been created successfully..",
            success: true
        });
    } catch (error) {
        console.log(error);
    }
};


//Login function
export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        console.log(email, password, role);
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "All fields are required!",
                success: false
            });
        }

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password",
                success: false
            });
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if (!isPasswordMatched) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false
            });
        }

        // Check if role matches
        if (role !== user.role) {
            return res.status(400).json({
                message: "Account doesn't exist with the current role",
                success: false
            });
        }

        const tokenData = {
            userId: user._id
        };
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phonenumber: user.phonenumber,
            role: user.role,
            profile: user.profile
        };

        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict' }).json({
            message: `Welcome back ${user.fullname}`,
            user,
            success: true
        });
    } catch (error) {
        console.log(error);
    }
};


//logout Function
export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully",
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

//update profile function

export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phonenumber, bio, skills } = req.body;
        console.log(skills)
        const file = req.file;
        //Cloudinary code for file upload comes here...
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        let skillsArray;
        if (skills) {
            skillsArray =  skills.split(",");
        }

        const userId = req.id; // middleware authentication...
        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({
                message: "User not found",
                success: false
            });
        }
        // Updating data
        if (fullname) user.fullname = fullname;
        if (email) user.email = email; // You might want to add a check for duplicate emails
        if (phonenumber) user.phonenumber = phonenumber;
        if (bio) user.profile.bio = bio;
        if (skills) user.profile.skills = skillsArray;

        // File processing code for resume comes here...
        if (cloudResponse)
            user.profile.resume = cloudResponse.secure_url // save for clodinary url
        user.profile.resumeOriginalName = file.originalname // save for original name 
        await user.save();
       const updateUser = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phonenumber: user.phonenumber,
            role: user.role,
            profile: user.profile
        }
        return res.status(200).json({
            
            message: "Profile updated successfully",
            updateUser,
            success: true,
            
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "An error occurred while updating the profile",
            success: false,
            error: error.message
        });
    }
};
