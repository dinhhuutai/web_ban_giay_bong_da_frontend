import styles from './Artificial.module.scss';
import classNames from 'classnames/bind';



const cx = classNames.bind(styles);

function Artificial() {
    return <div className={cx('wrapper')}>Giay nhan tao</div>;
}

export default Artificial;