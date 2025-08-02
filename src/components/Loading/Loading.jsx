import Lottie from 'lottie-react';
import React from 'react';
import handLoading from '../../assets/lottie/loadingHand.json';

const Loading = () => {
    return (
        <div className='min-h-screen flex justify-center  items-center'>
            {/* <span className="loading loading-bars loading-xl"></span> */}
            <Lottie style={{ width: '500px' }} animationData={handLoading} loop={true}></Lottie>
        </div>
    );
};

export default Loading;