export class SmallRadar {
    constructor() {
        const radar = document.querySelector('#small-radar');
        const radarLayer = radar.querySelector('.radar-layer');

        const metaContainer = radar.querySelector('.meta-container');
        const time = metaContainer.querySelector('.meta-time');
        const name = metaContainer.querySelector('.meta-name');

        UpdateRadarImages();

        async function UpdateRadarImages(){
            const data = await fetch('/data/radar/radarnl-observations');
            const json = await data.text();

            console.log(json);
        }
    }
}
