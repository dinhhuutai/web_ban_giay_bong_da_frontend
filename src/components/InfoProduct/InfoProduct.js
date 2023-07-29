import { Link, useNavigate } from 'react-router-dom';
import styles from './InfoProduct.module.scss';
import classNames from 'classnames/bind';

import config from '~/config';

const cx = classNames.bind(styles);

function InfoProduct({apiProduct}) {



    return <div className={cx('wrapper')}>
        <Link to={`${config.routes.detailProduct}?pd=${apiProduct._id}`} id={apiProduct._id} className={cx('link')}>
            <img className={cx('img')} src={apiProduct.image[0]} alt='giày' />
            <div className={cx('name')}>{apiProduct.name}</div>
            <div className={cx('price')}>{apiProduct.price.toLocaleString()}đ</div>
            <div className={cx('wrapper-sold')}>
                <label className={cx('label-sold')}>Đã bán:</label>
                <span className={cx('quantity-sold')}>{apiProduct.quantitySold}</span>
            </div>
            {
                apiProduct.isNew ? <div className={cx('noti-new')}>new</div> : ""
            }
            {
                apiProduct.discount !== "" ? <div className={cx('noti-discount')}>{apiProduct.discount}%</div> : ""
            }
        </Link>
    </div>;
}

export default InfoProduct;