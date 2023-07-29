import classNames from 'classnames/bind';
import styles from './Order.module.scss';

import axios from 'axios';
import {apiUrl} from '~/contexts/constants';
import { useState } from 'react';

import config from '~/config';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function Order({order, getOrder, selectOrder}) {

    const [modalCancel, setModalCancel] = useState(false);
    const [id, setId] = useState();

    const navigate = useNavigate();


    const handleCancel = async () => {
        const response = await axios.put(`${apiUrl}/order/updateStatus/${id}`, {status: 'Cancelled'});

        if(response.data.success) {
            getOrder(selectOrder);
            setModalCancel(false);
        }
    }

    const handleModal = async (idOrder) => {
        setModalCancel(true);
        setId(idOrder);
    }

    const handleDetailOrder = (idOrder) => {
        navigate(`${config.routes.detailOrder}?oD=${idOrder}`);
    }

    


    return <div className={cx('wrapper')}>
            {
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
                                <button onClick={(e) => handleModal(el._id)} className={cx('btn-cancel')}>Hủy đơn hàng</button> : ""
                            }
                        </div>
        
                    </div>
                )
            }

            {
                modalCancel ? <div className={cx('wrapper-modal-cancel')}>
                    <div className={cx('container')}>
                        <div className={cx('modal-header')}>Lý do hủy?</div>
                        <ul className={cx('list-cancel')}>
                            <li className={cx('item-cancel')}>
                                <input type="radio" name='cancel' className={cx('input-cancel')} />
                                <span className={cx('text-cancel')}>Thay đổi địa chỉ</span>
                            </li>
                            <li className={cx('item-cancel')}>
                                <input type="radio" name='cancel' className={cx('input-cancel')} />
                                <span className={cx('text-cancel')}>Thay đổi số lượng sản phẩm</span>
                            </li>
                            <li className={cx('item-cancel')}>
                                <input type="radio" name='cancel' className={cx('input-cancel')} />
                                <span className={cx('text-cancel')}>Thay đổi sản phẩm</span>
                            </li>
                            <li className={cx('item-cancel')}>
                                <input type="radio" name='cancel' className={cx('input-cancel')} />
                                <span className={cx('text-cancel')}>Thay đổi số điện thoại</span>
                            </li>
                        </ul>
                        <div className={cx('modal-footer')}>
                            <button onClick={() => setModalCancel(false)} className={cx('btn-modal-cancel')}>Hủy</button>
                            <button onClick={(e) => handleCancel()} className={cx('btn-modal-confirm')}>Xác nhận</button>
                        </div>
                    </div>
                </div> : ""
            }
        </div>
    ;
}

export default Order;