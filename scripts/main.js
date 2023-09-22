import { MenuExpander } from "./nav-menu.js";
import { ObservationsWidget } from "./observations.js";

new MenuExpander();
const widget = new ObservationsWidget(6340);
await widget.Refresh();
