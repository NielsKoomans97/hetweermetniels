import { SmallObservations } from "./small-observations.js";
import { SmallRadar } from "./small-radar.js";

if (CheckElement('.observations')){
    new SmallObservations();
}

if (CheckElement('#small-radar')){
    new SmallRadar();
}

function CheckElement(element){
    return document.querySelector(element) != null;
}
