import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { publicRoutes, privateRoutes } from './routes';

import ProtectedRoute from './routing/ProtectedRoute';
import ProtectedRouteAdmin from './routing/ProtectedRouteAdmin';

import DefaultLayout from './layouts';
import DefaultLayoutAdmin from '~/layoutsAdmin';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    
                        {publicRoutes.map((route, index) => {
                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        route.layout === false ?
                                        <route.component /> :
                                        <DefaultLayout>
                                            <route.component />
                                        </DefaultLayout>
                                    }
                                />
                            );
                        })}
    
                        <Route path='/admin' element={<ProtectedRouteAdmin />}>
                            {
                                privateRoutes.map((route, index) => {
                                    return (
                                        <Route 
                                            key={index}
                                            path={route.path}
                                            element={
                                                <DefaultLayoutAdmin>
                                                    <route.component />
                                                </DefaultLayoutAdmin>
                                            }
                                        />
                                    )
                                })
                            }
                        </Route>
                    
                </Routes>
            </div>
        </Router>
    );
}

export default App;
