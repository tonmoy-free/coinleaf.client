import React, { Children } from 'react';
import { Navigate } from 'react-router';
import useAuth from '../hooks/useAuth';
import useUserRole from '../hooks/useUserRole';

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const { role, roleLoading } = useUserRole();

    if (loading || roleLoading) {
        return <span className="loading loading-spinner loading-xl"></span>
    }

    // if (user && role === 'admin') {
    //     return <Navigate state={{ from: location.pathname }} to="/forbidden"></Navigate>
    // }
    console.log(user, role, loading, roleLoading)
    if (!user || role !== 'admin') {
        console.log("from admin route")
        return <Navigate to="/forbidden" state={{ from: location.pathname }} replace />
    }

    return children;
};

export default AdminRoute;