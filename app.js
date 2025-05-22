const express = require('express');
const ejs = require('ejs');
const app = express();

app.set("view engine", ejs);

app.use(express.json());

app.listen(3000, ()=> {
    console.log("Server started on port 3000");
})


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

