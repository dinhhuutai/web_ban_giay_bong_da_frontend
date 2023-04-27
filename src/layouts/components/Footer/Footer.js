import styles from './Footer.module.scss';
import classNames from 'classnames/bind';

import FooterTop from './FooterTop';
import FooterBottom from './FooterBottom';


const cx = classNames.bind(styles);

function Footer() {
    return <div className={cx('wrapper')}>
        <FooterTop />
        <FooterBottom />
    </div>;
}

export default Footer;