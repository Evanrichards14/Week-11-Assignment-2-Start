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

app.get("/", (req, res) => {
  //res.sendFile(path.resolve(__dirname + "/views/", "index.html"));
  res.render("index");
});

app.get("/profile2", (req, res) => {
 let user = req.session.user;
 
 res.render("profile2", {user});
});

app.get("/index2", (req, res) => {
  // res.sendFile(path.resolve(__dirname + "/views/", "math.html"));
  res.render("index2");
 
 });
  
 
app.get("/math", (req, res) => {
 // res.sendFile(path.resolve(__dirname + "/views/", "math.html"));
 res.render("math");

});

app.get("/faq", (req, res) => {
  //res.sendFile(path.resolve(__dirname + "/views/", "faq.html"));
  res.render("faq");

});

app.get("/terms", (req, res) => {
 // res.sendFile(path.resolve(__dirname + "/views/", "terms.html"));
 res.render("terms");
});


app.get("/slide-show", (req, res) => {
 // res.sendFile(path.resolve(__dirname + "/views/", "slide-show.html"));
 res.render("slide-show");

});

app.post("/update-profile", (req, res)=>{
  console.log(req);

  req.session.user = req.body;

  res.redirect("/profile")
})
// this code is to be used for the timer once the values have been inputted but I could not seem to make it work after bouncing between several examples and trying different things.
let timerInterval;
let originalTemp;

function startTimer() {
  const tempInput = document.getElementById("temp-input");
  const hoursInput = document.getElementById("hours-input");
  const minutesInput = document.getElementById("minutes-input");
  const timerDisplay = document.getElementById("timer-display");
  const tempDisplay = document.getElementById("temp-display");

  // this gets the starting temperature
  originalTemp = parseInt(tempDisplay.innerText);

  // finds the number time inputted into page
  const totalSeconds = (parseInt(hoursInput.value) * 60 * 60) + (parseInt(minutesInput.value) * 60);

  // set the new temperature and start the timer
  const newTemp = parseInt(tempInput.value);
  setTemperature(newTemp);
  timerDisplay.innerText = formatTime(totalSeconds);
  timerInterval = setInterval(function() {
    totalSeconds--;
    // check if the timer has run out
    if (totalSeconds === 0) {
      clearInterval(timerInterval);
      setTemperature(originalTemp);
      timerDisplay.innerText = "Timer finished.";
    } else {
      timerDisplay.innerText = formatTime(totalSeconds);
    }
  }, 1000);
}

function setTemperature(temp) {
  const tempDisplay = document.getElementById("temp-display");
  tempDisplay.innerText = temp.toString() + "°C";
}
// does the math to calculate the seconds into hours minutes and seconds
function formatTime(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}