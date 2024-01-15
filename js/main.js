import { Animator } from "./animator.js";

InitRadarItems();

async function InitRadarItems() {
    const radarItems = document.querySelectorAll('.radar-item');

    const data = await fetch('/../definitions.json');
    const json = await data.json();

    for (let i = 0; i < json.length; i++) {
        const radarItem = radarItems[i];
        const definitionItem = json[i];

        const animator = new Animator(definitionItem, radarItem);
    }
}
