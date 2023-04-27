import styles from './Trademark.module.scss';
import classNames from 'classnames/bind';



const cx = classNames.bind(styles);



function Trademark() {
    return <div className={cx('wrapper')}>Thuong hieu</div>;
}

export default Trademark;