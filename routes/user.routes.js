const express = require('express');
const { body,validationResult } = require('express-validator');
const router = express.Router();
const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.get('/register', (req,res) => {
    res.render('register');
})

router.post('/register', body('username').notEmpty().withMessage('Name is required'),
                        body('email').trim().isEmail().withMessage('Invalid email format'),
                        body('password').isLength({min: 8}).withMessage('Password must be at least 8 characters long'),
    async (req, res)=> {
        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: "invalid input"
            })
        }
    
    const{username, email, password} = req.body;
    //bcrypt is used to hash passwords before storing them in the database
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
        username,
        email,
        password: hashPassword
    })

    console.log(req.body);
    res.json(newUser);
})

router.get('/login', (req,res) => {
    res.render('login');
})

router.post('/login',  body('username').notEmpty().withMessage('Name is required'),
                        body('password').isLength({min: 8}).withMessage('Password must be at least 8 characters long'),
    async(req, res) => {
        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: "invalid input"
            })
        }

        const {username, password} = req.body;
 
        const user = await userModel.findOne({
            username: username
        })

        if(!user) {
            return res.status(400).json({
                message: "User or password is incorrect"
                //use this message always to avoid giving hints to attackers
            })
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            return res.status(400).json({
                message:"User or password is incorrect"
                //use this message always to avoid giving hints to attackers
            })
        }

        //generate a token here if you want to implement JWT authentication
        const token = jwt.sign({
            userId: user._id,
            username: user.username,
            email: user.email
        }, process.env.JWT)
        
        res.cookie('token', token);

        res.send('Login successful');
})

module.exports = router;