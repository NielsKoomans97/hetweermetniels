export class Warnings {
    constructor() {
        const warningOverview = document.querySelector('.warning-overview');
        const warningDayImage = warningOverview.querySelector('.warning-day');
        const warningList = warningOverview.querySelector('.alert-list');
        let index = 0;
        let slideshowPaused = true;

        UpdateWarnings();

        setInterval(async () => {
            const now = new Date();
            const minute = now.getMinutes();
            const second = now.getSeconds();

            for (let i = 0; i < 6; i++) {
                if (minute == ((i * 10) + 1) && second == 0) {
                    await UpdateWarnings();
                }
            }
        }, 1000);

        setInterval(() => {
            if (document.querySelectorAll('.alert-card') != null && slideshowPaused == false) {
                const alerts = document.querySelectorAll('.alert-card');

                SetAlertDisplay(index);

                if (index == (alerts.length - 1)) {
                    index = 0;
                }
                else {
                    index++;
                }
            }
        }, 3500);

        function SetAlertDisplay(index) {
            const alerts = document.querySelectorAll('.alert-card');
            alerts.forEach(alert => {
                alert.classList.replace('active', 'hidden');
            });

            alerts[index].classList.replace('hidden', 'active');
        }

        async function UpdateWarnings() {
            slideshowPaused = true;
            index = 0;

            const data = await fetch('https://data.buienradar.nl/1.0/announcements/apps');
            const json = await data.json();

            warningList.innerHTML = '';

            warningDayImage.setAttribute('src', json['warnings']['daySummaries']['day1']['image']);

            const locations = json['warnings']['locations'];
            console.log(locations.length);

            if (locations.length > 0) {
                locations.forEach(location => {
                    BuildAlertCards(location);
                });
                warningOverview.classList.replace('hidden', 'active');
            }
            else {
                warningOverview.classList.replace('active', 'hidden');
            }

            slideshowPaused = false;

            function BuildAlertCards(location) {
                const alerts = location['alerts'];

                alerts.forEach(alert => {
                    warningList.appendChild(BuildAlertCard(alert, location));
                });
            }

            function BuildAlertCard(alert, location) {
                var alertCard = document.createElement('div');
                alertCard.classList.add('alert-card', 'active', alert['color']);

                var alertTitle = document.createElement('p');
                alertTitle.className = 'alert-title';
                alertTitle.innerText = location['name'];

                var alertSummary = document.createElement('p');
                alertSummary.className = 'alert-summary';
                alertSummary.innerText = alert['text'];

                var startTimeParsed = new Date(Date.parse(alert['starttime']));
                var endTimeParsed = new Date(Date.parse(alert['endtime']));

                var alertDateWindow = document.createElement('p');
                alertDateWindow.className = 'alert-date-window';
                alertDateWindow.innerText = `${FixInt(startTimeParsed.getDate())}-${FixInt(startTimeParsed.getMonth())} tot ${FixInt(endTimeParsed.getDate())}-${FixInt(endTimeParsed.getMonth())}`;

                var alertTimeWindow = document.createElement('p');
                alertTimeWindow.className = 'alert-time-window';
                alertTimeWindow.innerText = `van ${FixInt(startTimeParsed.getHours())}:${FixInt(startTimeParsed.getMinutes())} tot ${FixInt(endTimeParsed.getHours())}:${FixInt(endTimeParsed.getMinutes())}`;

                alertCard.append(alertTitle, alertSummary, alertDateWindow, alertTimeWindow);

                return alertCard;
            }

            function FixInt(int) {
                if (int < 10) {
                    return `0${int}`;
                }
                else {
                    return `${int}`;
                }
            }
        }
    }
}
