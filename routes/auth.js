const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { getToken } = require("../utils/helpers");

//This POST route will help to register a user
router.post("/register", async (req, res) => {
    //This code is run when the /register api is called as a POST request
    //My req.body will be of the format {email,password,firstName,lastName,userName}
    const { email, password, firstName, lastName, username } = req.body;

    //Step 2 : Dose a user with this email already exist? If yes ,we throw an error.
    const user = await User.findOne({ email: email });
    if (user) {
        //status code by default is 200
        return res.status(403).json({ error: "A user with this email already exists" });
    }
    //this is a valid request
    //step 3 : Create a new user in the DB
    //step 3.1 :we do not store passwords in plain text.
    //we convert plain text password in hash code.
    const hashPassword = bcrypt.hash(password, 10);
    const newUserData = { email, password: hashPassword, firstName, lastName, username };
    const newUser = await User.create(newUserData);

    //step 4 : We want to create the token to return to the user
    const token = await getToken(email, newUser);

    //step 5 :return the result to the user
    const userToReturn = { ...newUser.toJSON(), token };
    delete userToReturn.password;
    return res.status(200).json(userToReturn);
});

router.post("/login", async (req, res) => {
    //Step 1 : Get email and password sent by user from req.body
    const {email,password}=req.body;

    //Step 2 : Check if a user with the given email exists. If not, the credentials are ivalid.
    const user =await User.findOne({email:email});
    if(!user){
        return res.status(403).json({err:"Invalid credentials"});
    }


    //step 3 : If the user existd,check if the password is correct. If not , the credentials are invalid.
    //This is a tricky step
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid){
        return res.status(403).json({err:"Invalid credentials"});
    }


    //Step 4 : if  the credentials are correct , return a token to the user.
    const token =await getToken(user.email,user);

    const userToReturn = { ...user.toJSON(), token };
    delete userToReturn.password;
    return res.status(200).json(userToReturn);
});
module.exports = router;