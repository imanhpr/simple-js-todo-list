import { alertMaker, listItemMaker, sendData, getAllItems } from "./maker.js";
import TodoDayBox from "./daycomp.js";
import JobData from "./dataclass.js";

const itemTextMaker = (id, text, time, date) => `${id} - ${text} - ${ time }`;
const btnd = document.getElementById("main-btn");
const textbox = document.getElementById('text-box');
const dayMap = new Map()
btnd.addEventListener('click', () => {
    const textvalue = textbox.value.trim();
    if (textvalue !== '') {
        (async() => {
            const datetime = new Date();
            const new_job = new JobData(textvalue, datetime, false);
            await new_job.submit()
            const datestr = datetime.toDateString();
            let box = dayMap.get(datestr);
            if (!box) {
                box = new TodoDayBox(datetime);
                dayMap.set(datestr, box);
                box.insert()
            }
            box.appendJob(itemTextMaker(new_job.id, new_job.text, datetime.toLocaleTimeString()), datetime)
        })();
    } else {
        alertMaker('We can\'t submit empty textbox');
    }
});

(async() => {
    const items = await getAllItems();
    items.forEach(element => {
        const { id, text, date_time } = element;
        const date = new Date(date_time);
        let box = dayMap.get(date.toDateString())
        if (!box) {
            box = new TodoDayBox(date)
            dayMap.set(date.toDateString(), box)
            box.insert()
        }
        box.appendJob(itemTextMaker(id, text, date.toLocaleTimeString()), date)
    });
})();