const express = require("express");
const router = express.Router();
const { userSignup } = require("../types");
const { User } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

router.post("/", async (req, res) => {
    const payload = req.body;
    const parsedPayload = userSignup.safeParse(payload);
    if(!parsedPayload.success) {
        res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
        return;
    }

    try {
        const existingUser = await User.findOne({
            username: parsedPayload.data.username
        })
        if(existingUser){
            res.status(411).json({
                message: "Username already taken"
            })
        }

        const newUser = new User({
            username: parsedPayload.data.username,
            firstName: parsedPayload.data.firstName,
            lastName: parsedPayload.data.lastName
        })

        const hashedPassword = newUser.createHash(parsedPayload.data.password);
        newUser.password_hash = hashedPassword;
        await newUser.save();

        const userId = user._id;
        const jwtToken = jwt.sign({userId}, JWT_SECRET);
         
        res.status(201).json({
            message: "User created successfully",
            token: jwtToken
        });
    } catch(err) {
        console.log(err);
    }
})


module.exports = router;