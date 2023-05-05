import styles from './Login.module.scss';
import classNames from 'classnames/bind';

import loginImg from '~/assets/imgs/login.png';
import register1 from '~/assets/imgs/register-1.png';
import register2 from '~/assets/imgs/register-2.png';
import register3 from '~/assets/imgs/register-3.png';

import FormLogin from './FormLogin';
import FormRegister from './FormRegister';
import { useState } from 'react';

const cx = classNames.bind(styles);

function Login() {

    const [login, setLogin] = useState(true);

    const handleLogin = (e) => {
        setLogin(!login);
    }


    return <div className={cx('wrapper')}>
        <div className={cx('wrapper-bg')}>
            <div className={cx('bg-login', {active: login})}>
                <img src={loginImg} alt='img' className={cx('img-login')} />
                <div className={cx('text-login')}><span>Welcome</span><span>Back</span></div>
            </div>
            <div className={cx('bg-register', {active: login})}>
                <img src={register1} alt='img' className={cx('img-register-1')} />
                <div className={cx('wrapper-register-bot')}>
                    <div className={cx('text-register')}>Create New <span>Acount</span></div>
                    <div className={cx('wrapper-img-register')}>
                        <img src={register2} alt='img' className={cx('img-register-2')} />
                        <img src={register3} alt='img' className={cx('img-register-3')} />
                    </div>
                </div>
            </div>
        </div>
        <div className={cx('wrapper-login')}>
            <div className={cx('wrapper-formlogin', {active: login})}>
                <FormLogin onClick={handleLogin} />
            </div>
            <div className={cx('wrapper-formregister', {active: login})}>
                <FormRegister onClick={handleLogin} />
            </div>
        </div>
    </div>;
}

export default Login;