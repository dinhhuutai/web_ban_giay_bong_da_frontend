import styles from './Login.module.scss';
import classNames from 'classnames/bind';

import { AiOutlineUser } from "react-icons/ai";


const cx = classNames.bind(styles);

function Login() {
    return <div className={cx('wrapper')}>
        <AiOutlineUser className={cx('icon-user')} />
    </div>;
}

export default Login;