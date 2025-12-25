const popup = document.getElementById("popup-overlay")
const popup_open_button = document.getElementById("show-popup")
const popup_close_button = document.getElementById("popup-close")

popup_open_button.addEventListener('click', () => {
    popup.style.display = 'flex'
})

popup_close_button.addEventListener('click', () => {
    popup.style.display = 'none'
})

window.addEventListener('click', (event) => {
            if (event.target === popup) {
                popup.style.display = 'none';
            }
});

const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');


function hideAllTabs() {
    tabContents.forEach(content => {
        content.classList.remove('active');
    });

    tabButtons.forEach(button => {
        button.classList.remove('active');
    });
}

function openTab(tabName) {
    hideAllTabs();


    const targetContent = document.getElementById(tabName);
    const targetButton = document.querySelector(`[data-tab="${tabName}"]`);

    if (targetContent && targetButton) {
        targetContent.classList.add('active');
        targetButton.classList.add('active');
    }
}

tabButtons.forEach(button => {
    button.addEventListener('click', function() {
        const tabName = this.dataset.tab;
        openTab(tabName);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    hideAllTabs();
    openTab('tab1');
});

document.querySelectorAll('.tooltip').forEach(trigger => {
    trigger.addEventListener('mouseover', function() {
        const tooltip = this.parentElement.querySelector('.tooltip-text');
        tooltip.style.display = 'block';
    });

    trigger.addEventListener('mouseout', function() {
        const tooltip = this.parentElement.querySelector('.tooltip-text');
        tooltip.style.display = 'none';
    });
});

const items = Array.from(document.querySelectorAll(".accordion-item")); 

items.forEach((item) => {
    const header = item.querySelector(".accordion-header");
    header.addEventListener("click", boxHandler);
});

function boxHandler(e) {
    e.preventDefault();

    const currentItem = e.target.closest(".accordion-item");
    const currentContent = currentItem.querySelector(".accordion-content");


    items.forEach((item) => {
        if (item !== currentItem) {
            item.classList.remove("active");
            const content = item.querySelector(".accordion-content");
            content.style.maxHeight = null;
        }
    });

    currentItem.classList.toggle("active");

    if (currentItem.classList.contains("active")) {
        currentContent.style.maxHeight = currentContent.scrollHeight + "px";
    } else {
        currentContent.style.maxHeight = null;
    }
}


document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.slider-dot');
    const btnLeft = document.getElementById('btn_left');
    const btnRight = document.getElementById('btn_right');

    let currentSlide = 0;
    const slideCount = slides.length;
    let autoSlideInterval;

    function goToSlide(index) {
        if (index < 0) {
            index = slideCount - 1;
        } else if (index >= slideCount) {
            index = 0;
        }


        slider.style.transform = `translateX(-${index * 100}%)`;

        dots.forEach(dot => dot.classList.remove('active'));
        dots[index].classList.add('active');

        currentSlide = index;
    }

    function nextSlide() {
        goToSlide(currentSlide + 1);
    }


    function prevSlide() {
        goToSlide(currentSlide - 1);
    }

    btnRight.addEventListener('click', nextSlide);
    btnLeft.addEventListener('click', prevSlide);


    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            const slideIndex = parseInt(this.getAttribute('data-index'));
            goToSlide(slideIndex);
            resetAutoSlide(); 
        });
    });

    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000); 
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    startAutoSlide();


    slider.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });

    slider.addEventListener('mouseleave', () => {
        startAutoSlide();
    });
}); 