export class SmallObservations {
    constructor() {
        const widget = document.querySelector('.observations.small');
        const icon = widget.querySelector('.icon');
        const location = widget.querySelector('.location');
        const temperature = widget.querySelector('.temperature');

        // FetchObservations();
        location.innerText = 'fiets';

        async function FetchObservations(){
            const data = await fetch('/data/observations/6350');
            const json = await data.json();

            console.log(json);

            location.innerText = json['regio'];
            temperature.innerText = `${json['temperature']}°`;
        }
    }
}


