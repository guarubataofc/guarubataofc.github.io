// Menu Hambúrguer
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navUl = document.querySelector('.nav ul');

    console.log('Menu JS loaded. Hamburger:', hamburger, 'Nav UL:', navUl);

    if (hamburger && navUl) {
        const toggleMenu = () => {
            console.log('Toggling menu');
            navUl.classList.toggle('open');
            hamburger.classList.toggle('open'); // Adiciona classe para animação X
        };

        hamburger.addEventListener('click', (e) => {
            e.preventDefault(); // Previne comportamento padrão
            toggleMenu();
        });

        // Navegação por teclado
        hamburger.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleMenu();
            }
        });

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

        // Fecha o menu com Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navUl.classList.contains('open')) {
                navUl.classList.remove('open');
            }
        });
    } else {
        console.error('Hamburger or Nav UL not found');
    }
});