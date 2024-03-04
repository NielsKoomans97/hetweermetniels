import { RadarAnimator } from "./radarAnimator.js";
import { SmallObs } from "./small-obs.js";

new SmallObs(6350);

const item = document.querySelector('.radar-item .frame-list[data-type="WeatherMapActualTemperature10mNL"]') .parentElement;
console.log(item);

new RadarAnimator(item);
