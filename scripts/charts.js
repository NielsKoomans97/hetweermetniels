const chart_options = document.getElementById('chart-options');
const chart_image = document.getElementById('chart-image');
const chart_slider = document.getElementById('chart-slider');

chart_options.addEventListener('change', () => {
    var option = chart_options.selectedOptions[0];
    LoadCharts(option.value);
});

chart_slider.addEventListener('input', () => {
    chart_image.setAttribute('src', chart_images[parseInt(chart_slider.value)]);
});

var chart_images = [];

function LoadCharts(chart_type) {
    chart_images = [];

    for (let i = 0; i < 49; i++) {
        chart_images.push(`https://dev.weercijfers.nl/static/harmonie/benelux/${chart_type}${FixInteger(i)}00.png`);
    }

    chart_slider.value = 0;
}

function FixInteger(i){
    if (i < 10){
        return `0${i}`;
    }
    else{
        return `${i}`;
    }
}

chart_options.selectedIndex = 0;
LoadCharts('temperature2m_0');
