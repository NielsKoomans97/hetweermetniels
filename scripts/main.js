import { SmallObservations } from "./small-observations.js";

if (CheckElement('.observations')){
    new SmallObservations();
}

function CheckElement(element){
    return document.querySelector(element) != null;
}
