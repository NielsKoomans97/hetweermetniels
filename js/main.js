import { DataProvider } from "./provider.js";

const provider = new DataProvider();
await provider.UpdateRadarItems();

// setInterval(async () => {
//     const date = new Date();
//     const minute = date.getMinutes();

//     for(let i = 0; i < 6; i++){
//         if (minute == (i * 10)){
//             await provider.UpdateRadarItems();
//         }
//     }
// }, 1000);
