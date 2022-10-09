"use strict";

document.querySelector(".btn_menu").addEventListener("click", toggleMenu); // no se si ahcer un scrip solo para menu

function toggleMenu() {
    document.querySelector(".navigation").classList.toggle("show");  
}