import config from '~/config';


import Home from '~/pages/Home';
import Product from '~/pages/Product';
import Artificial from '~/pages/Artificial';
import Futsal from '~/pages/Futsal';
import Trademark from '~/pages/Trademark';
import Sale from '~/pages/Sale';
import Customer from '~/pages/Customer';
import Contact from '~/pages/Contact';
import Login from '~/pages/Login';

import Statistical from '~/pagesAdmin/Statistical';
import UserCreate from '~/pagesAdmin/User/Create';
import UserList from '~/pagesAdmin/User/List';
import ProductCreate from '~/pagesAdmin/Product/Create';
import ProductList from '~/pagesAdmin/Product/List';
import Shop from '~/pagesAdmin/Shop';


const publicRoutes = [
    {
        path: config.routes.home,
        component: Home,
    },
    {
        path: config.routes.product,
        component: Product,
    },
    {
        path: config.routes.artificial,
        component: Artificial,
    },
    {
        path: config.routes.futsal,
        component: Futsal,
    },
    {
        path: config.routes.trademark,
        component: Trademark,
    },
    {
        path: config.routes.sale,
        component: Sale,
    },
    {
        path: config.routes.customer,
        component: Customer,
    },
    {
        path: config.routes.contact,
        component: Contact,
    },
    {
        path: config.routes.login,
        component: Login,
        layout: false,
    },
]

const privateRoutes = [
    {
        path: config.routes.adminStatistical,
        component: Statistical,
    },
    {
        path: config.routes.adminUser,
        component: UserList,
    },
    {
        path: config.routes.adminUserAdd,
        component: UserCreate,
    },
    {
        path: config.routes.adminProduct,
        component: ProductList,
    },
    {
        path: config.routes.adminProductAdd,
        component: ProductCreate,
    },
    {
        path: config.routes.adminShop,
        component: Shop,
    },
]

export {publicRoutes, privateRoutes};