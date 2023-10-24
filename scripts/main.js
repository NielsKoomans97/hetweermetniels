import { Charts } from "./charts.js";
import { GroupBox } from "./groupbox.js";
import { MenuExpander } from "./nav-menu.js";
import { SmallerRadar } from "./radar-small.js";
import { Scroller } from "./scroller.js";
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

new GroupBox();
new Scroller();

if (HasElement('locations-list')) {
    const body = document.getElementsByTagName('body')[0];
    body.addEventListener('mousedown', (event) => {
        const locations_list = document.getElementById('locations-list');
        const saved_locations_list = document.getElementById('saved-locations-list');

        if (locations_list.getAttribute('data-visible') == 'visible') {
            const bounds = locations_list.getBoundingClientRect();
            const coordsX = event.clientX;
            const coordsY = event.clientY;

            if (BoundsContains(bounds, coordsX, coordsY) == false) {
                locations_list.setAttribute('data-visible', 'collapsed');
            }
        }

        if (saved_locations_list.getAttribute('data-visible') == 'visible') {
            const bounds = saved_locations_list.getBoundingClientRect();
            const coordsX = event.clientX;
            const coordsY = event.clientY;

            if (BoundsContains(bounds, coordsX, coordsY) == false) {
                saved_locations_list.setAttribute('data-visible', 'collapsed');
            }
        }
    });

    function BoundsContains(bounds, x, y) {
        if (x > bounds.x) {
            if (x < bounds.width) {
                if (y > bounds.y) {
                    if (y < bounds.width) {
                        return true;
                    }
                }
            }
        }

        return false;
    }
}

if (HasElement('chart-options')) {
    new Charts();
}

function HasElement(element) {
    const el = document.getElementById(element);

    return el != null;
}
