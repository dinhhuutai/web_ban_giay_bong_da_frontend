import styles from './Cart.module.scss';
import classNames from 'classnames/bind';
import { useState } from 'react';

import { AiOutlineShopping } from "react-icons/ai";

const cx = classNames.bind(styles);

function Cart() {

    const [notice, setNotice] = useState(0);


    return <div className={cx('wrapper')}>
        <AiOutlineShopping className={cx('cart-icon')} />
        <div className={cx('notice')}>{notice >= 10 ? "9+" : notice}</div>
    </div>;
}

export default Cart;