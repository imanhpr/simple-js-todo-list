import { alertMaker, listItemMaker, sendData } from "./maker.js";

const btnd = document.getElementById("main-btn");
const textbox = document.getElementById('text-box');
btnd.addEventListener('click', () => {
    if (textbox.value.trim() !== '') {
        listItemMaker(textbox.value);
        (async() => {
            const response = await sendData(textbox.value.trim());
            console.log(response)
        })();
    } else {
        alertMaker('We can\'t submit empty textbox');
    }
})