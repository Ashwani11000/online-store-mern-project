const express = require("express");

const app = express();

const port = 8000;

app.get("/", (req, res) => {
    return res.send("Hello there!!");
});

// app.get("/admin",(req,res) => {
//     return res.send("Admin Page");
// });
// The above code can be used as given below
const admin = (req, res) => {
    return res.send("Admin Page!!");
}
//isAdmin is the middleware here which will check the level of authority.
const isAdmin = (req,res,next) => {
    console.log("isAdmin is running");
    next();
}

app.get("/admin", isAdmin, admin);

app.get("/signout", (req, res) => {
    return res.send("You are signed out");
});
app.get("/new", (req, res) => {
    return res.send("just something new");
});

app.listen(port, () => {
    console.log("Server is up and running at port 8000...");
});

// const port = 3000

// app.get('/', (req, res) => res.send('Hello World!'))

// app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))