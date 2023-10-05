import { GroupBox } from "./groupbox.js";
import { MenuExpander } from "./nav-menu.js";
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

    const add_button = document.getElementById('add');
    add_button.addEventListener('click', () => {
        weatherMan.DefaultLocation.Save();
    });

    const select_button = document.getElementById('select');
    select_button.addEventListener('click', async () => {
        await weatherMan.Select();
    });
}

if (HasElement('forecast-days')){
    new GroupBox();
}

function HasElement(element) {
    const el = document.getElementById(element);

    return el != null;
}
