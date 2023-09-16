const warnings_list = document.getElementById('warnings-list');

async function GetAnnouncementList() {
    var data = await fetch('https://data.buienradar.nl/1.0/announcements/apps');
    var json = await data.json();

    var locations = json['warnings']['locations'];
    locations.forEach((element) => {
        let location = document.createElement('div');
        location.classList.add('col', 'grid', 'announcement');
        location.setAttribute('data-expanded', 'expanded');

        BuildAnnouncementLocation(location, element);
        warnings_list.appendChild(location);
    });

    if(locations.length < 1){
        let no_warnings = document.createElement('h4');
        no_warnings.innerText = 'Er zijn geen waarschuwingen. Code Groen.';
        warnings_list.appendChild(no_warnings);
    }

    GetDailySummaries(json);
}

function BuildAnnouncementLocation(root, data) {
    BuildLocationTitle(root, data);
    BuildLocationWarnings(root, data);
}

function BuildLocationTitle(root, data) {
    let title = document.createElement('div');
    title.classList.add('col', 'grid', 'announcement-title');

    let titleContainer = document.createElement('div');
    titleContainer.classList.add('col', 'flex-column');

    let name = document.createElement('h4');
    name.innerText = data['name'];
    name.id = "announcement-name";
    titleContainer.appendChild(name);

    let warningCount = document.createElement('h6');
    const warnings = data['alerts'];
    warningCount.innerText = `${warnings.length} waarschuwing(en)`;
    warningCount.id = "announcement-count";
    titleContainer.appendChild(warningCount);

    title.appendChild(titleContainer);

    let expandButton = document.createElement('button');
    expandButton.className = 'announcement-expand';
    expandButton.innerHTML = '<i class="fa-solid fa-chevron-up"></i>';
    expandButton.setAttribute('onclick', 'Expand(this)');
    title.appendChild(expandButton);

    root.appendChild(title);
}

function Expand(element) {
    var parent = element.parentElement.parentElement;
    var expanded = parent.getAttribute('data-expanded');

    if (expanded == "expanded"){
        parent.setAttribute('data-expanded','collapsed');
        element.innerHTML = '<i class="fa-solid fa-chevron-down"></i>';
    }
    else{
        parent.setAttribute('data-expanded','expanded');
        element.innerHTML = '<i class="fa-solid fa-chevron-up"></i>';
    }
}

function BuildLocationWarnings(root, data) {
    let alertsContainer = document.createElement('div');
    alertsContainer.classList.add('col', 'grid', 'announcement-alerts');

    const alerts = data['alerts'];
    alerts.forEach(element => {
        BuildAlert(alertsContainer, element);
    });

    root.appendChild(alertsContainer);
}

function BuildAlert(root, data) {
    let alertContainer = document.createElement('div');
    alertContainer.className = 'announcement-alert';
    alertContainer.setAttribute('data-color', data['color']);

    let alertText = document.createElement('h6');
    alertText.innerText = data['text'];
    alertContainer.appendChild(alertText);

    root.appendChild(alertContainer);
}

function GetDailySummaries(data){
    const summaries = data['warnings']['daySummaries'];
    const day1 = summaries['day1'];
    const day2 = summaries['day2'];

    const tDay1 = document.getElementById('day1');
    const tDay2 = document.getElementById('day2');

    tDay1.setAttribute('src',day1['image']);
    tDay2.setAttribute('src',day2['image']);
}

GetAnnouncementList();
