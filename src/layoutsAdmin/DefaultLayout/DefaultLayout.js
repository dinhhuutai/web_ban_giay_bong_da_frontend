import styles from './DefaultLayout.module.scss';
import classNames from 'classnames/bind';

import HeaderAdmin from '~/layoutsAdmin/components/Header';
import SidebarAdmin from '~/layoutsAdmin/components/Sidebar';


const cx = classNames.bind(styles);


function DefaultLayout({children}) {

    return (
        <div className={cx('wrapper')}>
            <SidebarAdmin />
            <div className={cx('container')}>
                <HeaderAdmin />
                <div className={cx('content', 'dark')}>{children}</div>
            </div>
        </div>
    );
}

export default DefaultLayout;