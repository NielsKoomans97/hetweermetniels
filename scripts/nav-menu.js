export class MenuExpander{
    constructor(){
        const menuButton = document.getElementById('nav-expand');
        const navBar = document.getElementById('nav-bar');

        menuButton.addEventListener('click', () => {
            const expanded = navBar.getAttribute('data-expanded');

            if (expanded == 'collapsed'){
                navBar.setAttribute('data-expanded','expanded');
            }
            else{
                navBar.setAttribute('data-expanded','collapsed');
            }
        });
    }
}
