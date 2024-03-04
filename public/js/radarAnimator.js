export class RadarAnimator {
    constructor(radarItem) {
        const frameMisc = radarItem.querySelector('.frame-misc');
        const radarType = frameMisc.querySelector('.radar-type');
        const timeStamp = frameMisc.querySelector('.frame-timestamp');

        const frameList = radarItem.querySelector('.frame-list');
        const host = frameList.getAttribute('data-host');
        const type = frameList.getAttribute('data-type');
        const history = frameList.getAttribute('data-hist');
        const forecast = framelist.getAttribute('data-fcast');

        let def = '';
        let updating = false;
        let index = 0;

        def = GetDefinition(type);

        setInterval(() => {
            if (!updating) {
                SetFrame(index);

                index++;

                if (index == (framelist.children.length - 1)) {
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
            const data = await fetch(`/radar/${host.innerText}/${type.innerText}`);
            const json = await data.json();

            ClearFrameList();

            json.forEach(element => {
                CreateFrame(element);
            });

            updating = false;
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
            framelist.appendChild(frame);
        }

        function ClearFrameList() {
            while (frameList.firstChild) {
                frameList.remove(frameList.lastChild);
            }
        }

        function SetFrame(index) {
            const frames = framelist.querySelectorAll('.frame');

            if (frames == null)
                return;

            frames.forEach(frame => {
                frame.classList.replace('visible', 'hidden');
            });

            const frame = frames[index];
            frame.classList.replace('hidden', 'visible');
        }
    }
}
