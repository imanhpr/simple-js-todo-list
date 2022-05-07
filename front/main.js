import { alertMaker, listItemMaker, sendData, getAllItems } from "./maker.js";

const itemTextMaker = (id, text) => `${id} - ${text}`;
const btnd = document.getElementById("main-btn");
const textbox = document.getElementById('text-box');
btnd.addEventListener('click', () => {
    if (textbox.value.trim() !== '') {
        (async() => {
            const { _id: main_id, description: text } = await sendData(textbox.value.trim());
            listItemMaker(
                itemTextMaker(main_id, text)
            )
        })();
    } else {
        alertMaker('We can\'t submit empty textbox');
    }
});

(async() => {
    const items = await getAllItems();
    items.forEach(element => {
        const { _id, description } = element;
        listItemMaker(itemTextMaker(_id, description))
    });
})();