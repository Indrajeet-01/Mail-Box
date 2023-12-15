
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import User from '../models/user.js'

// register new user
export const register = (req, res) => {
    // Check if a user with the given email already exists
    User.findOne({ $or: [ { email: req.body.email }] })
        .then(existingUser => {
            if (existingUser) {
                return res.status(409).json("User already exists!");
            }

        // Hash the password
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
            email: req.body.email,
            password: hash,
        });

        // Save the new user to the database
        newUser.save()
            .then(() => {
                return res.status(200).json("User registered successfully");
            })
            .catch(error => {
                return res.status(500).json(error.message);
            }); 
        })
        .catch(err => {
            return res.status(500).json(err.message);
    });
};

// login user
export const login = (req, res) => {
    
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(404).json("User not found");
            }

        // Check if the provided password matches the hashed password in the database
        const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password);

        if (!isPasswordCorrect) {
            return res.status(400).json("Wrong username or password");
        }

        // Generate a JSON Web Token (JWT) for user authentication
        const token = jwt.sign({ id: user._id, email: user.email }, "jwtkey");

        const responseData = {
            id: user._id,
            email: user.email,
            access_token: token,
        };

        // Set the access_token as an HTTP-only cookie for secure storage
        res.cookie("access_token", token, {
            httpOnly: true,
        }).status(200).json(responseData);
    })
    .catch(err => {
        return res.status(500).json(err.message);
    });
};



// logout user
export const logout = (req,res)=>{
    
    res.clearCookie("access_token",{
        sameSite:"none",
        secure:true
    }).status(200).json("user has been logged out.")
}
 