export class Announcements {
    constructor() {

    }

    async RefreshHomeWidget()
    {
        const warning_code = document.getElementById('warning-code');
        const warning_description = document.getElementById('warning-description');
        const data = await fetch('https://data.buienradar.nl/1.0/announcements/apps');
        const json = await data.json();

        const warnings = json['warnings']['locations'];

        if (warnings.count > 0){
            warning_description.innerText = `Voor ${warnings.count} provincies`;
        }
        else{
            warning_description.innerText = '';
        }

        switch(json['warnings']['color']){
            case 'YELLOW': warning_code.innerText = `Code Geel`; break;
            case 'GREEN': warning_code.innerText = 'Geen waarschuwingen'; break;
            case 'RED': warning_code.innerText = 'Code Rood'; break;
            case 'ORANGE': warning_code.innerText = 'Code Oranje'; break;
        }
    }

    async RefreshPage(){

    }
}
