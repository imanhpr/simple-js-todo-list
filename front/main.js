import { alertMaker, listItemMaker, sendData, getAllItems } from "./maker.js";
import TodoDayBox from "./daycomp.js";

const itemTextMaker = (id, text, time, date) => `${id} - ${text} - ${ time } - ${ date }`;
const btnd = document.getElementById("main-btn");
const textbox = document.getElementById('text-box');
const dayMap = new Map()
btnd.addEventListener('click', () => {
    if (textbox.value.trim() !== '') {
        (async() => {
            const { _id: main_id, description: text, date_time: raw_date } = await sendData(textbox.value.trim());
            const datetime = new Date(raw_date);
            const datestr = datetime.toDateString();
            let box = dayMap.get(datestr);
            if (!box) {
                box = new TodoDayBox(datetime);
                dayMap.set(datestr, box);
                box.insert()
            }
            box.appendJob(text, datetime)
        })();
    } else {
        alertMaker('We can\'t submit empty textbox');
    }
});

(async() => {
    const items = await getAllItems();
    items.forEach(element => {
        const { _id, description, date_time } = element;
        element.date_time = new Date(date_time);
    });
    items.forEach(element => {
        const date = element.date_time
        let box = dayMap.get(date.toDateString())
        if (!box) {
            box = new TodoDayBox(date)
            dayMap.set(date.toDateString(), box)
            box.insert()
        }
        box.appendJob(element.description, date)

    });
})();