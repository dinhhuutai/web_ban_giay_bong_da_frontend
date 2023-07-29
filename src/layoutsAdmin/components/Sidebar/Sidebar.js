import styles from './Sidebar.module.scss';
import classNames from 'classnames/bind';

import logo from '~/assets/imgs/logo.png';
import { Link, NavLink } from 'react-router-dom';

import { AiOutlineShop, AiOutlineUserSwitch, AiOutlineBarChart, AiOutlineShoppingCart, AiOutlineDown, AiOutlineContainer } from "react-icons/ai";

import config from '~/config';
import { useState } from 'react';


const cx = classNames.bind(styles);


function Sidebar() {

    const [activeUser, setActiveUser] = useState(false);
    const [activeProduct, setActiveProduct] = useState(false);
    const [activeOrder, setActiveOrder] = useState(false);

    const handleNavbarItemClose = (navbarItemOpen, value) => {
        
        setActiveUser(false);
        setActiveProduct(false);
        setActiveOrder(false);

        navbarItemOpen(value);

    }


    return (  
        <div className={cx('wrapper', 'dark')}>
            <div className={cx('logo-brand', 'dark')}>
                <Link className={cx('link-logo')} to={config.routes.adminStatistical}><img src={logo} alt='logo' className={cx('logo-brand-img')} /></Link>
            </div>

            <div className={cx('nav-bar')}>
                <ul className={cx('nav-bar-list')}>
                    <li className={cx('nav-bar-item')}>
                        <NavLink to={config.routes.adminStatistical} className={(nav) => cx('nav-bar-link', 'dark', {active: nav.isActive})}>
                            <div className={cx('nav-bar-item--wrapper-icon')}><AiOutlineBarChart /></div>
                            <span className={cx('nav-bar-item--name')}>Thống kê</span>
                        </NavLink>
                    </li>
                    <li className={cx('nav-bar-item', {active: activeUser})}>
                        <div onClick={() => handleNavbarItemClose(setActiveUser, !activeUser)} className={cx('nav-bar-link')}>
                            <div className={cx('nav-bar-item--wrapper-icon')}><AiOutlineUserSwitch /></div>
                            <span className={cx('nav-bar-item--name')}>User</span>
                            <div className={cx('nav-bar-item-down-icon')}><AiOutlineDown /></div>
                        </div>
                        <ul className={cx('nav-bar-item-list')}>
                            <li className={cx('nav-bar-item-list-item')}>
                                <NavLink to={config.routes.adminUser} className={(nav) => cx('nav-bar-link-con', {active: nav.isActive})}>
                                    <span className={cx('nav-bar-item--name')}>List</span>
                                </NavLink>
                            </li>
                            <li className={cx('nav-bar-item-list-item')}>
                                <NavLink to={config.routes.adminUserAdd} className={(nav) => cx('nav-bar-link-con', {active: nav.isActive})}>
                                    <span className={cx('nav-bar-item--name')}>Add</span>
                                </NavLink>
                            </li>
                        </ul>
                    </li>
                    <li className={cx('nav-bar-item', {active: activeProduct})}>
                        <div onClick={() => handleNavbarItemClose(setActiveProduct, !activeProduct)} className={cx('nav-bar-link')}>
                            <div className={cx('nav-bar-item--wrapper-icon')}><AiOutlineShoppingCart /></div>
                            <span className={cx('nav-bar-item--name')}>Sản phẩm</span>
                            <div className={cx('nav-bar-item-down-icon')}><AiOutlineDown /></div>
                        </div>
                        <ul className={cx('nav-bar-item-list')}>
                            <li className={cx('nav-bar-item-list-item')}>
                                <NavLink to={config.routes.adminProduct} className={(nav) => cx('nav-bar-link-con', {active: nav.isActive})}>
                                    <span className={cx('nav-bar-item--name')}>List</span>
                                </NavLink>
                            </li>
                            <li className={cx('nav-bar-item-list-item')}>
                                <NavLink to={config.routes.adminProductAdd} className={(nav) => cx('nav-bar-link-con', {active: nav.isActive})}>
                                    <span className={cx('nav-bar-item--name')}>Add</span>
                                </NavLink>
                            </li>
                        </ul>
                    </li>
                    <li className={cx('nav-bar-item', {active: activeOrder})}>
                        <div onClick={() => handleNavbarItemClose(setActiveOrder, !activeOrder)} className={cx('nav-bar-link')}>
                            <div className={cx('nav-bar-item--wrapper-icon')}><AiOutlineContainer /></div>
                            <span className={cx('nav-bar-item--name')}>Đơn hàng</span>
                            <div className={cx('nav-bar-item-down-icon')}><AiOutlineDown /></div>
                        </div>
                        <ul className={cx('nav-bar-item-list')}>
                            <li className={cx('nav-bar-item-list-item')}>
                                <NavLink to={config.routes.adminOrderAll} className={(nav) => cx('nav-bar-link-con', {active: nav.isActive})}>
                                    <span className={cx('nav-bar-item--name')}>Tất cả</span>
                                </NavLink>
                            </li>
                            <li className={cx('nav-bar-item-list-item')}>
                                <NavLink to={config.routes.adminOrderWaiting} className={(nav) => cx('nav-bar-link-con', {active: nav.isActive})}>
                                    <span className={cx('nav-bar-item--name')}>Chờ xác nhận</span>
                                </NavLink>
                            </li>
                            <li className={cx('nav-bar-item-list-item')}>
                                <NavLink to={config.routes.adminOrderProccessing} className={(nav) => cx('nav-bar-link-con', {active: nav.isActive})}>
                                    <span className={cx('nav-bar-item--name')}>Đang giao</span>
                                </NavLink>
                            </li>
                            <li className={cx('nav-bar-item-list-item')}>
                                <NavLink to={config.routes.adminOrderSuccessed} className={(nav) => cx('nav-bar-link-con', {active: nav.isActive})}>
                                    <span className={cx('nav-bar-item--name')}>Hoàn thành</span>
                                </NavLink>
                            </li>
                            <li className={cx('nav-bar-item-list-item')}>
                                <NavLink to={config.routes.adminOrderCancelled} className={(nav) => cx('nav-bar-link-con', {active: nav.isActive})}>
                                    <span className={cx('nav-bar-item--name')}>Đã hủy</span>
                                </NavLink>
                            </li>
                        </ul>
                    </li>
                    <li className={cx('nav-bar-item')}>
                        <NavLink to={config.routes.adminShop} className={(nav) => cx('nav-bar-link', 'dark', {active: nav.isActive})}>
                            <div className={cx('nav-bar-item--wrapper-icon')}><AiOutlineShop /></div>
                            <span className={cx('nav-bar-item--name')}>Shop</span>
                        </NavLink>
                    </li>
                </ul>
            </div>


        </div>
    );
}

export default Sidebar;