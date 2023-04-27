import styles from './Navbar.module.scss';
import classNames from 'classnames/bind';

import {NavLink} from 'react-router-dom';

import config from '~/config';

const cx = classNames.bind(styles);

function Navbar() {
    return <div className={cx('wrapper')}>
        <ul className={cx('navbar-list')}>
            <li className={cx('navbar-item')}>
                <NavLink to={config.routes.home} className={(nav) => cx('navbat-item-link', {active: nav.isActive})}>
                    trang chủ
                </NavLink>
            </li>
            <li className={cx('navbar-item')}>
                <NavLink to={config.routes.product} className={(nav) => cx('navbat-item-link', {active: nav.isActive})}>
                    tất cả sản phẩm
                </NavLink>
            </li>
            <li className={cx('navbar-item')}>
                <NavLink to={config.routes.artificial} className={(nav) => cx('navbat-item-link', {active: nav.isActive})}>
                    giày cỏ nhân tạo
                </NavLink>
            </li>
            <li className={cx('navbar-item')}>
                <NavLink to={config.routes.futsal} className={(nav) => cx('navbat-item-link', {active: nav.isActive})}>
                    giày futsal
                </NavLink>
            </li>
            <li className={cx('navbar-item')}>
                <NavLink to={config.routes.trademark} className={(nav) => cx('navbat-item-link', {active: nav.isActive})}>
                    thương hiệu
                </NavLink>
            </li>
            <li className={cx('navbar-item')}>
                <NavLink to={config.routes.sale} className={(nav) => cx('navbat-item-link', {active: nav.isActive})}>
                    hot sale
                </NavLink>
            </li>
            <li className={cx('navbar-item')}>
                <NavLink to={config.routes.customer} className={(nav) => cx('navbat-item-link', {active: nav.isActive})}>
                    khách hàng
                </NavLink>
            </li>
            <li className={cx('navbar-item')}>
                <NavLink to={config.routes.contact} className={(nav) => cx('navbat-item-link', {active: nav.isActive})}>
                    liên hệ
                </NavLink>
            </li>
        </ul>
    </div>;
}

export default Navbar;