const express = require('express');
const userRouter = require('./routes/user.routes');
const indexRouter = require('./routes/index.routes');
const dotenv = require('dotenv');
dotenv.config();

const connectToDB = require('./config/db');
connectToDB();
const cookieParser = require('cookie-parser');

const app = express();

app.set('view engine', 'ejs');

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/user', userRouter);
app.use('/', indexRouter);

app.listen(3000, ()=> {
    console.log('Server is running on port 3000');
})

/*
app.post("/register", async (req, res) => {
    console.log(req.body);
    const data = await fetchDataFromAnotherService();
    return res.status(200).json({
        message: "User registered successfully",
        user: {
            name_from_request: req.body.name,
            email: req.body.email,
        },
        data,
    })
});

async function fetchDataFromAnotherService() {
    const response = await fetch("/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: {
            adad: "asda",
        },
    });
    const data = await response.json();
    const {user, pass, eicn} = req.body;
    return {
        success: data,
    };
}
*/
