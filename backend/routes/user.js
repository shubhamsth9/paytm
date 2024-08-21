const express = require("express");
const router = express.Router();
const signupRouter = require("./signup");
const signinRouter = require("./signin");
const authMiddleware = require("../middleware");
const { userUpdate } = require("../types");
const { User } = require("../db");

router.use("/signup", signupRouter);
router.use("/signin", signinRouter);

router.use();

router.put("/", authMiddleware, (req, res) => {

    const success = userUpdate.safeParse(req.body);

    if(!success){
        res.status(411).json({
            message: "Error while updating information"
        })
    }

    const user = User.findOne({
        username: req.body.username
    })

    const hashedPassword = user.createHash(req.body.password);
    if(req.body.firstName) user.firstName = req.body.firstName;
    if(req.body.lastName) user.lastName = req.body.lastName;
    if(req.body.password) user.password_hash = hashedPassword;

})

router.get("/bulk", async (req, res) => {
    const filterName = req.query.filter || ""; //harkirat
    try{
        const filteredUsers = await User.find(
            {$or: [{firstname: /filterName/i}, {lastname: /filterName/i}]},
            {firstName: 1, lastName: 1, _id: 1}
            );
        if(filteredUsers){
            res.status(200).json({
                filteredUsers
            })
        }
    } catch (err) {
        res.status(500).json({
            message: "No such user present"
        })
    }
    
})

module.exports = router;
