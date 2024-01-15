
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

        if (parameters.length > 0){
            const param = parameters[0];

            uriPath += `?${param['Key']}=${param['Value']}`;

            for (let i = 1; i < parameters.length; i++) {
                const param = parameters[i];

                uriPath += `&${param['Key']}=${param['Value']}`;
            }
        }

        if (item['Host'].indexOf('meteoplaza') < 0){
            const formData = new FormData();
            formData.append('TYPE', item['Type']);
            formData.append('URL',uriPath);

            await fetch('/get-radar?host=buienradar', {
                method: 'post',
                body: formData
            });
        }
        else{
            const formData = new FormData();
            formData.append('URL',uriPath);

            await fetch('/get-radar?host=weerplaza', {
                method: 'post',
                body: formData
            });
        }


    }
}
