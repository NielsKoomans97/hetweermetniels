export class Locations{
    async PopulateLocationsList(query){
        const locations_list = document.getElementById('locations-list');
        const data = await fetch(`https://location.buienradar.nl/1.1/location/search?query=${query}`);
        const json = await data.json();

        if (json.length > 0){
            json.forEach(element => {
                let locationItem = document.createElement('a');
                locationItem.innerText = element['name'];

                let locationFoad = document.createElement('h4');
                locationFoad.className = 'location-foad';
                locationFoad.innerText = element['countrycode'];
                locationItem.appendChild(locationFoad);

                locations_list.appendChild(locationItem);
             });

             locations_list.setAttribute('data-visible','visible');
        }
    }
}
