import styles from './Cart.module.scss';
import classNames from 'classnames/bind';
import { useState } from 'react';

import { AiOutlineShopping } from "react-icons/ai";
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Cart() {

    const [notice, setNotice] = useState(0);


    return <div className={cx('wrapper')}>
        <Link className={cx('cart-icon')}>
            <AiOutlineShopping className={cx('icon')} />
            <div className={cx('notice')}>{notice >= 10 ? "9+" : notice}</div>
        </Link>
    </div>;
}

export default Cart;