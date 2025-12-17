document.addEventListener('DOMContentLoaded', () => {

    const tabelaCarousel = document.querySelector('.tabela-carousel');
    if (!tabelaCarousel) return;

    const track = tabelaCarousel.querySelector('.tabela-track');
    const cards = tabelaCarousel.querySelectorAll('.jogo-card');
    const prevBtn = tabelaCarousel.querySelector('.tabela-arrow.prev');
    const nextBtn = tabelaCarousel.querySelector('.tabela-arrow.next');

    let index = 0;
    let interval;

    function getVisibleCards() {
        const cardWidth = cards[0].offsetWidth;
        const gap = parseInt(getComputedStyle(track).gap) || 0;
        const containerWidth = tabelaCarousel.offsetWidth;
        return Math.max(1, Math.floor(containerWidth / (cardWidth + gap)));
    }

    function getCardWidth() {
        const card = cards[0];
        const gap = parseInt(getComputedStyle(track).gap) || 0;
        return card.offsetWidth + gap;
    }

    function updateCarousel() {
        const cardWidth = getCardWidth();
        track.style.transform = `translateX(-${index * cardWidth}px)`;
    }

    function nextSlide() {
        const visible = getVisibleCards();
        const maxIndex = cards.length - visible;

        if (index < maxIndex) {
            index += visible;
        } else {
            index = 0;
        }

        updateCarousel();
    }

    function prevSlide() {
        const visible = getVisibleCards();

        if (index >= visible) {
            index -= visible;
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
        interval = setInterval(nextSlide, 8000);
    }

    function stopAutoPlay() {
        clearInterval(interval);
    }

    function resetAutoPlay() {
        stopAutoPlay();
        startAutoPlay();
    }

    tabelaCarousel.addEventListener('mouseenter', stopAutoPlay);
    tabelaCarousel.addEventListener('mouseleave', startAutoPlay);

    window.addEventListener('resize', () => {
        index = 0;
        updateCarousel();
    });

    startAutoPlay();
});