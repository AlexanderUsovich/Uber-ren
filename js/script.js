window.addEventListener('DOMContentLoaded', function() {
    
    const hamb = document.querySelector('.hamburger'),
          menu = document.querySelector('.menu__list'),
          links = document.querySelectorAll('.menu__link');

    hamb.addEventListener('click', () => {
        hamb.classList.toggle('hamburger_active');
        menu.classList.toggle('menu__list_active');
    });

    for(let link of links) {
        link.addEventListener('click', ()=> {
            hamb.classList.remove('hamburger_active');
            menu.classList.remove('menu__list_active');
        })
    }

})