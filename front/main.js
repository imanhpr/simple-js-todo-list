import { alertMaker, listItemMaker, sendData, getAllItems } from "./maker.js";

const itemTextMaker = (id, text, time, date) => `${id} - ${text} - ${ time } - ${ date }`;
const btnd = document.getElementById("main-btn");
const textbox = document.getElementById('text-box');
btnd.addEventListener('click', () => {
    if (textbox.value.trim() !== '') {
        (async() => {
            const { _id: main_id, description: text, date_time: raw_date } = await sendData(textbox.value.trim());
            const datetime = new Date(raw_date);
            listItemMaker(
                itemTextMaker(main_id, text, datetime.toTimeString(), datetime.toTimeString())
            )
        })();
    } else {
        alertMaker('We can\'t submit empty textbox');
    }
});

(async() => {
    const items = await getAllItems();
    items.forEach(element => {
        const { _id, description, date_time } = element;
        const datetime = new Date(date_time);
        listItemMaker(itemTextMaker(_id, description, datetime.toTimeString(), datetime.toDateString()))
    });
})();