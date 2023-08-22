const radarImage = document.getElementById('radar-image');
const radarOptions = document.getElementById('radar-options');
radarOptions.addEventListener('change', () => {
    let selectedOption = radarOptions.selectedOptions[0];
    let radarPath = selectedOption.getAttribute('data-radar-path');

    radarImage.setAttribute('src', radarPath);
});

let selectedOption = radarOptions.selectedOptions[0];
let radarPath = selectedOption.getAttribute('data-radar-path');

radarImage.setAttribute('src', radarPath);