const express = require("express");
const app = express();
const openrBrowser = require("./app");
const PORT = process.env.PORT || 4875

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs")

app.get("/", (req, res) => {
    openrBrowser()
    res.render("index")
});

app.listen(PORT, () => { console.log("Server Start") })