import classNames from 'classnames/bind';
import styles from './Cancelled.module.scss';
import { useEffect, useState } from 'react';

import axios from 'axios';
import {apiUrl} from '~/contexts/constants';

import { AiFillContainer } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';

import config from '~/config';


const cx = classNames.bind(styles);

function Cancelled() {

    const [order, setOrder] = useState([]);
    const navigate = useNavigate()

    const getData = async () => {
        const response = await axios.get(`${apiUrl}/admin/order/cancelled`);

        if(response.data.success){
            setOrder(response.data.order);
        }

    }

    useEffect(() => {
        getData();

    }, []);

    
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }, []);

    const handleDetailOrder = (idOrder) => {
        navigate(`${config.routes.adminDetailOrder}?oD=${idOrder}`);
    }

    return <div className={cx('wrapper')}>
            {
                order.length === 0 ? 
                <div className={cx('wrapper-notice-no')}>
                    <div className={cx('icon-notice')}><AiFillContainer /></div>
                    <div className={cx('notice-no')}>Không có đơn hàng</div>
                </div> : 
                order.map((el, index) => 
                    <div key={index} className={cx('wrapper-order')}>
                        <div className={cx('header-order')}>
                            <div onClick={() => handleDetailOrder(el._id)} className={cx('detail-order')}>Xem chi tiết</div>
                            <div className={cx('info-order')}>
                                {
                                    el.status === 'Waiting' ? 'Chờ thanh toán' :
                                    el.status === 'Proccessing' ? 'Đang giao' :
                                    el.status === 'Successed' ? 'Hoàn thành' :
                                    'Đã hủy'
                                }
                            </div>
                        </div>
        
                        <div className={cx('wrapper-order-product')}>
                            {
                                el.products.map((product, index) => 
                                    <div key={index} className={cx('item-order-product')}>
                                        <div className={cx('wrapper-img')}>
                                            <img className={cx('img')} alt='img' src={product.idProduct.image[0]} />
                                        </div>

                                        <div className={cx('info')}>
                                            <div className={cx('name-product')}>{product.idProduct.name}</div>
                                            <div className={cx('wrapper-footer-product')}>
                                                <div className={cx('quantity-product')}>x {product.quantity}</div>
                                                <div className={cx('price-product')}>{product.idProduct.price.toLocaleString()} đ</div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </div>

                        <div className={cx('wrapper-footer')}>
                            <div className={cx('wrapper-total-price')}>
                                <label className={cx('label-price')}>Thành tiền:</label>
                                <div className={cx('total-price')}>{el.totalPayment.toLocaleString()} đ</div>
                            </div>

                            {
                                el.status === 'Waiting' ? 
                                <button className={cx('btn-cancel')}>Xác nhận đơn hàng</button> : 
                                el.status === 'Proccessing' ? 
                                <button className={cx('btn-success')}>Đã giao hàng</button> : ""
                            }
                        </div>
        
                    </div>
                )
            }
    </div>;
}

export default Cancelled;