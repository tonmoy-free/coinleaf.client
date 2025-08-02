import React, { useEffect, useState } from 'react';
import SpotLIghtCard from './spotLIghtCard';

const SpotLightSections = ({ artifactsData }) => {
    const [displayArtifacts, setDisplayArtifacts] = useState([]);
    useEffect(() => {
        setDisplayArtifacts(artifactsData.slice(0, 2));
    }, [artifactsData]);
    return (
        <div className="space-y-12 p-4 md:p-10">
            {/* Spotlight Artifacts Section */}
            <section>
                <div className='mt-18 lg:mt-20 md:mt-20'>
                    <h1 className='text-center text-2xl md:text-5xl font-bold text-primary mb-4 dark:text-secondary'>Spotlight Artifacts</h1>
                    <p className='text-center px-6 md:px-0 text-xs md:text-base font-normal text-gray-600 mb-8 dark:text-white'>
                        A showcase of rare, influential, or visually stunning artifacts handpicked to highlight human <br /> history’s most fascinating moments.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {
                        displayArtifacts.map(artifact =>
                            <SpotLIghtCard
                                key={artifact._id}
                                artifact={artifact}
                            >
                            </SpotLIghtCard>)
                    }

                </div>
            </section>
            
        </div>
    );
};

export default SpotLightSections;