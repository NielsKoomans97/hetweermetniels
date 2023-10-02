import { Announcements } from "./announcements.js";
import { MenuExpander } from "./nav-menu.js";
import { ObservationsWidget } from "./observations.js";
import { SmallerRadar } from "./radar-small.js";
import { WeatherManager } from "./weathermanager.js";

new MenuExpander();

if (HasElement('smaller-radar')) {
    new SmallerRadar();
}

const weatherMan = new WeatherManager();
await weatherMan.LoadConfig();

if (HasElement('search')) {

    const input = document.getElementById('search-query');
    const search_button = document.getElementById('search');

    search_button.addEventListener('click', async () => {
        await weatherMan.Search(input.value);
    });
}


function HasElement(element) {
    const el = document.getElementById(element);

    return el != null;
}
