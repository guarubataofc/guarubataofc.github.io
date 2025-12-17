document.addEventListener('DOMContentLoaded', () => {

    // Função para inicializar carousels principais (slides full-width com dots)
    function initMainCarousel(carousel) {
        const track = carousel.querySelector('.carousel-track');
        const slides = carousel.querySelectorAll('.carousel-slide');
        const dotsWrap = carousel.querySelector('.carousel-dots');
        const prevBtn = carousel.querySelector('.carousel-arrow.prev');
        const nextBtn = carousel.querySelector('.carousel-arrow.next');

        if (!track || !slides.length || !dotsWrap || !prevBtn || !nextBtn) return;

        let currentIndex = 0;
        let interval;

        // Gera dots automaticamente
        dotsWrap.innerHTML = '';
        slides.forEach((_, i) => {
            const btn = document.createElement('button');
            btn.className = 'dot' + (i === 0 ? ' active' : '');
            btn.dataset.slide = i;
            dotsWrap.appendChild(btn);
        });

        const dots = carousel.querySelectorAll('.dot');

        function goToSlide(index) {
            if (index < 0) index = slides.length - 1;
            if (index >= slides.length) index = 0;

            track.style.transform = `translateX(-${index * 100}%)`;

            dots.forEach(d => d.classList.remove('active'));
            dots[index].classList.add('active');

            currentIndex = index;
        }

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                goToSlide(index);
                resetAutoPlay();
            });
        });

        prevBtn.addEventListener('click', () => {
            goToSlide(currentIndex - 1);
            resetAutoPlay();
        });

        nextBtn.addEventListener('click', () => {
            goToSlide(currentIndex + 1);
            resetAutoPlay();
        });

        function startAutoPlay() {
            interval = setInterval(() => {
                goToSlide(currentIndex + 1);
            }, 7000);
        }

        function stopAutoPlay() {
            clearInterval(interval);
        }

        function resetAutoPlay() {
            stopAutoPlay();
            startAutoPlay();
        }

        carousel.addEventListener('mouseenter', stopAutoPlay);
        carousel.addEventListener('mouseleave', startAutoPlay);

        startAutoPlay();
    }

    // Função para inicializar carousels de elenco/galeria (cards horizontais)
    function initElencoCarousel(elencoCarousel) {
        const track = elencoCarousel.querySelector('.elenco-track');
        const cards = elencoCarousel.querySelectorAll('.jogador-card');
        const prevBtn = elencoCarousel.querySelector('.elenco-arrow.prev');
        const nextBtn = elencoCarousel.querySelector('.elenco-arrow.next');

        if (!track || !cards.length || !prevBtn || !nextBtn) return;

        let index = 0;
        let interval;

        function getCardMetrics() {
            const card = cards[0];
            const gap = parseInt(getComputedStyle(track).gap) || 0;
            const cardWidth = card.offsetWidth + gap;
            const visibleCards = Math.floor(elencoCarousel.offsetWidth / cardWidth);
            return { cardWidth, visibleCards };
        }

        function updateCarousel() {
            const { cardWidth } = getCardMetrics();
            track.style.transform = `translateX(-${index * cardWidth}px)`;
        }

        function nextSlide() {
            const { visibleCards } = getCardMetrics();
            if (index < cards.length - visibleCards) {
                index++;
            } else {
                index = 0; // volta para o início
            }
            updateCarousel();
        }

        function prevSlide() {
            if (index > 0) {
                index--;
            } else {
                index = 0;
            }
            updateCarousel();
        }

        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetAutoPlay();
        });

        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetAutoPlay();
        });

        function startAutoPlay() {
            interval = setInterval(nextSlide, 7000);
        }

        function stopAutoPlay() {
            clearInterval(interval);
        }

        function resetAutoPlay() {
            stopAutoPlay();
            startAutoPlay();
        }

        elencoCarousel.addEventListener('mouseenter', stopAutoPlay);
        elencoCarousel.addEventListener('mouseleave', startAutoPlay);

        window.addEventListener('resize', updateCarousel);

        startAutoPlay();
    }

    // Inicializar carousel principal
    const mainCarousel = document.querySelector('.carousel');
    if (mainCarousel) {
        initMainCarousel(mainCarousel);
    }

    // Inicializar todos os carousels de elenco/galeria
    const elencoCarousels = document.querySelectorAll('.elenco-carousel');
    elencoCarousels.forEach(initElencoCarousel);
});