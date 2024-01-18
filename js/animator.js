export class Animator {
    constructor(type, element) {
        if (type['BackgroundImage'] != null) {
            const backgroundImage = element.querySelector('.background-image');
            backgroundImage.setAttribute('src', type['BackgroundImage']);
        }

        if (type['ExtraLayer'] != null) {
            const borderLayer = element.querySelector('.border-layer');
            borderLayer.setAttribute('src', type['ExtraLayer']);
        }

        if (type['Units'] != null){
            const units = element.querySelector('.radar-units');
            units.innerText = type['Units'];
        }
        else{
            const units = element.querySelector('.radar-units');
            units.classList.add('hidden');
        }
        
        const logoImage = element.querySelector('.logo');
        logoImage.setAttribute('src', type['Logo']);

        var radarPaused = true;
        var index = 0;

        async function UpdateRadarDefinition(type) {
            index = 0;
            radarPaused = true;

            function BuildUri(host, path, params) {
                let uri = '';

                uri += host;

                if (path != null && path != '') {
                    uri += `/${path}`;
                }

                if (params != null && params.length > 0) {
                    var param = params[0];
                    uri += `?${param['Key']}=${param['Value']}`;

                    for (let i = 0; i < params.length; i++) {
                        param = params[i];
                        uri += `&${param['Key']}=${param['Value']}`;
                    }
                }

                return uri;
            }

            const host = type['Host'];
            const path = type['Type'];
            const params = type['Parameters'];
            const uri = BuildUri(host, path, params);

            const formData = new FormData();
            formData.append('type', path);
            formData.append('url', uri);

            const data = await fetch('/get-radar',
                {
                    method: 'post',
                    body: formData
                });
            const text = await data.text();

            console.log(text);
        }

        async function LoadRadarDefinition(type) {
            let radarType = type['Type'];

            const path = `/data/${radarType}/${radarType}.json`;
            const data = await fetch(path);
            const json = await data.json();

            const radarImages = element.querySelector('.radar-images');

            json.forEach(item => {
                let radarItem = document.createElement('div');
                radarItem.classList.add('radar-image', 'active');

                let radarImage = document.createElement('img');
                radarImage.setAttribute('src', item['path']);

                radarItem.setAttribute('data-time', item['time']);
                radarItem.appendChild(radarImage);

                radarImages.appendChild(radarItem);
            });

            element.classList.add(radarType);

            radarPaused = false;
        }

        async function ReloadRadarDefinition(type){
            let radarType = type['Type'];

            const path = `/data/${radarType}/${radarType}.json`;
            const data = await fetch(path);
            const json = await data.json();

            const radarImages = element.querySelectorAll('.radar-image');

            json.forEach(item => {
                radarImages.forEach(radarImage => {
                    if (radarImage.classList.contains(type['Type'])){
                        const img = radarImage.querySelector('img');
                        img.setAttribute(item['path']);

                        radarImage.setAttribute('data-time', item['time']);
                    }
                });
            });

            radarPaused = false;
        }

        UpdateRadarDefinition(type)
            .then(() => LoadRadarDefinition(type));

        setInterval(() => {
            if (!radarPaused) {
                function FixInt(int) {
                    if (int < 10) {
                        return `0${int}`;
                    }
                    else {
                        return `${int}`;
                    }
                }

                const radarImages = element.querySelectorAll('.radar-image');
                const currentImage = radarImages[index];

                const timeHeading = element.querySelector('.time-heading');
                const time = element.querySelector('.time-nice');

                radarImages.forEach(el => {
                    el.classList.replace('active', 'hidden');
                });

                currentImage.classList.replace('hidden', 'active');
                timeHeading.innerText = type['Description'];

                const timeData = currentImage.getAttribute('data-time');
                if (timeData.indexOf('T') > 0) {
                    const date = new Date(Date.parse(timeData));
                    const dateString = `${FixInt(date.getHours() + 1)}:${FixInt(date.getMinutes())}`;

                    time.innerText = dateString;
                }
                else {
                    const date = new Date(0);
                    date.setSeconds(parseInt(currentImage.getAttribute('data-time')));

                    const dateString = `${FixInt(date.getHours())}:${FixInt(date.getMinutes())}`;

                    time.innerText = dateString;
                }

                if (index == (radarImages.length - 1)) {
                    index = 0;
                }
                else {
                    index++;
                }
            }
        }, 200);

        setInterval(() => {
            const date = new Date();
            const minute = date.getMinutes();
            const second = date.getSeconds();

            for (let i = 0; i < 6; i++) {
                if (minute == (i * 10) && second == 0) {
                    UpdateRadarDefinition(type)
                        .then(() => ReloadRadarDefinition(type));
                }
            }
        }, 1000)
    }
}
