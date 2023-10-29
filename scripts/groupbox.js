export class GroupBox {
    constructor(){
        const expandButtons = document.querySelectorAll('.expand');

        expandButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const target = event.target;
                const parent = Up(target, 3);

                const content = parent.querySelectorAll('.groupbox-content')[0];
                const expanded = content.getAttribute('data-visible');

                if (expanded == 'collapsed'){
                    content.setAttribute('data-visible','visible');

                    button.setAttribute('data-flipped','flipped');
                }
                else{
                    content.setAttribute('data-visible','collapsed');

                    button.setAttribute('data-flipped', 'normal');
                }

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
