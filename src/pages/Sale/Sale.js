import styles from './Sale.module.scss';
import classNames from 'classnames/bind';


const cx = classNames.bind(styles);

function Sale() {
    return <div className={cx('wrapper')}>Sale</div>;
}

export default Sale;