
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

    
}
