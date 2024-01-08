;export class DataProvider {
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
        let result = [];
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

        times.forEach(async time => {
            const timeData = await fetch(`../core/data/download.php?uri=${time['url']}`);
            const timeDataText = await timeData.text();

            let timeItem = {
                "time": time['timestamp'],
                "url": timeDataText
            };
            result.push(timeItem);
        });

    }
}