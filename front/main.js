import { alertMaker, listItemMaker, sendData, getAllItems } from "./maker.js";
import TodoDayBox from "./daycomp.js";
import JobData from "./dataclass.js";

const itemTextMaker = (id, text, time, date) => `${id} - ${text} - ${ time }`;
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
            box.appendJob(itemTextMaker(main_id, text, datetime.toLocaleTimeString()), datetime)
        })();
    } else {
        alertMaker('We can\'t submit empty textbox');
    }
});

(async() => {
    const items = await getAllItems();
    items.forEach(element => {
        const { _id, description, date_time } = element;
        const date = new Date(date_time);
        let box = dayMap.get(date.toDateString())
        if (!box) {
            box = new TodoDayBox(date)
            dayMap.set(date.toDateString(), box)
            box.insert()
        }
        box.appendJob(itemTextMaker(_id, description, date.toLocaleTimeString()), date)
    });
})();