import styles from './Cart.module.scss';
import classNames from 'classnames/bind';
import { useContext, useEffect, useState } from 'react';

import { AiOutlineShopping } from "react-icons/ai";
import { Link } from 'react-router-dom';

import config from '~/config';

import { AuthContext } from '~/contexts/AuthContext';

const cx = classNames.bind(styles);

function Cart() {

    const {authState} = useContext(AuthContext);


    return <div className={cx('wrapper')}>
        {
            authState.isAuthenticated ? <Link to={config.routes.cart} className={cx('cart-icon')}>
                <AiOutlineShopping className={cx('icon')} />
                <div className={cx('notice')}>{authState.carts.length >= 10 ? "9+" : authState.carts.length}</div>
                <div className={cx('text-cart')}>
                    giỏ hàng
                </div>
            </Link> :
            <Link to={config.routes.login} className={cx('cart-icon')}>
                <AiOutlineShopping className={cx('icon')} />
                <div className={cx('notice')}>{authState.carts.length >= 10 ? "9+" : authState.carts.length}</div>
                <div className={cx('text-cart')}>
                    giỏ hàng
                </div>
            </Link>
        }
    </div>;
}

export default Cart;