import React, { useEffect } from 'react';
import { useLoaderData } from 'react-router';
import Faq from '../../components/Home/Faq';
import LetsGetStarted from '../../components/Home/LetsGetStarted';
import Subscribe from '../../components/Home/Subscribe';
import BannerTwo from '../../components/Home/BannerTwo';
import HeroVideo from '../../components/Home/HeroVideo';
import BestWorkers from '../../components/Home/BestWorkers/BestWorkers';
import TestimonialSection from '../../components/Home/TestimonialSection';
import StepsToStart from '../../components/Home/StepsToStart';


const Home = ({ pageTitle }) => {
    const artifactsData = useLoaderData();

    useEffect(() => {
        document.title = pageTitle || 'CoinLeaf | Home'; // default pageTitle 
    }, [pageTitle]);
    return (
        <div className='dark:bg-black'>
            <HeroVideo></HeroVideo>
            <BestWorkers></BestWorkers>

            <div>
                <BannerTwo></BannerTwo>
            </div>

            <StepsToStart></StepsToStart>
            <Faq></Faq>
            <div data-aos="flip-up">
                <Subscribe></Subscribe>
            </div>
            <TestimonialSection></TestimonialSection>
            <div data-aos="flip-right">
                <LetsGetStarted></LetsGetStarted>
            </div>
        </div>
    );
};

export default Home;