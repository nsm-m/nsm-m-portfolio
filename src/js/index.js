



// const myCarouselElement = document.querySelector('#carouselExampleIndicators')
// const carousel = new bootstrap.Carousel(myCarouselElement, {
//     interval: 2000,
//     wrap: false
// })

new Splide('.splide', {
    type: 'loop',
    height: '9rem',
    perPage: 2,
    breakpoints: {
        640: {
            height: '6rem',
        },
    },
});
document.addEventListener('DOMContentLoaded', function () {
    new Splide('.splide').mount();
});
