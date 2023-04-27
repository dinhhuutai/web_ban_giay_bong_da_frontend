import styles from './Interested.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import imgCare from '~/assets/imgs/quantam.png';

const cx = classNames.bind(styles);

function Interested() {
    return <div className={cx('wrapper')}>
        <div className={cx('title')}>
            bạn đang quan tâm
            <div className={cx('line-text')}></div>
        </div>
        <div className={cx('wrapper-interested')}>
            <Link to="#" className={cx('wrapper-img')}>
                <img className={cx('img-interested')} src={imgCare} alt='quantam' />
            </Link>
            <Link to="#" className={cx('wrapper-img')}>
                <img className={cx('img-interested')} src={imgCare} alt='quantam' />
            </Link>
            <Link to="#" className={cx('wrapper-img')}>
                <img className={cx('img-interested')} src={imgCare} alt='quantam' />
            </Link>
        </div>
    </div>;
}

export default Interested;