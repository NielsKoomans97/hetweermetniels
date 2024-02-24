import { SmallObservations } from "./small-observations.js";
import { SmallRadar } from "./small-radar.js";

if (CheckElement('.observations')){
    new SmallObservations();
}

if (CheckElement('#sm-radar-container')){
    new SmallRadar();
}

function CheckElement(element){
    return document.querySelector(element) != null;
}
