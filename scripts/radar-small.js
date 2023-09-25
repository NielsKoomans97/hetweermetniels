export class SmallerRadar {
    constructor() {
        //selects
        const radar_type = document.getElementById('radar-type');
        const radar_history = document.getElementById('radar-history');
        const radar_speed = document.getElementById('radar-speed');

        //other elements
        const radar_playpause = document.getElementById('radar-playpause');
        const radar_time = document.getElementById('radar-time');
        const radar_position = document.getElementById('radar-position');
        const radar_image = document.getElementById('radar-image');

        //events
        radar_type.addEventListener('change', GetRadar);
        radar_history.addEventListener('change', GetRadar);
        radar_position.addEventListener('change', Slide);

        //other variables
        let images = [];
        let imageTimes = [];

        async function GetRadarManifest(version, type, archiveType, history, forecast) {
            let url = '';

            if (version == 2) {
                url = `https://image.buienradar.nl/2.0/metadata/sprite/${type}`;
            }
            else {
                url = `https://image-lite.buienradar.nl/3.0/metadata/${type}`;
            }

            if (history > 12){
                url = `https://image.buienradar.nl/2.0/metadata/sprite/${archiveType}`;
            }

            url += `?history=${history}`;
            url += `&forecast=${forecast}`;

            if (version == 2) {
                url += `&renderBackground=true`;
                url += `&renderText=false`;
                url += `&renderBranding=false`;
            }

            const manifest = await fetch(url);
            return await manifest.json();
        }

        async function GetRadar() {
            const selectedType = radar_type.selectedOptions[0];
            const type = selectedType.getAttribute('data-type');
            const archive_type = selectedType.getAttribute('data-archive-type');
            const version = selectedType.getAttribute('data-version');

            const history = radar_history.selectedOptions[0];
            let manifest = '';

            console.log(history.parentElement);

            if (history.parentElement.getAttribute('label') == 'Verleden') {
                manifest = await GetRadarManifest(parseInt(version), type, parseInt(history.value), 0);
            }
            else{
                manifest = await GetRadarManifest(parseInt(version), type, 0, parseInt(history.value));
            }

            images = [];
            imageTimes = [];

            const times = manifest['times'];
            times.forEach(time => {
                images.push(time['url']);
                imageTimes.push(time['timestamp']);
            });

            radar_position.setAttribute('max', times.length - 1);
            radar_position.value = 0;

            Slide();
        }

        function FixTimeInt(number) {
            if (number < 10) {
                return `0${number}`;
            }
        
            return number;
        }

        function Slide() {
            const index = radar_position.value;
            const image = images[parseInt(index)];
            const time = new Date(Date.parse(imageTimes[parseInt(index)]));
        
            radar_image.setAttribute('src', images[parseInt(index)]);
            radar_time.innerText = `${FixTimeInt(time.getHours() + 2)}:${FixTimeInt(time.getMinutes())}`;
        }
        
        GetRadar();
    }
}