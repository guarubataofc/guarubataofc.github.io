document.addEventListener('DOMContentLoaded', () => {

    const carousel = document.querySelector('.patrocinadores-carousel');
    if (!carousel) return;

    const track = carousel.querySelector('.patrocinadores-track');
    const items = carousel.querySelectorAll('img');
    const prevBtn = carousel.querySelector('.patrocinador-arrow.prev');
    const nextBtn = carousel.querySelector('.patrocinador-arrow.next');

    let index = 0;
    let interval;

    function getItemMetrics() {
        const item = items[0];
        const gap = parseInt(getComputedStyle(track).gap) || 0;
        const itemWidth = item.offsetWidth + gap;
        const visibleItems = Math.floor(carousel.offsetWidth / itemWidth);
        return { itemWidth, visibleItems };
    }

    function updateCarousel() {
        const { itemWidth } = getItemMetrics();
        track.style.transform = `translateX(-${index * itemWidth}px)`;
    }

    function nextSlide() {
        const { visibleItems } = getItemMetrics();
        if (index < items.length - visibleItems) {
            index++;
        } else {
            index = 0;
        }
        updateCarousel();
    }

    function prevSlide() {
        if (index > 0) {
            index--;
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

    carousel.addEventListener('mouseenter', stopAutoPlay);
    carousel.addEventListener('mouseleave', startAutoPlay);

    window.addEventListener('resize', updateCarousel);

    startAutoPlay();
});
