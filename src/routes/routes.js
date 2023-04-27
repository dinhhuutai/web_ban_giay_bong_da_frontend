import config from '~/config';


import Home from '~/pages/Home';
import Product from '~/pages/Product';
import Artificial from '~/pages/Artificial';
import Futsal from '~/pages/Futsal';
import Trademark from '~/pages/Trademark';
import Sale from '~/pages/Sale';
import Customer from '~/pages/Customer';
import Contact from '~/pages/Contact';


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
]

const privateRoutes = [

]

export {publicRoutes, privateRoutes};