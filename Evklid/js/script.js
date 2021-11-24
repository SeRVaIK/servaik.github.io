// Инициализация слайдера
const swiper = new Swiper('.hero__swiper-body', {
    loop: true,
    pagination: {
        el: '.hero__swiper-pagination',
        clickable: true,
    },
    autoplay: {
        delay: 15000,
    },
});

// Организация меню бюргер
const menuBody = document.querySelector('.menu');
const iconBurger = document.querySelector('.header__burger');

iconBurger.addEventListener('click', () => {
    if (iconBurger) {
        iconBurger.classList.toggle('_active_burger');
        menuBody.classList.toggle('_active_burger');
    }
});

// Плавный переход по разделам
const menuLinks = document.querySelectorAll('.menu__link[data-goto]');
if (menuLinks.length > 0) {
    menuLinks.forEach(menuLink => {
        menuLink.addEventListener('click', onMenuLinkClick);
    });

    function onMenuLinkClick(e) {
        const menuLink = e.target;
        if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {

            const goToSection = document.querySelector(menuLink.dataset.goto);
            const goToSectionValue = goToSection.getBoundingClientRect().top + scrollY - document.querySelector('.header').offsetHeight;

            if (iconBurger.classList.contains('_active_burger')) {
                iconBurger.classList.remove('_active_burger');
                menuBody.classList.remove('_active_burger');
            }
            window.scrollTo({
                top: goToSectionValue,
                behavior: 'smooth'
            })
            e.preventDefault();
        }
    }
}

// Реализация табов
const tabsLinks = document.querySelectorAll('.tabs__item');
const tabs = document.querySelectorAll('.tabs__content');

if (tabsLinks.length > 0) {
    tabsLinks.forEach((link) => {
        link.addEventListener('click', (e) => {
            tabs.forEach((tab) => { tab.classList.remove('_active_tab'); });
            tabsLinks.forEach((link) => { link.classList.remove('_active_tab'); });

            const id = e.currentTarget.getAttribute('href').replace('#', '');
            e.currentTarget.classList.add('_active_tab');
            const currentTab = document.getElementById(id);
            currentTab.classList.add('_active_tab');

            e.preventDefault();
        });
    });
}

// Открывающиеся спойлеры
const spoilers = document.querySelectorAll('.spoiler__item');

spoilers.forEach((spoiler) => {
    spoiler.addEventListener('click', (e) => {
        e.preventDefault();

        currText = e.currentTarget.querySelector('.spoiler__text');

        if (!spoiler.classList.contains('_active_spoiler')) {

            spoiler.classList.add('_active_spoiler');
            currText.style.height = 'auto';

            let height = currText.clientHeight + 'px';

            currText.style.height = '0px';

            setTimeout(() => {
                currText.style.height = height;
            }, 0);
        } else {
            currText.style.height = '0px';

            spoiler.classList.remove('_active_spoiler');
        }
    });
});

// Выплывающий поиск
const form = document.querySelector('.search__container');

document.querySelector('.header__container').addEventListener('click', () => {
    form.classList.add('_open__search');
    document.querySelector('.search__icon').classList.add('_open__search');
});

document.addEventListener('click', (e) => {
    let target = e.target;
    let input = form.querySelector("input");
    if (!target.closest('.search')) {
        form.classList.remove('_open__search');
        document.querySelector('.search__icon').classList.remove('_open__search');
        input.value = "Что будем искать?";
        console.log(target);
    }
    if (target.closest('.search__clearer') || target == input) {
        input.value = "";
        input.focus();
    }
});
