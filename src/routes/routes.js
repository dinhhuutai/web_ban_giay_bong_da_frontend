import config from '~/config';


import Home from '~/pages/Home';
import Product from '~/pages/Product';
import Artificial from '~/pages/Artificial';
import Futsal from '~/pages/Futsal';
import Trademark from '~/pages/Trademark';
import Sale from '~/pages/Sale';
import Customer from '~/pages/Customer';
import Contact from '~/pages/Contact';
import DetailProduct from '~/pages/DetailProduct';
import Login from '~/pages/Login';
import Cart from '~/pages/Cart';
import DeliveryInformation from '~/pages/DeliveryInformation';
import Payment from '~/pages/Payment';
import MyProfile from '~/pages/MyProfile';
import DetailOrder from '~/pages/DetailOrder';

import Statistical from '~/pagesAdmin/Statistical';
import UserCreate from '~/pagesAdmin/User/Create';
import UserList from '~/pagesAdmin/User/List';
import ProductCreate from '~/pagesAdmin/Product/Create';
import ProductList from '~/pagesAdmin/Product/List';
import Shop from '~/pagesAdmin/Shop';
import OrderAll from '~/pagesAdmin/Order/All';
import OrderWaiting from '~/pagesAdmin/Order/Waiting';
import OrderProccessing from '~/pagesAdmin/Order/Proccessing';
import OrderSuccessed from '~/pagesAdmin/Order/Successed';
import OrderCancelled from '~/pagesAdmin/Order/Cancelled';
import DetailOrderAdmin from '~/pagesAdmin/DetailOrderAdmin';


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
        path: config.routes.detailProduct,
        component: DetailProduct,
    },
    {
        path: config.routes.login,
        component: Login,
        layout: false,
    },
    {
        path: config.routes.cart,
        component: Cart,
    },
    {
        path: config.routes.myPurchase,
        component: DeliveryInformation,
    },
    {
        path: config.routes.payment,
        component: Payment,
    },
    {
        path: config.routes.myProfile,
        component: MyProfile,
    },
    {
        path: config.routes.detailOrder,
        component: DetailOrder,
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
    {
        path: config.routes.adminOrderAll,
        component: OrderAll,
    },
    {
        path: config.routes.adminOrderWaiting,
        component: OrderWaiting,
    },
    {
        path: config.routes.adminOrderProccessing,
        component: OrderProccessing,
    },
    {
        path: config.routes.adminOrderSuccessed,
        component: OrderSuccessed,
    },
    {
        path: config.routes.adminOrderCancelled,
        component: OrderCancelled,
    },
    {
        path: config.routes.adminDetailOrder,
        component: DetailOrderAdmin,
    },
]

export {publicRoutes, privateRoutes};