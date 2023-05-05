import { useContext, useState } from 'react';
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

    return (
        <div className={cx('wrapper', { login: isAuthenticated })}>
            {isAuthenticated ? (
                <div onClick={(e) => handleAvatar()} className={cx('wrapper-avatar')}>
                    <img className={cx('avatar')} src={user.avatar} alt="avatar" />
                    <ul className={cx('list-login', showNavbar)}>
                        <li onClick={handleLogout} className={cx('item-login')}>
                            <div className={cx('wrapper-logout')}>
                                Log out
                                <AiOutlineLogout />
                            </div>
                        </li>
                    </ul>
                </div>
            ) : (
                <Link to={config.routes.login} className={cx('icon-user')}>
                    <AiOutlineUser className={cx('icon')} />
                </Link>
            )}
        </div>
    );
}

export default Login;
