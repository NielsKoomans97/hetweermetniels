export class Animator {
    constructor(type, element) {
        this.Type = type;
        this.Element = element;
        this.Frames = [0];
        this.Index = 0;

        let radarPaused = false;

        async function LoadManifest(type) {
            console.log(this);

            this.Frames = [];

            const path = `data/${type}/${type}.json`;
            const data = await fetch(path);
            const json = await data.json();

            for (const item of json) {
                this.Frames.push(item);
            }

            this.Index = 0;
        }

        LoadManifest(this.Type);

        setInterval(async () => {
            {
                const now = new Date();
                const minute = now.getMinutes();

                for (let i = 0; i < 6; i++) {
                    if (minute == (i * 10)) {
                        await LoadManifest(this.Type);
                    }
                }
            }
        }, 1000)

        function SetFrame(index) {
            const frame = this.Frames[index];
            const image = element.querySelector('img');
            const timeHeading = element.querySelector('.time-heading');
            const timeNice = element.querySelector('.time-nice');

            image.setAttribute('src', frame['path']);
            timeHeading.innerText = this.Type;
            timeNice.innerText = frame['time'];
        }

        setInterval(() => {
            if (!radarPaused){
                SetFrame(this.Index);

                if (this.Index == (this.Frames.length - 1)) {
                    this.Index = 0;
                }
                else {
                    this.Index++;
                }
            }
        }, 300);
    }
}
