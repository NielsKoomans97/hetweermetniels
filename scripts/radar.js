const radar_options = document.getElementById('radar-options');
const radar_image = document.getElementById('radar-image');
const radar_playpause = document.getElementById('radar-playpause');
const radar_time = document.getElementById('radar-time');
const radar_slider = document.getElementById('radar-slider');
const radar_speed = document.getElementById('radar-speed');
const radar_times = document.getElementById('radar-times');

var images = [];
var paused = false;
var index = 0;
var speed = 200;
var animate;

radar_speed.addEventListener('change', () => {
    var option = radar_speed.selectedOptions[0];
    speed = parseInt(option.value);
});
radar_options.addEventListener('change', RadarSelectorChanged);
radar_times.addEventListener('change', RadarSelectorChanged);
radar_slider.addEventListener('input', Slide);
radar_playpause.addEventListener('click', () => {
    if (paused == true){
        paused = false;
        PlayAnimation();
    }
    else{
        paused = true;
        StopAnimation();
    }
});

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

    index = value;
    radar_image.setAttribute('src', image.Url);
    radar_time.innerText = `${FixTimeInt(date.getHours() + 2)}:${FixTimeInt(date.getMinutes())}`;
}

function EmptySlides() {
    images.length = 0;
    index = 0;
}

async function RadarSelectorChanged() {
    var option = radar_options.selectedOptions[0];
    var timeOption = radar_times.selectedOptions[0];

    var radar_version = option.getAttribute('data-version');
    var radar_type = option.getAttribute('data-type');
    var radar_24u = option.getAttribute('data-24u');

    if (timeOption.getAttribute('data-timetype') == 'history'){
        if (parseInt(timeOption.value) > 1) {
            await LoadRadar('v2', radar_24u, timeOption.value, 0, 0, true, false, false);
        }
        else{
            await LoadRadar(radar_version, radar_type, 24, 0, 0, false, false, false);
        }
    }
    else{
        await LoadRadar(radar_version, radar_type, 0, timeOption.value, 0, false, false, false);
    }
}

async function LoadRadar(version, type, history, forecast, startIndex, renderBackground, renderLogo, renderTime) {
    EmptySlides();
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

    radar_slider.setAttribute('max', times.length -1);
    radar_slider.value = 0;

    Slide();
}

async function LoadV2Manifest(type, history, forecast, renderBackground, renderLogo, renderTime) {
    return await fetch(`https://image.buienradar.nl/2.0/metadata/sprite/${type}?history=${history}&forecast=${forecast}&renderBackground=${renderBackground}&renderBranding=${renderLogo}&renderText=${renderTime}`);
}

async function LoadV3Manifest(type, history, forecast, startIndex) {
    return await fetch(`https://image-lite.buienradar.nl/3.0/metadata/${type}?history=${history}&forecast=${forecast}&startIndex=${startIndex}`);
}

function PlayAnimation() {
    radar_playpause.innerHTML = '<i class="fa-solid fa-pause"></i>';

    radar_slider.value = index;
    Slide();

    animate = setTimeout(PlayAnimation, speed);

    if (index == parseInt(radar_slider.getAttribute('max'))){
        index = 0;
    }
    else
    {
        index++;
    }
}

function StopAnimation(){
    radar_playpause.innerHTML = '<i class="fa-solid fa-play"></i>';

    clearTimeout(animate);
}

async function Initialize() {
    RadarSelectorChanged();
}

Initialize();
// PlayAnimation();

class RadarSlide {
    constructor(time, url) {
        this.Time = time;
        this.Url = url;
    }
}