import styles from './Customer.module.scss';
import classNames from 'classnames/bind';


const cx = classNames.bind(styles);

function Customer() {
    return <div className={cx('wrapper')}>Khach hang</div>;
}

export default Customer;