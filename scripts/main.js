import { Announcements } from "./announcements.js";
import { MenuExpander } from "./nav-menu.js";
import { ObservationsWidget } from "./observations.js";
import { SmallerRadar } from "./radar-small.js";
import { WeatherManager } from "./weathermanager.js";

new MenuExpander();

const weatherMan = new WeatherManager();
await weatherMan.LoadConfig();

const search_button = document.getElementById('search');

search_button.addEventListener('click', async () => {
    await weatherMan.Search(input.value);
});
