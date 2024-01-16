export class Animator {
    constructor(type, element) {
        const backgroundImage = element.querySelector('.background-image');
        backgroundImage.setAttribute('src', type['BackgroundImage']);

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
            json.forEach(element => {
                let radarItem = document.createElement('div');
                radarItem.classList.add('radar-image', 'active');

                let radarImage = document.createElement('img');
                radarImage.setAttribute('src', element['path']);

                radarItem.setAttribute('data-time', element['time']);
                radarItem.appendChild(radarImage);

                radarImages.appendChild(radarItem);
            });

            element.classList.add(radarType);

            radarPaused = false;
        }

        UpdateRadarDefinition(type)
            .then(() => LoadRadarDefinition(type));

        setInterval(() => {
            if (!radarPaused) {
                const radarImages = element.querySelectorAll('.radar-image');
                const currentImage = radarImages[index];

                const timeHeading = element.querySelector('.time-heading');
                const time = element.querySelector('.time-nice');

                radarImages.forEach(el => {
                    el.classList.replace('active', 'hidden');
                }
                );

                currentImage.classList.replace('hidden', 'active');
                timeHeading.innerText = type['Description'];
                time.innerText = currentImage.getAttribute('data-time');

                if (index == (radarImages.length - 1)) {
                    index = 0;
                }
                else {
                    index++;
                }
            }
        }, 200);
    }
}
