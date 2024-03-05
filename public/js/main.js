import { RadarAnimator } from "./radarAnimator.js";
import { SmallObs } from "./small-obs.js";

new SmallObs(6350);

const temperature = document.querySelector('.radar-item .frame-list[data-type="WeatherMapActualTemperature10mNL"]') .parentElement;
const radar = document.querySelector('.radar-item .frame-list[data-type="radarnl-observations"]').parentElement;

new RadarAnimator(temperature);
new RadarAnimator(radar);
