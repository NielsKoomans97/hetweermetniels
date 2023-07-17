var location_name = HasCookie('location-name') ? GetCookie('location-name').Value : 'Jouw locatie heeft geen waarde';
var location_id = HasCookie('location-id') ? parseInt(GetCookie('location-id').Value) : 0;

const locationName = document.getElementById('location-name');
const locationId = document.getElementById('location-id');

locationName.placeholder = location_name;
locationId.innerText = location_id;