import React from 'react';
import { Link } from 'react-router';

const SpotLIghtCard = ({ artifact }) => {
    const { _id, name, image, description, likeCount, createdAt } = artifact;
    return (
        <div className=" border border-gray-50 rounded-2xl shadow-xl p-4 hover:border hover:border-primary cursor-pointer">
            <img
                src={image}
                alt="Terracotta Army Figure"
                className="w-full  object-cover rounded-xl"
            />
            <h3 className="text-xl font-semibold mt-4 dark:text-white">{name}</h3>
            <p className="text-sm text-gray-600 dark:text-white">{createdAt}</p>
            <p className="mt-2 text-gray-700 dark:text-white">
                {description}
            </p>
            <div className='pt-5'>
                <Link to={`/artifactDetails/${_id}`}>
                    <button className="btn btn-outline btn-primary hover:bg-secondary hover:border-secondary dark:text-white dark:border-white rounded-lg">View Details</button>
                </Link>
            </div>
        </div>
    );
};

export default SpotLIghtCard;