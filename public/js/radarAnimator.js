export class RadarAnimator {
    constructor(radarItem) {
        const frameMisc = radarItem.querySelector('.frame-misc');
        const radarType = frameMisc.querySelector('.radar-type');
        const timeStamp = frameMisc.querySelector('.frame-timestamp');

        const frameList = radarItem.querySelector('.frame-list');
        const host = frameList.getAttribute('data-host');
        const type = frameList.getAttribute('data-type');
        const history = frameList.getAttribute('data-hist');
        const forecast = frameList.getAttribute('data-fcast');
        const version = frameList.getAttribute('data-version');

        let def = '';
        let updating = false;
        let index = 0;

        def = GetDefinition(type);

        UpdateFrames();

        setInterval(() => {
            if (!updating) {
                SetFrame(index);

                index++;
                const frames = frameList.querySelectorAll('.frame');

                if (index == (frames.length)) {
                    index = 0;
                }
            }
        }, 300);

        setInterval(async () => {
            const date = new Date();
            const minute = date.getMinutes();
            const second = date.getSeconds();
            const milliSecond = date.getMilliseconds();

            for (let i = 0; i < 6; i++) {
                if (minute == (i * 10) && second == 0 && milliSecond == 0) {
                    updating = true;
                    await UpdateFrames();
                }
            }
        }, 1000);

        async function GetDefinition(name) {
            const data = await fetch('/assets/radar/definitions.json');
            const json = await data.json();
            let foundDef = '';

            json.forEach(definition => {
                if (definition['type'] == name) {
                    foundDef = definition;
                }
            });

            return foundDef;
        }

        async function UpdateFrames() {
            const data = await fetch(uri());
            const json = await data.json();
            console.log(json);

            ClearFrameList();

            json.forEach(element => {
                CreateFrame(element);
            });

            updating = false;
        }

        function uri() {
            switch (host) {
                case 'weerplaza': 
                    return `/radar/weerplaza/${type}`;

                case 'buienradar': 
                    return `/radar/buienradar/${type}/${version}/${history}/${forecast}`;
            }
        }

        function CreateFrame(element) {
            let frame = document.createElement('div');
            frame.classList.add('frame', 'hidden');

            let frameImage = document.createElement('img');
            frameImage.className = 'frame-image';
            frameImage.setAttribute('src', element['path']);
            frameImage.setAttribute('data-time', element['time']);
            frame.appendChild(frameImage);

            frame.appendChild(frameImage);
            frameList.appendChild(frame);
        }

        function ClearFrameList() {
            while (!frameList.firstChild) {
                frameList.remove(frameList.lastChild);
            }
        }

        function SetFrame(index) {
            const frames = frameList.querySelectorAll('.frame');

            if (frames == null)
                return;

            frames.forEach(frame => {
                frame.classList.replace('visible', 'hidden');
            });

            const frame = GetFrame(index);
            if (frame != null){
                frame.classList.replace('hidden', 'visible');

                const image = frame.querySelector('.frame-image');
                const date = image.getAttribute('data-time');
    
                if (date.indexOf('T') > 0){
                    const dateParsed = new Date(Date.parse(date));
                    timeStamp.innerText = `${fixInt(dateParsed.getHours())}:${fixInt(dateParsed.getMinutes())}`;
                }
                else{
                    const dateParsed = new Date(date);
                    timeStamp.innerText = `${fixInt(dateParsed.getHours())}:${fixInt(dateParsed.getMinutes())}`;
                }
    
                function fixInt(int){
                    if (int < 10){
                        return `0${int}`;
                    }
                    else{
                        return `${int}`;
                    }
                }
            }
        }

        function GetFrame(index){
            const frames = frameList.querySelectorAll('.frame');

            for(let i = 0; i < frames.length; i++){
                if (i == index){
                    return frames[i];
                }
            }
        }
    }
}
