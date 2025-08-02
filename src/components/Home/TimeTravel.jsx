import React from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';


const TimeTravel = ({ artifactsData }) => {
    const { image } = artifactsData;
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        speed: 1600,
        autoplaySpeed: 2000,
        cssEase: "linear",
        responsive: [
            {
                breakpoint: 1024,       // lg
                settings: { slidesToShow: 5 }
            },
            {
                breakpoint: 768,        // md
                settings: { slidesToShow: 4 }
            },
            {
                breakpoint: 480,        // mobile
                settings: { slidesToShow: 4 }
            }
        ]
    };
    return (
        <section className='w-11/12 mx-auto'>
            <div className="w-11/12 overflow-hidden mx-auto mt-0 md:mt-18 lg:mt-20 mb-10 md:mb-18 lg:mb-20">

                <div className="mb-10">
                    <h1 className='text-center text-2xl md:text-5xl font-extrabold text-primary mb-4 dark:text-secondary'>Time Travels</h1>
                    <p className='text-center px-6 md:px-0 text-xs md:text-base font-normal text-gray-600 mb-8 dark:text-white'>
                        Travel across centuries in seconds. Our TimeTravel slider takes you on a visual timeline of historical artifacts.</p>
                </div>
                <div className="slider-container w-11/12 mx-auto">

                    <Slider {...settings}>
                        {artifactsData.map((artifact, index) => (
                            <div key={index}>
                                <img
                                    className="filter w-20 md:w-36"
                                    src={artifact.image}
                                    alt={`Artifact ${index + 1}`}
                                />
                                <p className='dark:text-white'>Created : {artifact.createdAt}</p>
                            </div>
                        ))}

                    </Slider>
                </div>
            </div>
        </section>
    );
};

export default TimeTravel;