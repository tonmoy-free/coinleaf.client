import React, { Children } from 'react';
import { Navigate } from 'react-router';
import useAuth from '../hooks/useAuth';
import useUserRole from '../hooks/useUserRole';

const WorkerRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const { role, roleLoading } = useUserRole();

    if (loading || roleLoading) {
        return <span className="loading loading-spinner loading-xl"></span>
    }
    console.log(user, role)
    // if (user && role === 'worker') {
    //     return <Navigate state={{ from: location.pathname }} to="/forbidden"></Navigate>
    // }

    if (!user || role !== 'worker') {
        console.log("from worker route")
        return <Navigate to="/forbidden" state={{ from: location.pathname }} replace />
    }

    return children;
};

export default WorkerRoute;