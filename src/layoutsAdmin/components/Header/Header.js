import styles from './Header.module.scss';
import classNames from 'classnames/bind';

import { AiOutlineMenu, AiOutlineLogout } from "react-icons/ai";
import { BsMoon, BsSun, BsBell, BsEnvelopeOpen } from "react-icons/bs";
import { useState, createContext, useContext } from 'react';

import { AuthContext } from '~/contexts/AuthContext';

const cx = classNames.bind(styles);

export const BgDarkContext = createContext();

function Header() {
    const {
        logoutUser,
        authState: { authLoading, isAuthenticated, user },
    } = useContext(AuthContext);

    const [sidebarActive, setSidebarActive] = useState(false);
    const [bgDark, setBgDark] = useState(false);

    const rootStyle = document.documentElement.style;

    const handleSidebar = () => {

        setSidebarActive(!sidebarActive);
    
        if(sidebarActive){
            rootStyle.setProperty('--width-sidebar-admin', "256px");
        } else {
            rootStyle.setProperty('--width-sidebar-admin', "0px");
        }

    }

    const handleBgDark = () => {
        setBgDark(true);

        rootStyle.setProperty('--bg-primary-light', '#2a2b36');
        rootStyle.setProperty('--bg-body-light', '#181924');
        rootStyle.setProperty('--color-light', 'rgba(255, 255, 255, 0.87)');
        rootStyle.setProperty('--color-primary-light', 'rgba(255, 255, 255, 0.75)');
        rootStyle.setProperty('--color-primary-hover-light', 'rgba(255, 255, 255, 0.9)');
        rootStyle.setProperty('--color-border-btn-light', '#a7a7a7');
        rootStyle.setProperty('--bg-btn-active-light', '#868686');
        rootStyle.setProperty('--color-border-btn-active-light', '#7d7d7d');
        rootStyle.setProperty('--bg-brand-sidebar-light', 'rgba(0, 0, 21, .2)');
        rootStyle.setProperty('--color-brand-sidebar-light', 'rgba(255, 255, 255, .87)');
        rootStyle.setProperty('--bg-sidebar-light', '#2a2b36');
        rootStyle.setProperty('--color-sidebar-light', 'rgba(255, 255, 255, .6)');
        rootStyle.setProperty('--bg-sidebar-active-light', 'rgba(255, 255, 255, 0.05)');
        rootStyle.setProperty('--color-sidebar-active-light', 'rgba(255, 255, 255, 0.87)');
        rootStyle.setProperty('--bg-sidebar-nav-group-light', 'rgba(0, 0, 0, 0.2)');
    }

    const handleBgLight = () => {
        setBgDark(false);
        
        rootStyle.setProperty('--bg-primary-light', '#fff');
        rootStyle.setProperty('--bg-body-light', 'rgb(235, 237, 239)');
        rootStyle.setProperty('--color-light', '#000');
        rootStyle.setProperty('--color-primary-light', 'rgba(44, 56, 74, 0.681)');
        rootStyle.setProperty('--color-primary-hover-light', 'rgba(44, 56, 74, 0.95)');
        rootStyle.setProperty('--color-border-btn-light', '#9da5b1');
        rootStyle.setProperty('--bg-btn-active-light', '#b1b7c1');
        rootStyle.setProperty('--color-border-btn-active-light', '#a7aeb9');
        rootStyle.setProperty('--bg-brand-sidebar-light', 'rgba(0, 0, 21, .2)');
        rootStyle.setProperty('--color-brand-sidebar-light', 'rgba(255, 255, 255, .87)');
        rootStyle.setProperty('--bg-sidebar-light', '#3c4b64');
        rootStyle.setProperty('--color-sidebar-light', 'rgba(255, 255, 255, .6)');
        rootStyle.setProperty('--bg-sidebar-active-light', 'rgba(255, 255, 255, 0.05)');
        rootStyle.setProperty('--color-sidebar-active-light', 'rgba(255, 255, 255, 0.87)');
        rootStyle.setProperty('--bg-sidebar-nav-group-light', 'rgba(0, 0, 0, 0.2)');
    }

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
        <div className={cx('wrapper', 'dark')}>
            <div onClick={handleSidebar} className={cx('menu-icon-wrapper', 'dark')}><AiOutlineMenu /></div>

            <div className={cx('wrapper-right')}>
                <div className={cx('toggle-drak-light', 'dark')}>
                    <div onClick={handleBgLight} className={cx('tg-light', {active: !bgDark})}><BsSun /></div>
                    <div onClick={handleBgDark} className={cx('tg-dark', {active: bgDark})}><BsMoon /></div>
                </div>

                <div className={cx('warpper-noti')}><BsBell /></div>

                <div className={cx('wrapper-envel')}><BsEnvelopeOpen /></div>

                <div onClick={(e) => handleAvatar()} className={cx('wrapper-avatar')}>
                    <img className={cx('avatar')} alt='avatar' src='https://coreui.io/demos/bootstrap/4.3/dark/assets/img/avatars/2.jpg' />
                    <ul className={cx('list-login', showNavbar)}>
                        <li onClick={handleLogout} className={cx('item-login')}>
                            <div className={cx('wrapper-logout')}>
                                Log out
                                <AiOutlineLogout />
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

        </div>
    );
}

export default Header;