const cookie = document.cookie;

function ListCookies(){
    let cookies = [];
    let parts = cookie.split(';');

    for(part of parts){
        let keyvalue = part.split('=');
        let key = keyvalue[0].replace(' ', '');
        let value = keyvalue[1];
        cookies.push(new Cookie(key,value));
    }

    return cookies;
}

function ListLocations(){
    let cookies = ListCookies();
    let locations = [];

    for(cook of cookies){
        if (cook.indexOf('locationid') > 0){
            
        }
    }
}

function GetCookie(query){
    let parts = cookie.split(';');

    for(part of parts){
        let keyvalue = part.split('=');
        let key = keyvalue[0].replace(' ', '');
        let value = keyvalue[1];

        if (key == query){
            return new Cookie(key,value);
        }
    }
}

function HasCookie(query){
    let parts = cookie.split(';');

    for(part of parts){
        let keyvalue = part.split('=');
        let key = keyvalue[0].replace(' ', '');

        if (key == query){
            return true;
        }
    }
}

function SaveCookie(cookie){
    document.cookie = `${cookie.Key}=${cookie.Value}`
}

class Cookie{
    constructor(key,value){
        this.Key = key;
        this.Value = value;
    }
}

class Location{
    constructor(locationid,stationid){
        this.LocationId = locationid;
        this.StationId = stationid;
    }
}
