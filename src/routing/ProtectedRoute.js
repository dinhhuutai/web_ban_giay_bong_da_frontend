import { Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '~/contexts/AuthContext';
import Spinner from 'react-bootstrap/Spinner';

import config from '~/config';


function ProtectedRoute() {
    const {authState: {authLoading, isAuthenticated}} = useContext(AuthContext);

    if(authLoading){
        return (
            <div className='spinner-container'>
                <Spinner animation='border' variant='info' />
            </div>
        )
    }

    return (
        isAuthenticated ? <Outlet /> : <Navigate to={config.routes.login} />
    );
}

export default ProtectedRoute;