import styles from './CollectionNew.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import banner from '~/assets/imgs/banner.png';
import product1 from '~/assets/imgs/product1.png';
import product2 from '~/assets/imgs/product2.png';
import product3 from '~/assets/imgs/product3.png';
import product4 from '~/assets/imgs/product4.png';

const cx = classNames.bind(styles);

function CollectionNew() {
    return <div className={cx('wrapper')}>
        <div className={cx('title')}>
            bộ sưu tập mới
            <div className={cx('line-text')}></div>
        </div>
        <div className={cx('wrapper-collection')}>
            <img className={cx('banner')} src={banner} alt="banner" />
            <div className={cx('list-product')}>
                <div className={cx('item-product')}>
                    <Link to="#" className={cx('link-product')}>
                        <img src={product1} alt='product' className={cx('img-product')} />
                        <div className={cx('info-product')}>
                            <div className={cx('name-product')}>NIKE ZOOM MERCURIAL MDS SUPERFLY 9 ACADEMY TF - DV2422-405 - TÍM HỒNG</div>
                            <div className={cx('price-product')}>2,390,000</div>
                        </div>
                    </Link>
                </div>
                <div className={cx('item-product')}>
                    <Link to="#" className={cx('link-product')}>
                        <img src={product2} alt='product' className={cx('img-product')} />
                        <div className={cx('info-product')}>
                            <div className={cx('name-product')}>NIKE ZOOM MERCURIAL</div>
                            <div className={cx('price-product')}>2,390,000</div>
                        </div>
                    </Link>
                </div>
                <div className={cx('item-product', 'item-product-none')}>
                    <Link to="#" className={cx('link-product')}>
                        <img src={product3} alt='product' className={cx('img-product')} />
                        <div className={cx('info-product')}>
                            <div className={cx('name-product')}>NIKE ZOOM MERCURIAL MDS SUPERFLY 9 ACADEMY TF - DV2422-405 - TÍM HỒNG</div>
                            <div className={cx('price-product')}>2,390,000</div>
                        </div>
                    </Link>
                </div>
                <div className={cx('item-product', 'item-product-none')}>
                    <Link to="#" className={cx('link-product')}>
                        <img src={product4} alt='product' className={cx('img-product')} />
                        <div className={cx('info-product')}>
                            <div className={cx('name-product')}>NIKE ZOOM MERCURIAL MDS SUPERFLY 9 ACADEMY TF - DV2422-405 - TÍM HỒNG</div>
                            <div className={cx('price-product')}>2,390,000</div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
        <div className={cx('wrapper-btn')}>
            <button className={cx('btn')}><Link to="#" className={cx('link-btn')}>Xem thêm</Link></button>
        </div>
    </div>;
}

export default CollectionNew;