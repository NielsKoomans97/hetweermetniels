const secondary_links = document.getElementById('nav-items');
const collapse_button = document.getElementById('secondary-nav-expand');
const secondary_nav = document.getElementById('secondary-nav');


if (collapse_button != null){
    collapse_button.addEventListener('click', () => {
        const collapsed = secondary_nav.getAttribute('data-collapsed');

        if (collapsed == 'collapsed'){
            secondary_nav.setAttribute('data-collapsed','expanded');
            collapse_button.innerHTML = '<i class="fa-solid fa-chevron-up"></i>';
        }
        else{
            secondary_nav.setAttribute('data-collapsed','collapsed');
            collapse_button.innerHTML = '<i class="fa-solid fa-chevron-down"></i>';
        }
    });
}

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
