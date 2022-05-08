const ulist = document.getElementById("main-ul");
const alertBox = document.getElementById('alert-box');


class ListItemColor {
    static colors = ["primary", "secondary", "success", "danger", "warning", "info", "dark"];
    constructor() {
        this.tracker = 0;
    }
    oneUp() {
        (this.tracker === ListItemColor.colors.length - 1) ? this.tracker = 0: this.tracker++;
        return ListItemColor.colors[this.tracker];
    }
}

const alertColor = new ListItemColor();

function genricElementMaker(elmentName, text) {
    const new_text = document.createTextNode(text);
    const new_element = document.createElement(elmentName);
    new_element.appendChild(new_text);
    return new_element
}

function listItemMaker(text) {
    const new_li = genricElementMaker('li', text);
    new_li.classList.add('list-group-item', `list-group-item-${alertColor.oneUp()}`);
    ulist.appendChild(new_li)
}

function alertMaker(text) {
    const new_div = genricElementMaker('div', text);
    new_div.classList.add('alert', `alert-${alertColor.oneUp()}`)
    new_div.setAttribute('role', 'alert')
    alertBox.appendChild(new_div)
    setTimeout(() => {
        new_div.remove()
    }, 3000);
}

async function sendData(text) {
    const header = new Headers
    header.append('content-type', 'application/json')
    const response = await fetch('http://localhost:5000/add-item', {
        method: 'POST',
        mod: 'cors',
        headers: header,
        body: JSON.stringify({ 'description': text, 'date_time': new Date() })
    })
    if (response.ok) {
        return await response.json();
    } else {
        const jsonResponse = await response.json();
        alertMaker(jsonResponse.message)
        return jsonResponse
    }
}

async function getAllItems() {
    const response = await fetch('http://localhost:5000/items');
    return await response.json()
}

export {
    listItemMaker,
    alertMaker,
    sendData,
    getAllItems
}