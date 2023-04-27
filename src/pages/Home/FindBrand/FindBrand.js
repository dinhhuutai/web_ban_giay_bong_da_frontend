import styles from './FindBrand.module.scss';
import classNames from 'classnames/bind';


import imgBrand from '~/assets/imgs/brand.png';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function FindBrand() {
    return <div className={cx('wrapper')}>
        <div className={cx('title')}>
            tìm theo thương hiệu
            <div className={cx('line-text')}></div>
        </div>
        <div className={cx('container')}>
            <div className={cx('row')}>
                <div className={cx('col', 'l-3')}>
                    <Link to="#" className={cx('link-brand')}>
                        <img className={cx('img-brand')} src={imgBrand} alt="img-brand" />
                        <div className={cx('text-brand')}>Nike</div>
                    </Link> 
                </div>
                <div className={cx('col', 'l-3')}>
                    <Link to="#" className={cx('link-brand')}>
                        <img className={cx('img-brand')} src={imgBrand} alt="img-brand" />
                        <div className={cx('text-brand')}>Nike</div>
                    </Link> 
                </div>
                <div className={cx('col', 'l-3')}>
                    <Link to="#" className={cx('link-brand')}>
                        <img className={cx('img-brand')} src={imgBrand} alt="img-brand" />
                        <div className={cx('text-brand')}>Nike</div>
                    </Link> 
                </div>
                <div className={cx('col', 'l-3')}>
                    <Link to="#" className={cx('link-brand')}>
                        <img className={cx('img-brand')} src={imgBrand} alt="img-brand" />
                        <div className={cx('text-brand')}>Nike</div>
                    </Link> 
                </div>
                <div className={cx('col', 'l-3')}>
                    <Link to="#" className={cx('link-brand')}>
                        <img className={cx('img-brand')} src={imgBrand} alt="img-brand" />
                        <div className={cx('text-brand')}>Nike</div>
                    </Link> 
                </div>
                <div className={cx('col', 'l-3')}>
                    <Link to="#" className={cx('link-brand')}>
                        <img className={cx('img-brand')} src={imgBrand} alt="img-brand" />
                        <div className={cx('text-brand')}>Nike</div>
                    </Link> 
                </div>
                <div className={cx('col', 'l-3')}>
                    <Link to="#" className={cx('link-brand')}>
                        <img className={cx('img-brand')} src={imgBrand} alt="img-brand" />
                        <div className={cx('text-brand')}>Nike</div>
                    </Link> 
                </div>
                <div className={cx('col', 'l-3')}>
                    <Link to="#" className={cx('link-brand')}>
                        <img className={cx('img-brand')} src={imgBrand} alt="img-brand" />
                        <div className={cx('text-brand')}>Nike</div>
                    </Link> 
                </div>
            </div>
        </div>
    </div>;
}

export default FindBrand;