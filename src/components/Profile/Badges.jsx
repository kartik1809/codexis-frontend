import React, { useEffect } from 'react';
import 'flowbite/dist/flowbite.min.css';

const Badges = () => {
    useEffect(() => {
        const initCarousel = () => {
            const carouselElements = document.querySelectorAll('[data-carousel]');
            carouselElements.forEach((carousel) => {
                const items = carousel.querySelectorAll('[data-carousel-item]');
                const prevButton = carousel.querySelector('[data-carousel-prev]');
                const nextButton = carousel.querySelector('[data-carousel-next]');

                let currentIndex = 0;

                const showSlide = (index) => {
                    items.forEach((item, i) => {
                        item.classList.toggle('block', i === index);
                        item.classList.toggle('hidden', i !== index);
                    });
                };

                showSlide(currentIndex);

                if (prevButton) {
                    prevButton.addEventListener('click', () => {
                        currentIndex = (currentIndex - 1 + items.length) % items.length;
                        showSlide(currentIndex);
                    });
                }

                if (nextButton) {
                    nextButton.addEventListener('click', () => {
                        currentIndex = (currentIndex + 1) % items.length;
                        showSlide(currentIndex);
                    });
                }
            });
        };

        initCarousel();
    }, []);

    return (
        <div className="w-full h-32">
            <div id="default-carousel" className="relative w-full h-32" data-carousel="slide">
                <div className="relative h-36 overflow-hidden rounded-lg md:h-36">
                    <div className="hidden duration-700 ease-in-out flex flex-col items-center gap-2" data-carousel-item>
                        <img
                            src="https://i.ibb.co/DzCKv9W/carousel-1.jpg"
                            className="absolute block w-32 h-32 object-cover -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                            alt="Carousel Image 1"
                        />
                        <h4 className='font-semibold'>5 day streak</h4>
                    </div>
                    <div className="hidden duration-700 ease-in-out" data-carousel-item>
                        <img
                            src="https://i.ibb.co/Y2L2dMb/carousel-2.jpg"
                            className="absolute block  w-32 h-32 object-cover -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                            alt="Carousel Image 2"
                        />
                    </div>
                    <div className="hidden duration-700 ease-in-out" data-carousel-item>
                        <img
                            src="https://i.ibb.co/nBfZWZY/carousel-3.jpg"
                            className="absolute block  w-32 h-32 object-cover -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                            alt="Carousel Image 3"
                        />
                    </div>

                    <div className="hidden duration-700 ease-in-out" data-carousel-item>
                        <img
                            src="https://i.ibb.co/BNsMZpX/carousel-4.jpg"
                            className="absolute block  w-32 h-32 object-cover -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                            alt="Carousel Image 4"
                        />
                    </div>

                    <div className="hidden duration-700 ease-in-out" data-carousel-item>
                        <img
                            src="https://i.ibb.co/t8CLFqQ/carousel-5.jpg"
                            className="absolute block w-32 h-32 object-cover -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                            alt="Carousel Image 5"
                        />
                    </div>
                </div>
                <button
                    type="button"
                    className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                    data-carousel-prev
                >
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                        <svg
                            className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 6 10"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 1 1 5l4 4"
                            />
                        </svg>
                        <span className="sr-only">Previous</span>
                    </span>
                </button>
                <button
                    type="button"
                    className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                    data-carousel-next
                >
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                        <svg
                            className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 6 10"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m1 9 4-4-4-4"
                            />
                        </svg>
                        <span className="sr-only">Next</span>
                    </span>
                </button>
            </div>
        </div>
    );
};

export default Badges;
