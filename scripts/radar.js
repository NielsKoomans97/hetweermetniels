const radar_options = document.getElementById('radar-options');
const radar_image = document.getElementById('radar-image');
const radar_playpause = document.getElementById('radar-playpause');
const radar_time = document.getElementById('radar-time');
const radar_slider = document.getElementById('radar-slider');

var images = [];

radar_options.addEventListener('change', RadarSelectorChanged);
radar_slider.addEventListener('input', Slide);

function FixTimeInt(number) {
    if (number < 10) {
        return `0${number}`;
    }

    return number;
}

function Slide() {
    if (images != null && images.length < 1) {
        return;
    }

    var value = radar_slider.value;
    var image = images[value];
    var date = new Date(Date.parse(image.Time));

    radar_image.setAttribute('src', image.Url);
    radar_time.innerText = `${FixTimeInt(date.getHours() + 2)}:${FixTimeInt(date.getMinutes())}`;
}

async function RadarSelectorChanged() {
    var option = radar_options.selectedOptions[0];

    var radar_version = option.getAttribute('data-version');
    var radar_type = option.getAttribute('data-type');

    await LoadRadar(radar_version, radar_type, 24, 0, 0, false, false, false);
}

async function LoadRadar(version, type, history, forecast, startIndex, renderBackground, renderLogo, renderTime) {
    images.slice(0, images.length);

    var manifest = '';

    if (version == 'v2') {
        manifest = await LoadV2Manifest(type, history, forecast, renderBackground, renderLogo, renderTime);
    }
    else {
        manifest = await LoadV3Manifest(type, history, forecast, startIndex);
    }

    var json = await manifest.json();
    var times = json['times'];

    times.forEach(element => {
        var slide = new RadarSlide(element['timestamp'], element['url']);

        images.push(slide);
    });

    radar_slider.setAttribute('max', times.length);
    radar_slider.value = 0;

    Slide();
}

async function LoadV2Manifest(type, history, forecast, renderBackground, renderLogo, renderTime) {
    return await fetch(`https://image.buienradar.nl/2.0/metadata/sprite/${type}?history=${history}&forecast=${forecast}&renderBackground=${renderBackground}&renderBranding=${renderLogo}&renderText=${renderTime}`);
}

async function LoadV3Manifest(type, history, forecast, startIndex) {
    return await fetch(`https://image-lite.buienradar.nl/3.0/metadata/${type}?history=${history}&forecast=${forecast}&startIndex=${startIndex}`);
}

async function Initialize() {
    await LoadRadar('v3', 'RadarMapRain5mNL', 24, 0, 0, false, false, false);
}

Initialize();

class RadarSlide {
    constructor(time, url) {
        this.Time = time;
        this.Url = url;
    }
}