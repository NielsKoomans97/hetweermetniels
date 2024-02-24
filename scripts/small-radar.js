export class SmallRadar {
    constructor() {
        const radar = document.querySelector('#sm-radar-container');
        const radarContent = radar.querySelector('.radar-content');
        const radarLayer = radarContent.querySelector('.radar-layer');

        const metaContainer = radar.querySelector('.meta-container');
        const time = metaContainer.querySelector('.meta-time');
        const name = metaContainer.querySelector('.meta-name');

        UpdateRadarImages();

        async function UpdateRadarImages(){
            const data = await fetch('/data/radar/radarnl-observations');
            const json = await data.json();

            console.log(json);

            radarLayer.setAttribute('src', json[0]['path']);
        }
    }
}
