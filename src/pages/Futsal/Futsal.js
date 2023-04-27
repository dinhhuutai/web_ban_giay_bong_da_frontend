import styles from './Futsal.module.scss';
import classNames from 'classnames/bind';



const cx = classNames.bind(styles);

function Futsal() {
    return <div className={cx('wrapper')}>Giay futsal</div>;
}

export default Futsal;