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
        radar_type.addEventListener('change', RadarSelected);
        radar_history.addEventListener('change', RadarHistorySelected);
        radar_position.addEventListener('change', Slide);

        //other variables
        let images = [];
        let imageTimes = [];

        function ClearAll(element) {
            var delChild = element.lastChild;
            while (delChild) {
                element.removeChild(delChild);
                delChild = element.lastChild;
            }
        }

        async function LoadRadars() {
            var radars = await fetch('radars.json');
            var json = await radars.json();

            var data = json['radars'];
            data.forEach(element => {
                var option = document.createElement('option');
                option.innerText = element['type'];

                option.setAttribute('data-json', JSON.stringify(element));

                radar_type.appendChild(option);
            });

            RadarSelected();
        }

        function RadarSelected() {
            var item = radar_type.selectedOptions[0];
            var json = JSON.parse(item.getAttribute('data-json'));
            var keys = Object.keys(json);

            ClearAll(radar_history);

            keys.forEach(element => {
                if (element.match('([\dh]+)')) {
                    var option = document.createElement('option');
                    option.setAttribute('data-url', json[element]);

                    option.innerText = element;
                    radar_history.appendChild(option);
                }
            });

            RadarHistorySelected();
        }

        function Contains(needle, haystack) {
            if (haystack.indexOf(needle) > 0) {
                return true;
            }

            return false;
        }

        async function RadarHistorySelected() {
            var item = radar_history.selectedOptions[0];
            var params = item.getAttribute('data-url');
            var baseUrl = '';

            if (Contains('5mNL', params) || Contains('1hNL', params) || Contains('15mNL', params)) {
                baseUrl = 'https://image-lite.buienradar.nl/3.0/metadata/';
            }
            else {
                baseUrl = 'https://image.buienradar.nl/2.0/metadata/sprite/';
            }

            var json = await fetch(`${baseUrl}${params}`);
            var manifest = await json.json();

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

        LoadRadars();
    }
}