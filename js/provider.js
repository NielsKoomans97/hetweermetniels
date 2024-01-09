
export class DataProvider {
    constructor() {

    }

    async UpdateRadarItems() {
        const data = await fetch('definitions.json');
        const json = await data.json();

        json.forEach(async item => {
            await this.UpdateRadarItem(item)
        });
    }

    async UpdateRadarItem(item) {
        
        let uriPath = `${item['Host']}/${item['Type']}`;

        const parameters = item['Parameters'];
        const param = parameters[0];

        uriPath += `?${param['Key']}=${param['Value']}`;

        for (let i = 1; i < parameters.length; i++) {
            const param = parameters[i];

            uriPath += `&${param['Key']}=${param['Value']}`;
        }

        const data = await fetch(uriPath);
        const json = await data.json();
        const times = json['times'];
        var tempItemArr = [];

        for(const time of times) {
            const formData = new FormData();
            formData.append('time', JSON.stringify(time));
            formData.append('type', item['Type']);

            const data = await fetch('/get-radar', {
                method: 'post',
                body: formData
            });
            const text = await data.json();

            tempItemArr.push(text);
        };

        const formData = new FormData();
        formData.append('manifest', JSON.stringify(tempItemArr));
        formData.append('type', item['Type']);

        const resultData = await fetch('/save-manifest', {
            method: 'post',
            body: formData
        });
        const text = await resultData.text();

        console.log(text);
    }
}