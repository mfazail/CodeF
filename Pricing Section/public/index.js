document.addEventListener('alpine:init', () => {
    Alpine.data('swiper', () => ({
        swiper: null,
        init() {
            this.swiper = new Swiper(this.$el, {
                initialSlide: 1,
                centeredSlides: true,
                spaceBetween: 20,
                allowTouchMove: true,
                breakpoints: {
                    300: {
                        slidesPerView: 1.2,
                    },
                    400: {
                        slidesPerView: 1.4,
                    },
                    500: {
                        slidesPerView: 1.8,
                    },
                    600: {
                        slidesPerView: 2,
                    },
                    700: {
                        slidesPerView: 2.4,
                    },
                    800: {
                        slidesPerView: 2.8,
                    },
                    900: {
                        slidesPerView: 3,
                        allowTouchMove: false
                    },
                },
            });
        }
    }))
})