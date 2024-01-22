import { Animator } from "./animator.js";
import { Slideshow } from "./slideshow.js";
import { Warnings } from "./warnings.js";

const simulcast = document.querySelector('.content.simulcast');

if (simulcast != null){
    InitRadarItems();

    async function InitRadarItems() {
        const radarItems = document.querySelectorAll('.radar-item');

        const data = await fetch('/../definitions.json');
        const json = await data.json();

        for (let i = 0; i < json.length; i++) {
            const definitionItem = json[i];

            radarItems.forEach(radarItem => {
                if (radarItem.id == definitionItem['Type']) {
                    new Animator(definitionItem, radarItem);
                }
            });
        }
    }

    new Slideshow(document.querySelector('.slideshow'));
    new Warnings();
}
