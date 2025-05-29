const express = require('express');
const { body,validationResult } = require('express-validator');
const router = express.Router();

router.get('/register', (req,res) => {
    res.render('register');
})

router.post('/register', body('username').notEmpty().withMessage('Name is required'),
                        body('email').trim().isEmail().withMessage('Invalid email format'),
                        body('password').isLength({min: 8}).withMessage('Password must be at least 8 characters long'),
    (req, res)=> {
        const errors =validationResult(req);

        if(!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: "invalid input"
            })
        }
    console.log(req.body);
    res.send("User registered successfully");
})

module.exports = router;