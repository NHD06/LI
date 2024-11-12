document.addEventListener("DOMContentLoaded", function() {
    const items = document.querySelectorAll('.slide-item');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentIndex = 0;
    let interval;

    function resetAnimations(item) {
        const moveFromTopElements = item.querySelectorAll('.move-from-top');
        const zoomInElements = item.querySelectorAll('.zoom-in');
        const sliderDescElements = item.querySelectorAll('.slider-desc');
        const buttonsElements = item.querySelectorAll('.buttons');

        moveFromTopElements.forEach((el) => {
            el.classList.remove('visible-top');
            setTimeout(() => el.classList.add('visible-top'), 50);
        });

        zoomInElements.forEach((el) => {
            el.classList.remove('visible');
            setTimeout(() => el.classList.add('visible'), 50);
        });

        sliderDescElements.forEach((el) => {
            el.classList.remove('visible-fading');
            setTimeout(() => el.classList.add('visible-fading'), 50);
        });

        buttonsElements.forEach((el) => {
            el.classList.remove('move-from-bottom');
            setTimeout(() => el.classList.add('move-from-bottom'), 50);
        });
    }

    function showItem(index) {
        items[currentIndex].classList.remove('active');
        currentIndex = (index + items.length) % items.length;
        items[currentIndex].classList.add('active');
        resetAnimations(items[currentIndex]);
    }

    function showNextItem() {
        showItem(currentIndex + 1);
    }

    function showPrevItem() {
        showItem(currentIndex - 1);
    }

    nextBtn.addEventListener('click', function() {
        clearInterval(interval);
        showNextItem();
        startAutoSlide();
    });

    prevBtn.addEventListener('click', function() {
        clearInterval(interval);
        showPrevItem();
        startAutoSlide();
    });

    function startAutoSlide() {
        interval = setInterval(showNextItem, 8000);
    }

    // Initialize the first item
    items[currentIndex].classList.add('active');
    resetAnimations(items[currentIndex]);
    startAutoSlide();
});

const navItems = document.querySelectorAll('.nav-item');
const navSlider = document.querySelector('.nav-slider');

// Function to move the slider
function moveSlider(item) {
    const rect = item.getBoundingClientRect();
    const navListRect = item.parentElement.getBoundingClientRect();
    
    navSlider.style.width = `${rect.width}px`;
    navSlider.style.left = `${rect.left - navListRect.left}px`;
}

// Add event listeners to each nav item
navItems.forEach(item => {
    item.addEventListener('mouseenter', () => moveSlider(item));
});

// Optionally, reset the slider when the mouse leaves the menu
document.querySelector('.nav-menu').addEventListener('mouseleave', () => {
    navSlider.style.width = `0px`;
});



