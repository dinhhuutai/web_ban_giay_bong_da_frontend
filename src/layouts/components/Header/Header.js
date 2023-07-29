import styles from './Header.module.scss';
import classNames from 'classnames/bind';

import logo from '~/assets/imgs/logo.png';
import Search from './Search';
import Login from './Login';
import Cart from './Cart';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

import config from '~/config';

import { useRef, useEffect } from 'react';

const cx = classNames.bind(styles);


function Header({scrollTop}) {

    const headerRef = useRef();

    useEffect(() => {
        if(scrollTop > 1){
            headerRef.current.style.top = 0;
        } else {
            headerRef.current.style.top = (14 - scrollTop) + 'px';
        }
    });


    return <div className={cx('wrapper')}>
        <div className={cx('header-support')}>IT k20 - Shop Giày Bóng Đá Chính Hãng</div>
        <div ref={headerRef} className={cx('wrapper-header')}>
            <div className={cx('header-main')}>
                <Link to={config.routes.home} className={cx('wrapper-logo')}>
                    <img alt="Logo Shop Bán Giày Bóng Đá" className={cx('logo')} src={logo} />
                </Link>
                <Search />
                <div className={cx('wrapper-login')}>
                    <Login />

                    <div className={cx('wrapper-cart')}>
                        <Cart />
                    </div>
                </div>
            </div>
            <div className={cx('header-controll-path')}>
                <Navbar />
            </div>
        </div>
    </div>;
}

export default Header;