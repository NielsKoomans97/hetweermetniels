export class Charts {
    constructor() {
        var images = [];

        const chart_type = document.getElementById('chart-type');
        const previous_chart = document.getElementById('previous-chart');
        const next_chart = document.getElementById('next-chart');
        const slider = document.getElementById('chart-slider');
        const chart_image = document.getElementById('chart-image');

        chart_type.addEventListener('change', SelectChart);
        slider.addEventListener('change', Slide);
        previous_chart.addEventListener('click', () => {
            let value = parseInt(slider.value);
            value -= 1;
            
            slider.value = value;
            Slide();
        });
        next_chart.addEventListener('click', () => {
            let value = parseInt(slider.value);
            value += 1;
            
            slider.value = value;

            Slide();
        });


        function SelectChart() {
            const option = chart_type.selectedOptions[0];

            GetAllSteps(option.value);

            slider.value = 0;

            Slide();
        }

        function Slide() {
            const value = slider.value;

            chart_image.setAttribute('src', images[parseInt(value)]);
        }

        function GetAllSteps(type) {
            images = [];

            for (let i = 0; i < 48; i++) {
                images.push(`https://dev.weercijfers.nl/static/harmonie/benelux/${type}_${FixStepInt(i)}.png`);
            }
        }

        function FixStepInt(int) {
            if (int < 10) {
                return `00${int}00`;
            }
            else {
                return `0${int}00`;
            }
        }

        SelectChart();
    }
}
