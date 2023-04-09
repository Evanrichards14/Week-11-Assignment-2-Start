"use strict";

const $ = (selector) => document.querySelector(selector);

let imageCounter = 0;
//setting up the beggining when the page is first opened a main image will be displayed witha  caption
const caption = $("#caption");
const mainImage = $("#main_image");
let imageCache = [];

const swapImage = ()=>{
    imageCounter = (imageCounter +1) % imageCache.length;

    mainImage.src = imageCache[imageCounter].src;
    mainImage.alt = imageCache[imageCounter].alt;

    caption.textContent = imageCache[imageCounter].alt;
    
}

document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll("a");
    let image;
  
    for (let link of links) {
      image = new Image();
      image.src = link.href;
      image.alt = link.title;
      imageCache.push(image);
    }
  //when the previous button is hit the image count will decrease by 1
    $("#previous").addEventListener("click", () => {
      swapImage(-1);
    });
    //when the next button is hit the image count will increase by 1

    $("#next").addEventListener("click", () => {
      swapImage(1);
    });
  });