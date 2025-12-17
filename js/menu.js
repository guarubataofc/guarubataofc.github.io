// Menu Hambúrguer
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navUl = document.querySelector('.nav ul');

    if (hamburger && navUl) {
        const toggleMenu = () => {
            navUl.classList.toggle('open');
        };

        hamburger.addEventListener('click', toggleMenu);
        hamburger.addEventListener('touchstart', toggleMenu); // Para mobile

        // Fecha o menu ao clicar em um link
        navUl.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') {
                navUl.classList.remove('open');
            }
        });

        // Fecha o menu ao clicar fora
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navUl.contains(e.target)) {
                navUl.classList.remove('open');
            }
        });
    }
});