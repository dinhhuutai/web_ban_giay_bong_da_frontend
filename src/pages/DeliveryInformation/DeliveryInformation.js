import classNames from 'classnames/bind';
import styles from './DeliveryInformation.module.scss';
import { useContext, useEffect, useState } from 'react';

import { OrderContext } from '~/contexts/OrderContext';
import { AiFillContainer } from "react-icons/ai";

import Order from './Order';


const cx = classNames.bind(styles);

function DeliveryInformation() {

    const {orderState: {order}, getOrder} = useContext(OrderContext);

    const [tabOrder, setTabOrder] = useState(['all', 'waiting', 'proccessing', 'successed','cancelled']);
    const [selectOrder, setSelectOrder] = useState('all');

    useEffect(() => {

        getOrder(selectOrder);

        
    }, [selectOrder]);

    
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }, []);
    

    
    return <div className={cx('wrapper')}>
        <div className={cx('wrapper-header-order')}>
            {
                tabOrder.map((e, index) => 
                    <div onClick={() => setSelectOrder(e)} key={index} className={cx('header-order-item', e === selectOrder ? 'header-order-item-active' : '')}>
                        {
                            e === 'all' ? 'Tất cả' :
                            e === 'waiting' ? 'Chờ thanh toán' :
                            e === 'proccessing' ? 'Đang giao' :
                            e === 'successed' ? 'Hoàn thành' :
                            'Đã hủy'
                        }
                    </div>
                )
            }
        </div>

        {
            order.length === 0 ? 
                <div className={cx('wrapper-notice-no')}>
                    <div className={cx('icon-notice')}><AiFillContainer /></div>
                    <div className={cx('notice-no')}>Chưa có đơn hàng</div>
                </div> :
            <Order order={order} getOrder={getOrder} selectOrder={selectOrder} />
        }

    </div>;
}

export default DeliveryInformation;