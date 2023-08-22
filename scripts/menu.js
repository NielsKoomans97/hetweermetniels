const larger_menu = document.getElementById('larger-menu');
larger_menu.addEventListener('click', () => {
    const menu = document.getElementById('menu');
    const primary_nav = document.getElementById('main-nav');
    const secondary_nav = document.getElementById('secondary-nav');
    const logo_inner = document.getElementById('logo-inner');
    

    menu.setAttribute('style','width: 108px');
    primary_nav.setAttribute('style','display:none');
    secondary_nav.setAttribute('style','display:none');
    logo_inner.setAttribute('style','display:none !important')
});