const express = require("express");
const router = express.Router();
const { userZod, parse } = require("../types");
const { User } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { User } = require("../db");

router.post("", async (req, res) => {
    const payload = req.body;
    const parsedPayload = userZod.safeParse(payload);
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

        const createdUser = User.create({
            username: parsedPayload.data.username,
            password: parsedPayload.data.password,
            firstName: parsedPayload.data.firstName,
            lastName: parsedPayload.data.lastName
        })
        const userId = user._id;
        const jwtToken = jwt.sign({userId }, JWT_SECRET);
         
        res.status(200).json({
            message: "User created successfully",
            token: jwtToken
        });
    } catch(err) {
        console.log(err);
    }
})


module.exports = router;