import classNames from 'classnames/bind';
import styles from './Payment.module.scss';

import { useContext, useEffect, useRef, useState } from 'react';

import { AuthContext } from '~/contexts/AuthContext';
import { OrderContext } from '~/contexts/OrderContext';
import { AiTwotoneEnvironment, AiFillCreditCard } from "react-icons/ai";
import { BiMoney } from "react-icons/bi";
import { Link, useNavigate } from 'react-router-dom';
import config from '~/config';
import axios from 'axios';
import { apiUrl } from '~/contexts/constants';

import { debounceClickBtn } from '~/utils/debounce';


const cx = classNames.bind(styles);

function Payment() {

    const {authState: {carts, user}, updateAddressUser, deleteProductInCart} = useContext(AuthContext);
    const {dataOrder, setDataOrder} = useContext(OrderContext);
    const [changeAddress, setChangeAddress] = useState(false);
    const [couponInput, setCouponInput] = useState('');
    const [isCoupon, setIsCoupon] = useState(false);

    const [valueAddress, setValueAddress] = useState("");
    const [noticeAddress, setNoticeAddress] = useState(false);

    const navigate = useNavigate();
    
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

        setCouponInput('');

        setValueAddress(user && user.address);

    }, [carts]);

    
    const handleChangeAddress = () => {

        if(valueAddress.trim() === ''){
            setNoticeAddress(true);

        } else {

            updateAddressUser({
                address: valueAddress
            });
    
            setChangeAddress(false);
        }
    };

    const handleCouponInput = (e) => {
        setCouponInput(e.target.value);
        setIsCoupon(false);
    }


    const handleCoupon = async (e) => {
        const response = await axios.post(`${apiUrl}/coupon/checkCoupon`, {code: couponInput.trim()});

        if(response.data.success){

            const tempTotal = dataOrder.totalPriceProduct - (dataOrder.totalPriceProduct*response.data.coupon.percentDiscount/100);

            setDataOrder({
                ...dataOrder,
                idCoupon: {
                    code: response.data.coupon.code,
                    num: response.data.coupon.percentDiscount,
                },
                totalPayment: tempTotal,
            });
        } else {
            if(e.target.value.trim() !== "") {
                setIsCoupon(true);
            }
                
            setDataOrder({
                ...dataOrder,
                idCoupon: {
                    code: "",
                    num: 0,
                },
                totalPayment: dataOrder.totalPriceProduct,
            });
        }
    }

    const keyDownEnter = (e) => {
        if(e.which === 13) {
            handleCoupon(e);
        }
    }


    const handleOrder = async () => {

        const response = await axios.post(`${apiUrl}/order/create`, dataOrder);

        if(response.data.success) {

            const kt = await deleteProductInCart();

            if(kt) {
                navigate(config.routes.myPurchase);
            } else {

            }

        } else {
            
        }

    }
    
    
    return <div className={cx('wrapper')}>
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
                                <img alt='product' src={cart.idProduct.image[0]} className={cx('img')} />
                                <div className={cx('wrapper-info')}>
                                    <div className={cx('name')}>{cart.idProduct.name}</div>
                                    <div className={cx('wrapper-size')}>
                                        <label className={cx('label-size')}>Size: </label>
                                        <div className={cx('size')}>{cart.idSize.size.$numberDecimal}</div>
                                    </div>
                                    <div className={cx('wrapper-quantity')}>
                                        <label className={cx('label-quantity')}>Quantity: </label>
                                        <div className={cx('quantity')}>{cart.quantity}</div>
                                    </div>
                                    <div className={cx('wrapper-footer')}>
                                        <div className={cx('wrapper-price')}>
                                            <div className={cx('price')}>{cart.idProduct.price.toLocaleString()}</div>
                                            <span className={cx('unit')}>đ</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>

                <div className={cx('col', 'l-6', 'm-12')}>

                    <div className={cx('wrapper-address')}>
                        <div className={cx('address-title')}>
                            <div className={cx('address-title-icon')}><AiTwotoneEnvironment /></div>
                            Địa chỉ nhận hàng
                        </div>
                        <div className={cx('wrapper-address-content')}>
                            <div className={cx('wrapper-name-phone')}>
                                <div className={cx('name-address')}>{user && user.name}</div>
                                <div className={cx('phone-address')}>{user && user.phone}</div>
                            </div>
                            <div className={cx('address')}>{user && user.address}</div>
                            <div onClick={e => setChangeAddress(true)} className={cx('change-address')}>Thay đổi</div>
                        </div>
                    </div>

                    <div className={cx('wrapper-order')}>
                        <div className={cx('title-order')}>Order Summary</div>
                        <textarea onKeyDown={keyDownEnter} onBlur={handleCoupon} value={couponInput} onChange={handleCouponInput} type='text' placeholder='Enter coupon code here' name='coupon' className={cx('coupon')} />
                        {isCoupon ? <div className={cx('notice-coupon')}>Mã khuyến mãi không tồn tại.</div> : ""}
                        <div className={cx('summary-price')}>
                            <div className={cx('wrapper-price-product')}>
                                <label className={cx('label-price-product')}>Tổng tiền hàng</label>
                                <div className={cx('price-product')}>{dataOrder.totalPriceProduct.toLocaleString()} đ</div>
                            </div>
                            
                            <div className={cx('wrapper-discount')}>
                                <label className={cx('label-discount')}>Giảm giá</label>
                                <div className={cx('discount')}>{dataOrder.idCoupon.num} %</div>
                            </div>
                            
                            <div className={cx('wrapper-total-price')}>
                                <label className={cx('label-total-price')}>Tổng số tiền</label>
                                <div className={cx('total-price')}>{dataOrder.totalPayment.toLocaleString()} đ</div>
                            </div>
                        </div>
                    </div>

                    <div className={cx('wrapper-payment')}>
                        <div className={cx('payment-title')}>Phương thức thanh toán</div>
                        <div className={cx('wrapper-payment-content')}>
                            <div className={cx('wrapper-payment-COD')}>
                                <input className={cx('payment-input')} type='radio' name='payment' />
                                <div className={cx('payment-input-icon')}><BiMoney /></div>
                                <label className={cx('payment-label')}>Thanh toán khi giao hàng (COD)</label>
                            </div>
                            <div className={cx('wrapper-payment-bank')}>
                                <input className={cx('payment-input')} type='radio' name='payment' />
                                <div className={cx('payment-input-icon')}><AiFillCreditCard /></div>
                                <label className={cx('payment-label')}>Chuyển khoản qua ngân hàng</label>
                            </div>
                        </div>
                    </div>

                    <button onClick={debounceClickBtn(handleOrder, 2000)} className={cx('btn-order')}>Đặt hàng</button>
                </div>
            </div>
        </div>

        {
            changeAddress ? <div className={cx('modal-wrapper-change-address')}>
                <div className={cx('modal-container-change-address')}>
                    <div className={cx('modal-wrapper-address-content')}>
                        <label className={cx('modal-label-address')}>Địa chỉ giao hàng</label>
                        <textarea onChange={e => {setValueAddress(e.target.value); setNoticeAddress(false)}} className={cx('modal-textarea-address')} value={valueAddress} />
                        {
                            noticeAddress ? <div className={cx('notice-address')}>Địa chỉ không được để trống.</div> : ''
                        }
                    </div>
                    <div className={cx('modal-wrapper-btn')}>
                        <button onClick={e => setChangeAddress(false)} className={cx('modal-btn-cancel')}>Hủy</button>
                        <button onClick={handleChangeAddress} className={cx('modal-btn-confirm')}>Xác nhận</button>
                    </div>
                </div>
            </div> : ""
        }

    </div>;
}

export default Payment;