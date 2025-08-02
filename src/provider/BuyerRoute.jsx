import React, { Children } from 'react';
import { Navigate } from 'react-router';
import useAuth from '../hooks/useAuth';
import useUserRole from '../hooks/useUserRole';

const BuyerRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const { role, roleLoading } = useUserRole();

    if (loading || roleLoading) {
        return <span className="loading loading-spinner loading-xl"></span>
    }

    // if (user && role === 'buyer') {
    //     return <Navigate state={{ from: location?.pathname }} to="/forbidden"></Navigate>
    // }

    if (!user || role !== 'buyer') {
         console.log("from buyer route")
        return <Navigate to="/forbidden" state={{ from: location.pathname }} replace />
    }

    return children;
};

export default BuyerRoute;