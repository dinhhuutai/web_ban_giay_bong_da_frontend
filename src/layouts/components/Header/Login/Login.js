import { useContext, useEffect, useState } from 'react';
import styles from './Login.module.scss';
import classNames from 'classnames/bind';

import { AiOutlineUser, AiOutlineLogout } from 'react-icons/ai';
import { Link } from 'react-router-dom';

import config from '~/config';

import { AuthContext } from '~/contexts/AuthContext';

const cx = classNames.bind(styles);

function Login() {
    const {
        logoutUser,
        authState: { authLoading, isAuthenticated, user },
    } = useContext(AuthContext);


    const [showNavbar, setShowNavbar] = useState('no-show');
    const handleAvatar = (e) => {
        if(showNavbar === 'no-show'){
            setShowNavbar('show');
        } else {
            setShowNavbar('no-show');
        }
    }

    const handleLogout = e => {
        logoutUser();
    }

    const [avatar, setAvatar] = useState('');
    
    useEffect(() => {
        setAvatar(user && user.avatar);
    }, [user]);

    return (
        <div className={cx('wrapper', { login: isAuthenticated })}>
            {isAuthenticated ? (
                <div onClick={(e) => handleAvatar()} className={cx('wrapper-avatar')}>
                    <img className={cx('avatar')} src={avatar && (avatar[1] || avatar[0])} alt="avatar" />
                    <ul className={cx('list-login', showNavbar)}>
                        <li className={cx('item-user', 'item')}>
                            <Link className={cx('link')} to={config.routes.myProfile}>Tài khoản của tôi</Link>
                        </li>
                        <li className={cx('item-purchase', 'item')}>
                            <Link className={cx('link')} to={config.routes.myPurchase}>Đơn mua của tôi</Link>
                        </li>
                        <li onClick={handleLogout} className={cx('item-login', 'item')}>
                            <div className={cx('wrapper-logout')}>
                                Log out
                                <AiOutlineLogout />
                            </div>
                        </li>
                    </ul>
                    <div className={cx('wrapper-text')}>
                        cá nhân
                    </div>
                </div>
            ) : (
                <Link to={config.routes.login} className={cx('icon-user')}>
                    <AiOutlineUser className={cx('icon')} />
                    <div className={cx('wrapper-text')}>
                        cá nhân
                    </div>
                </Link>
            )}
        </div>
    );
}

export default Login;
