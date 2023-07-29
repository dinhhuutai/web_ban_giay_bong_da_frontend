import classNames from 'classnames/bind';
import styles from './DetailOrderAdmin.module.scss';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import axios from 'axios';
import { apiUrl } from '~/contexts/constants';
import { AiTwotoneEnvironment, AiFillCreditCard } from "react-icons/ai";


const cx = classNames.bind(styles);

function DetailOrderAdmin() {

    const id = useSearchParams()[0].get('oD');
    //const [id, setId] = useState(useSearchParams()[0].get('pd'));

    const [order, setOrder] = useState(false);

    const getData = async (id) => {
        const response = await axios.get(`${apiUrl}/order/getById/${id}`);
        
        if(response.data.success){
            setOrder(response.data.order);
        }

    }

    useEffect(() => {
        getData(id)
    }, []);

    
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }, []);



    return <div className={cx('wrapper')}>
        <div className={cx('grid')}>
            <div className={cx('row')}>
                <div className={cx('col', 'l-12')}>
                    <h2 className={cx('title')}>Chi tiết đơn hàng</h2>
                </div>
            </div>

            <div className={cx('row')}>
                <div className={cx('col', 'l-6')}>
                    {
                        order && order.products.map((cart, index) => 
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

                <div className={cx('col', 'l-6')}>

                    <div className={cx('wrapper-address')}>
                        <div className={cx('address-title')}>
                            <div className={cx('address-title-icon')}><AiTwotoneEnvironment /></div>
                            Địa chỉ nhận hàng
                        </div>
                        <div className={cx('wrapper-address-content')}>
                            <div className={cx('wrapper-name-phone')}>
                                <div className={cx('name-address')}>{order && order.orderBy.name}</div>
                                <div className={cx('phone-address')}>{order && order.orderBy.phone}</div>
                            </div>
                            <div className={cx('address')}>{order && order.orderBy.address}</div>
                        </div>
                    </div>

                    <div className={cx('wrapper-order')}>
                        <div className={cx('title-order')}>Order Summary</div>
                        <div className={cx('summary-price')}>
                            <div className={cx('wrapper-price-product')}>
                                <label className={cx('label-price-product')}>Tổng tiền hàng</label>
                                <div className={cx('price-product')}>{order && order.totalPriceProduct.toLocaleString()} đ</div>
                            </div>
                            
                            <div className={cx('wrapper-discount')}>
                                <label className={cx('label-discount')}>Giảm giá</label>
                                <div className={cx('discount')}>{(order && order.idCoupon && order.idCoupon.percentDiscount) || 0} %</div>
                            </div>
                            
                            <div className={cx('wrapper-total-price')}>
                                <label className={cx('label-total-price')}>Tổng số tiền</label>
                                <div className={cx('total-price')}>{order && order.totalPayment.toLocaleString()} đ</div>
                            </div>
                        </div>
                    </div>

                    <div className={cx('wrapper-status')}>
                        <div className={cx('status-title')}>Tình trạng đơn hàng</div>
                        <div className={cx('status')}>
                            {
                                order.status === 'Waiting' ? 'Chờ thanh toán' :
                                order.status === 'Proccessing' ? 'Đang giao' :
                                order.status === 'Successed' ? 'Hoàn thành' :
                                'Đã hủy'
                            }
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>;
}

export default DetailOrderAdmin;