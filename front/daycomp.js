class liItem {
    constructor(text, dateobj) {
        this.text = document.createTextNode(text);
        this.ptext = document.createElement('p')
        this.ptext.classList.add('card-text')
        this.ptext.appendChild(this.text)
        this.done = false;
        this.date = dateobj;
        this.main_el = document.createElement('li');
        this.main_el.appendChild(this.ptext)
        this.main_el.classList.add(
            'list-group-item', `list-group-item-primary`,
            'd-flex', 'justify-content-between'
        );
        this.div_check = null;
        this.checkbox = null;
        this._checkBox_Maker();
        this.main_el.appendChild(this.div_check)
    }
    get element() {
        return this.main_el
    }
    get checkBox() {
        return this.checkbox
    }
    get state() {
        return this.done
    }
    set state(bool) {
        if (typeof bool !== 'boolean')
            throw Error('You must use boolean value');
        this.done = bool;

    }
    _checkBox_Maker() {
        const tags = ['div', 'input'];
        const [main_div, input] = tags.map(item => document.createElement(item))
        main_div.classList.add('form-check');
        input.setAttribute('type', 'checkbox');
        input.classList.add('form-check-input');
        main_div.appendChild(input);
        this.div_check = main_div;
        this.checkbox = input;
    }
}


export default class TodoDayBox {
    constructor(date_time) {
        if (!(date_time instanceof Date)) {
            throw Error('You have to use Date object as constructor arg.');
        }
        this.date = date_time;
        this.raw_elemet_data = {
            'row': { "class": 'row', "el": "div" },
            'col': { "class": 'col', "el": "div" },
            'card': { "class": 'card', "el": "div" },
            'card-header': { "class": 'card-header', "el": "div" },
            'card-body': { "class": 'card-body', "el": "div" },
            'job_container': { 'class': 'list-group', "el": 'ul' },
        };
        this.card = null; // it's going to be complete after _make_element invocation.
        this.main_el = null;
        this.job_container = null;
        this.jobs = [];
        this._make_element();


    }
    isEqual(date_time) {
        if (!(date_time instanceof Date)) {
            throw Error('You have to use Date object as constructor arg.');
        }
        return (Number(date_time) === Number(this.date)) ? true : false
    }
    _make_element() {
        const { row, col, card, "card-header": card_header, "card-body": card_body, job_container } =
        Object.fromEntries(
            Object.entries(this.raw_elemet_data).map(([key, value]) => {
                const new_el = document.createElement(value['el']);
                // TODO : use list and spread oprater to cleanup.
                new_el.classList.add(value['class'])
                return [key, new_el];
            })
        );
        const header_text = document.createTextNode(this.date.toDateString());
        card_header.appendChild(header_text);
        row.classList.add('my-2')
        row.appendChild(col);
        col.appendChild(card);
        card.appendChild(card_header);
        card.appendChild(card_body);
        card_body.appendChild(job_container)
        this.job_container = job_container;
        this.card = card;
        this.main_el = row;
        console.log(row)
    }
    insert() {
        document.querySelector('main').appendChild(this.main_el);
    }
    remove() {
        document.querySelector('main').removeChild(this.main_el);
    }
    appendJob(text, datetime) {
        const newjob = new liItem(text, datetime);
        console.log(newjob.element)
        this.job_container.append(newjob.element)
        newjob.checkbox.addEventListener('change', () =>
            newjob.state = (newjob.state) ? false : true);
    }
};