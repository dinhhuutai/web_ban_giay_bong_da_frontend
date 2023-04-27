import { useState } from 'react';

import styles from './FooterTop.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import { BsFacebook, BsTwitter, BsInstagram, BsPinterest } from "react-icons/bs";


const cx = classNames.bind(styles);

function FooterTop() {

    const [input, setInput] = useState('');

    const handleInput = (e) => {
        setInput(e.target.value);
    }


    return <div className={cx('wrapper')}>
        <label for="feedback-input" className={cx('label-feedback')}>mọi ý kiến xin để lại đây:</label>
        <div className={cx('wrapper-feedback')}>
            <input value={input} onChange={handleInput} className={cx('input-feedback')} id='feedback-input' type='text' placeholder='Enter your email' />
            <button className={cx('btn-feedback')}>join us</button>
        </div>
        <ul className={cx('social-list')}>
            <li className={cx('social-item')}>
                <Link to="#" className={cx('social-item-link')}>
                    <BsFacebook className={cx('icon')} />
                </Link>
            </li>
            <li className={cx('social-item')}>
                <Link to="#" className={cx('social-item-link')}>
                    <BsTwitter className={cx('icon')} />
                </Link>
            </li>
            <li className={cx('social-item')}>
                <Link to="#" className={cx('social-item-link')}>
                    <BsInstagram className={cx('icon')} />
                </Link>
            </li>
            <li className={cx('social-item')}>
                <Link to="#" className={cx('social-item-link')}>
                    <BsPinterest className={cx('icon')} />
                </Link>
            </li>
        </ul>
    </div>;
}

export default FooterTop;