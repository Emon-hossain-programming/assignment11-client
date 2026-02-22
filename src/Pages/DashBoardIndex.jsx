import React from 'react';
import useAdmin from '../Hooks/useAdmin';
import AdminHome from '../DashBoard/AdminHome';
import CitizenHome from '../DashBoard/CitizenHome';

const DashBoardIndex = () => {
    const [isAdmin, isAdminLoading] = useAdmin(); 

    if (isAdminLoading) {
        return <span className="loading loading-spinner loading-lg"></span>;
    }

    return isAdmin ? <AdminHome /> : <CitizenHome />;
};

export default DashBoardIndex;