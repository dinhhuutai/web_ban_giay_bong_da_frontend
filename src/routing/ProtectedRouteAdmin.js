import { Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '~/contexts/AuthContext';
import Spinner from 'react-bootstrap/Spinner';

import config from '~/config';


function ProtectedRouteAdmin() {
    const {authState: {authLoading, isAuthenticated, user}} = useContext(AuthContext);

    if(authLoading){
        return (
            <div className='spinner-container'>
                <Spinner animation='border' variant='info' />
            </div>
        )
    }


    return (
        isAuthenticated === true && user.role === 'admin' ? <Outlet /> : <Navigate to={config.routes.home} />
    );
}

export default ProtectedRouteAdmin;