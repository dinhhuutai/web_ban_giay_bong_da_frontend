import styles from './Noti.module.scss';
import classNames from 'classnames/bind';


const cx = classNames.bind(styles);

function Noti({text, type}) {
    return <div className={cx('wrapper')}>
        <div className={cx('noti', {success: type})}>
            <div className={cx('message')}>{text}</div>
        </div>
    </div>;
}

export default Noti;