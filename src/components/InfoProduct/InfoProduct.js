import { Link } from 'react-router-dom';
import styles from './InfoProduct.module.scss';
import classNames from 'classnames/bind';





const cx = classNames.bind(styles);

function InfoProduct({apiProduct}) {




    return <div className={cx('wrapper')}>
        <Link to={apiProduct.id} className={cx('link')}>
            <img className={cx('img')} src={apiProduct.img} alt='giày' />
            <div className={cx('name')}>{apiProduct.name}</div>
            <div className={cx('price')}>{apiProduct.price.toLocaleString()}đ</div>
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