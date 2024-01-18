export class Slideshow {
    constructor(element) {
        const radarItems = element.querySelectorAll('.radar-item');
        let index = 0;

        radarItems.forEach(radarItem => {
            radarItem.classList.add('active');
        });

        setInterval(() => {
            radarItems.forEach(radarItem => {
                radarItem.classList.replace('active', 'hidden');
            });

            radarItems[index].classList.replace('hidden', 'active');

            if (index == (radarItems.length - 1)) {
                index = 0;
            } else {
                index++;
            }
        }, 15000);
    }
}
