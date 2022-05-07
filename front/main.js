import { alertMaker, listItemMaker, sendData, getAllItems } from "./maker.js";

const btnd = document.getElementById("main-btn");
const textbox = document.getElementById('text-box');
btnd.addEventListener('click', () => {
    if (textbox.value.trim() !== '') {
        (async() => {
            const response = await sendData(textbox.value.trim());
            console.log(response)
        })();
    } else {
        alertMaker('We can\'t submit empty textbox');
    }
});

(async() => {
    const items = await getAllItems();
    items.forEach(element => {
        listItemMaker(`${element['_id']} - ${element['description']}`)
    });
})();