import { Link } from 'react-router-dom';
import styles from './FooterBottom.module.scss';
import classNames from 'classnames/bind';

import { BiMap, BiPhone, BiTimeFive, BiEnvelope } from "react-icons/bi";
import logoStripe from '~/assets/imgs/stripe.png';
import logoPaypal from '~/assets/imgs/PayPal.svg.png';
import logoVisa from '~/assets/imgs/Visa.svg.webp';
import logoMasterCard from '~/assets/imgs/MasterCard.svg.png';

const cx = classNames.bind(styles);

function FooterBottom() {
    return <div className={cx('wrapper')}>
        <div className={cx('wrapper-info')}>
            <div className={cx('info')}>
                <div className={cx('title')}>categories</div>
                <ul className={cx('list')}>
                    <li className={cx('item')}>
                        <Link to="#" className={cx('item-link')}>Cỏ Nhân Tạo</Link>
                    </li>
                    <li className={cx('item')}>
                        <Link to="#" className={cx('item-link')}>Cỏ Tự Nhiên</Link>
                    </li>
                    <li className={cx('item')}>
                        <Link to="#" className={cx('item-link')}>Sân Futsal</Link>
                    </li>
                </ul>
            </div>
            <div className={cx('info')}>
                <div className={cx('title')}>infomation</div>
                <ul className={cx('list')}>
                    <li className={cx('item')}>
                        <Link to="#" className={cx('item-link')}>About Us</Link>
                    </li>
                    <li className={cx('item')}>
                        <Link to="#" className={cx('item-link')}>Contact Us</Link>
                    </li>
                    <li className={cx('item')}>
                        <Link to="#" className={cx('item-link')}>Blog</Link>
                    </li>
                    <li className={cx('item')}>
                        <Link to="#" className={cx('item-link')}>FAQs</Link>
                    </li>
                </ul>
            </div>
            <div className={cx('info')}>
                <div className={cx('title')}>useful links</div>
                <ul className={cx('list')}>
                    <li className={cx('item')}>
                        <Link to="#" className={cx('item-link')}>Terms & Conditions</Link>
                    </li>
                    <li className={cx('item')}>
                        <Link to="#" className={cx('item-link')}>Returns & Exchanges</Link>
                    </li>
                    <li className={cx('item')}>
                        <Link to="#" className={cx('item-link')}>Shipping & Delivery</Link>
                    </li>
                    <li className={cx('item')}>
                        <Link to="#" className={cx('item-link')}>Privacy Policy</Link>
                    </li>
                </ul>
            </div>
            <div className={cx('info')}>
                <div className={cx('title')}>contact us</div>
                <ul className={cx('list')}>
                    <li className={cx('item')}>
                        <Link to="#" className={cx('item-link')}>
                            <div className={cx('wrapper-icon')}><BiMap className={cx('icon')} /></div>
                            <div className={cx('text')}>1 Vo Van Ngan, TP Thu Duc, TP HCM</div>
                        </Link>
                    </li>
                    <li className={cx('item')}>
                        <Link to="#" className={cx('item-link')}>
                            <div className={cx('wrapper-icon')}><BiPhone className={cx('icon')} /></div>
                            <div className={cx('text')}>+84 123456789</div>
                        </Link>
                    </li>
                    <li className={cx('item')}>
                        <Link to="#" className={cx('item-link')}>
                            <div className={cx('wrapper-icon')}><BiTimeFive className={cx('icon')} /></div>
                            <div className={cx('text')}>All week 24/7</div>
                        </Link>
                    </li>
                    <li className={cx('item')}>
                        <Link to="#" className={cx('item-link')}>
                            <div className={cx('wrapper-icon')}><BiEnvelope className={cx('icon')} /></div>
                            <div className={cx('text')}>20110117student.hcmute.edu.vn</div>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>

        <div className={cx('payment')}>
            <img className={cx('stripe')} src={logoStripe} alt='logo stripe' />
            <ul className={cx('list-payment')}>
                <li className={cx('item-payment')}>
                    <img className={cx('img-payment')} src={logoPaypal} alt='logo paypal' />
                </li>
                <li className={cx('item-payment')}>
                    <img className={cx('img-payment')} src={logoVisa} alt='logo visa' />
                </li>
                <li className={cx('item-payment')}>
                    <img className={cx('img-payment')} src={logoMasterCard} alt='logo master card' />
                </li>
            </ul>
        </div>
    </div>;
}

export default FooterBottom;