import { alertMaker, listItemMaker } from "./maker.js";

const btnd = document.getElementById("main-btn");
const textbox = document.getElementById('text-box');
btnd.addEventListener('click', () => {
    textbox.value.trim() !== '' ? listItemMaker(textbox.value) : alertMaker();
})