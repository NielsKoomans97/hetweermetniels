export class Scroller{
    constructor(){
        const scroller = document.querySelectorAll('.content-scroller');

        console.log(scroller);

        scroller.forEach(element => {
            const upButton = element.querySelector('.scroll-up');
            const downButton = element.querySelector('.scroll-down');
            const parent = Up(element, 1);
            const dataScroll = parent.querySelector('[data-scroll]');

            upButton.addEventListener('click', (event) => {
                dataScroll.scrollBy(0, -150);
            });

            downButton.addEventListener('click', (event) => {
                dataScroll.scrollBy(0, 150);
            });
        });

        function Up(element, levels){
            let result = element;

            for(let i = 0; i < levels; i++){
                result = result.parentElement;
            }

            return result;
        }
    }
}
