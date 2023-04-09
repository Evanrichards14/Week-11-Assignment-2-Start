"use strict";

const $ = (selector) => document.querySelector(selector);
//sets up the timer for the faq page,
let timerCounter = 10;
let timer;


const goToTerms= ()=>{
    timerCounter -= 1;

    if(timerCounter>0){
        $("#seconds").textContent = timerCounter;
    }else{
        window.location.href = "terms"
    }

}
//function for the accept button 
const acceptTerms = ()=>{
    clearInterval(timer);
    $("#terms").setAttribute("class", "hidden");
}

const toggleQuestion = (evt)=>{
    evt.currentTarget.classList.toggle("minus");
    let answerDiv = evt.currentTarget.nextElementSibling;

    answerDiv.classList.toggle("open");
}

document.addEventListener("DOMContentLoaded", () => {

    $("#seconds").textContent = timerCounter;
    //Check if user accepted terms
    const query = window.location.search;
    const urlParameters = new URLSearchParams(query);
    const accepted = urlParameters.get("accepted"); 
    


    $("#accept").addEventListener("click", acceptTerms)

    const h2Elements = document.querySelectorAll("h2");

    for(let h2 of h2Elements){
        h2.addEventListener("click", toggleQuestion);
    }

    if(accepted){
        $("#terms").setAttribute("class", "hidden");
    }else{
        timer = setInterval(goToTerms, 1000);
    }
});
