const search_button = document.getElementById('search-button');
search_button.addEventListener('click', SearchLocations);

function ClearAll(element) {
    var delChild = element.lastChild;
    while (delChild) {
        element.removeChild(delChild);
        delChild = element.lastChild;
    }
}

const savedLocations = document.getElementById('locations');
const locationItems = ListLocations();

locationItems.forEach(function (savedItem) {
    CreateSavedLocationItem(savedItem, savedLocations);
});

function CreateSavedLocationItem(item, root) {
    let parsed = JSON.parse(item);
    let savedLocation = document.createElement('div');
    savedLocation.className = 'saved-location';

    let locationName = document.createElement('h6');
    locationName.innerText = parsed['name'];
    locationName.className = 'location-name';
    savedLocation.appendChild(locationName);

    if (parsed['foad'] != null) {
        let locationFoad = document.createElement('p');
        locationFoad.innerText = `${parsed['foad']['name']}, ${parsed['country']}`;
        locationFoad.className = 'location-foad';
        savedLocation.appendChild(locationFoad);
    }

    root.appendChild(savedLocation);
}

async function SearchLocations() {
    const query = document.getElementById('search-query');
    const resultoverview = document.getElementById('results');

    let data = await Search(query.value);

    ClearAll(resultoverview);
    data.forEach(function (item) {
        CreateSearchResult(item, resultoverview);
    });
}

function CreateSearchResult(data, root) {
    let result = document.createElement('div');
    result.className = 'search-result';

    let locationName = document.createElement('h6');
    locationName.innerText = data['name'];
    locationName.className = 'location-name';
    result.appendChild(locationName);

    let locationFoad = document.createElement('p');
    let country = '';
    if (data['foad'] != null) {
        country = `${data['foad']['name']}, `;
    }
    
    if (data['country'] != null) {
        country += `${data['country']}`;
    }

    if (country != ''){
        locationFoad.innerText = country;
    }
    else {
        locationFoad.innerText = "Ligt ergens in het buitenland";
    }

    locationFoad.className = 'location-foad';
    result.appendChild(locationFoad);

    let addButton = document.createElement('button');
    addButton.innerHTML = '<i class="fa-solid fa-plus"></i>';
    addButton.className = 'add-location';
    addButton.setAttribute('onclick', 'AddLocation(this)');

    result.appendChild(addButton);

    result.setAttribute('data-json', JSON.stringify(data));

    root.appendChild(result);
}

function AddLocation(element) {
    let json = element.parentElement.getAttribute('data-json');

    SaveLocation(json);
}