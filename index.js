const express = require("express");
const expressSession = require("express-session");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const path = require("path");
const app = express();

//Sets our view engine to load files ending in .ejs
app.set("view engine", "ejs");
app.use(express.static("public"));
//cookies
app.use(expressSession({
  resave: false,
  saveUninitialized:true,
  secret: "very secret key"
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));



const PORT = 5000;

app.listen(PORT, () => {
  console.log("App listening on port ", PORT);
});
//sets index page to be grabbed when the button is pressed

app.get("/", (req, res) => {
  //res.sendFile(path.resolve(__dirname + "/views/", "index.html"));
  res.render("index");
});
//sets profile page to be grabbed when the button is pressed

app.get("/profile2", (req, res) => {
 let user = req.session.user;
 
 res.render("profile2", {user});
});
//sets index page to be grabbed when the button is pressed

app.get("/index2", (req, res) => {
  // res.sendFile(path.resolve(__dirname + "/views/", "math.html"));
  res.render("index2");
 
 });
  



//sets slideshow page to be grabbed when the button is pressed

app.get("/faq", (req, res) => {
  //res.sendFile(path.resolve(__dirname + "/views/", "faq.html"));
  res.render("faq");

});
//sets terms page to be grabbed when the button is pressed

app.get("/terms", (req, res) => {
 // res.sendFile(path.resolve(__dirname + "/views/", "terms.html"));
 res.render("terms");
});

//sets slideshow page to be grabbed when the button is pressed
app.get("/slide-show", (req, res) => {
 // res.sendFile(path.resolve(__dirname + "/views/", "slide-show.html"));
 res.render("slide-show");

});

app.post("/update-profile", (req, res)=>{
  console.log(req);

  req.session.user = req.body;

  res.redirect("/profile")
})
