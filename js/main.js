import { Animator } from "./animator.js";
import { DataProvider } from "./provider.js";

const provider = new DataProvider();
await provider.UpdateRadarItems();

await InitRadarItems();

async function InitRadarItems(){
    const radarItems = document.querySelectorAll('.radar-item');

    const data =await fetch('/../definitions.json');
    const json = await data.json();

    for(let i = 0;i < json.length; i++){
        const radarItem = radarItems[i];
        const definitionItem = json[i];

        if (definitionItem['Type'] == ''){
            const animator = new Animator('Observations',radarItem);
        }
        else{
            const animator = new Animator(definitionItem['Type'],radarItem);

        }

    }
}
