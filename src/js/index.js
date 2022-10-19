





// const myCarouselElement = document.querySelector('#carouselExampleIndicators')
// const carousel = new bootstrap.Carousel(myCarouselElement, {
//     interval: 2000,
//     wrap: false
// })


document.addEventListener('DOMContentLoaded', function () {
    //new Splide('.splide').mount();
    var splide =  new Splide('.splide', {
        type: 'loop',
       
     
        perPage: 1,
        perMove:1,
        breakpoints: {
            820: {
               // height: '6rem',
                perPage: 1,
            },
            1020:{
                perPage: 2,
                gap:10,
            },
            2400:{
                perPage: 3,
                gap: 10,
            }
        },
    });

    splide.mount();
});

