import { SmallObservations } from "./small-observations";

if (CheckElement('.observations')){
    console.log('weer');

    new SmallObservations();
}

function CheckElement(element){
    return document.querySelector(element) != null;
}
