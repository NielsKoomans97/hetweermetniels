import { CookieManager } from "./cookies.js";
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

function HasElement(element) {
    const el = document.getElementById(element);

    return el != null;
}
