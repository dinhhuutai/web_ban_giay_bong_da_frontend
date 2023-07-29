import classNames from 'classnames/bind';
import styles from './Cart.module.scss';
import { useContext, useEffect, useRef, useState } from 'react';

import { AuthContext } from '~/contexts/AuthContext';
import { OrderContext } from '~/contexts/OrderContext';
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from 'react-router-dom';
import config from '~/config';
import axios from 'axios';
import { apiUrl } from '~/contexts/constants';


const cx = classNames.bind(styles);

function Cart() {

    const {authState: {carts}, removeProductInCart} = useContext(AuthContext);
    const {dataOrder, setDataOrder} = useContext(OrderContext);

    
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }, []);

    useEffect(() => {
        var totalPriceProduct = 0;

        carts.map(cart => {
            totalPriceProduct += (cart.idProduct.price*cart.quantity);
        });


        setDataOrder({
            products: carts,
            idCoupon: {
                code: "",
                num: 0,
            },
            totalPriceProduct,
            totalPayment: totalPriceProduct,
        });

    }, [carts]);


    const hanldeRemove = (id) => {
        removeProductInCart(id);
    }



    return carts.length !== 0 ? <div className={cx('wrapper')}>
        <div className={cx('grid')}>
            <div className={cx('row')}>
                <div className={cx('col', 'l-12')}>
                    <h2 className={cx('title')}>Your cart</h2>
                </div>
            </div>

            <div className={cx('row')}>
                <div className={cx('col', 'l-6', 'm-12')}>
                    {
                        carts.map((cart, index) => 
                            <div key={index} className={cx('wrapper-product')}>
                                <img alt='product' src={cart.idProduct.image && cart.idProduct.image[0]} className={cx('img')} />
                                <div className={cx('wrapper-info')}>
                                    <div className={cx('name')}>{cart.idProduct.name}</div>
                                    <div className={cx('wrapper-size')}>
                                        <label className={cx('label-size')}>Size: </label>
                                        <div className={cx('size')}>{cart.idSize.size && cart.idSize.size.$numberDecimal}</div>
                                    </div>
                                    <div className={cx('wrapper-quantity')}>
                                        <label className={cx('label-quantity')}>Quantity: </label>
                                        <div className={cx('quantity')}>{cart.quantity}</div>
                                    </div>
                                    <div className={cx('wrapper-footer')}>
                                        <div className={cx('wrapper-price')}>
                                            <div className={cx('price')}>{cart.idProduct.price && cart.idProduct.price.toLocaleString()}</div>
                                            <span className={cx('unit')}>đ</span>
                                        </div>

                                        <div onClick={() => hanldeRemove(cart._id)} className={cx('remove')}>Remove</div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>

                <div className={cx('col', 'l-6', 'm-12')}>
                    <div className={cx('wrapper-order')}>
                        
                        <div className={cx('wrapper-total-price')}>
                            <label className={cx('label-total-price')}>Tổng số tiền</label>
                            <div className={cx('total-price')}>{dataOrder && dataOrder.totalPayment.toLocaleString()} đ</div>
                        </div>

                        <Link to={config.routes.payment}>
                            <button className={cx('btn')}>MUA HÀNG</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </div> : 
    <div className={cx('notice-cart')}>
        <div className={cx('icon-cart')}><AiOutlineShoppingCart /></div>
        <div className={cx('title-notice')}>Giỏ hàng của bạn chưa có sản phẩm</div>
        <Link to={config.routes.product} className={cx('btn-pay')}>
            MUA NGAY
        </Link>
    </div>;
}

export default Cart;