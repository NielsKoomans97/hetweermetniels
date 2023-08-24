const secondary_links = document.getElementById('nav-items');

async function AddSecondaryLinks() {
    await fetch("/links.json")
        .then((response) => (response.json())
            .then((data) => {
                for (let link of data) {
                    let linkBtn = document.createElement('a');

                    linkBtn.innerHTML = `<img src=\"${link['Favicon']}\">${link['SiteName']}`
                    linkBtn.setAttribute('target', '_blank');
                    linkBtn.setAttribute('href', link['Url']);
                    linkBtn.className = "secondary-item";

                    secondary_links.appendChild(linkBtn);
                }
            }));
}

AddSecondaryLinks();
