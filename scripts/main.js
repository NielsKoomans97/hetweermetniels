import { Announcements } from "./announcements.js";
import { CookieManager } from "./cookies.js";
import { Locations } from "./locations.js";
import { MenuExpander } from "./nav-menu.js";
import { ObservationsWidget } from "./observations.js";
import { SmallerRadar } from "./radar-small.js";

new MenuExpander();
var cookieManager = new CookieManager();

if (HasElement('observations-widget') == true) {
    const widget = new ObservationsWidget(6340);
    await widget.Refresh();
}

if (HasElement('smaller-radar')){
    new SmallerRadar();
}

if (HasElement('warning-code')){
    const announcements = new Announcements();
    await announcements.RefreshHomeWidget();
}

if (HasElement('locations-list')){
    const locations = new Locations();
    const input = document.getElementById('search-query');
    const search_button = document.getElementById('search');

    search_button.addEventListener('click', async () => {
        await locations.PopulateLocationsList(input.value);
    });
}

function HasElement(element) {
    const el = document.getElementById(element);

    return el != null;
}
