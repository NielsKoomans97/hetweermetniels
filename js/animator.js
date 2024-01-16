export class Animator {
    constructor(type, element) {
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
                radarImage.setAttribute('data-time', element['time']);
                radarItem.appendChild(radarImage);

                radarImages.appendChild(radarItem);
            });

            element.classList.add(radarType);

            radarPaused = false;
        }

        function ClassListContains(el, key) {
            for (let classKey of el.classList) {
                if (classKey == key) {
                    return true;
                }
            };
        }

        UpdateRadarDefinition(type)
            .then(() => LoadRadarDefinition(type));

        setInterval(() => {
            if (!radarPaused) {
                const radarImages = element.querySelectorAll('.radar-image');
                console.log(radarImages);

                radarImages.forEach(el => {
                    el.classList.replace('active', 'hidden');
                }
                );

                radarImages[index].classList.replace('hidden', 'active');

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
