export default class JobData {
    constructor(text, date_time, state) {
        this.id = null;
        this.ok = null;
        this.text = text;
        this.date_time = date_time;
        this.state = state;
    }
    static with_id(id, text, date_time, state) {
        const obj = new JobData(text, date_time, state);
        obj.id = id;
        return obj
    }
    async submit() {
        const headers = new Headers
        headers.append('content-type', 'application/json')
        const response = await fetch('http://localhost:5000/add-item', {
            method: 'POST',
            mod: 'cors',
            headers: headers,
            body: this.toJSON()
        });
        this.ok = response.ok;
        if (response.ok) {
            const json_data = await response.json()
            this.id = json_data['_id']
        } else {
            throw Error("Something went wrong.")
        }
    }
    toJSON() {
        const forbiden_att = new Set().add('id').add('ok')
        return JSON.stringify(
            Object.fromEntries(Object.entries(this).filter(ele => {
                const [key, _] = ele;
                return !(forbiden_att.has(key))
            }))
        );
    }
}