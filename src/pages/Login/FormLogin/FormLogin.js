import styles from './FormLogin.module.scss';
import classNames from 'classnames/bind';
import { useState, useContext } from 'react';

import { AuthContext } from '~/contexts/AuthContext';

import config from '~/config';

import logo from '~/assets/imgs/logo.png';
import { Link, useNavigate, Navigate } from 'react-router-dom';

import Spinner from 'react-bootstrap/Spinner';

const cx = classNames.bind(styles);

function FormLogin({onClick}) {

    const {loginUser, authState: {authLoading, isAuthenticated}} = useContext(AuthContext);

    const [login, setLogin] = useState({
        username: '',
        password: '',
    })

    const [remember, setRemember] = useState(false);
    const [messageError, setMessageError] = useState(true);
    const [htmlMessageError, setHtmlMessageError] = useState('username hoặc password không chính xác');

    const {username, password} = login;
    const handleLogin = e => {
        setMessageError(true);
        setLogin({
            ...login,
            [e.target.name]: e.target.value,
        })
    }

    const navigate = useNavigate();
    const handleSubmit = async e => {
        e.preventDefault();

        if(username.trim() === ''){
            setHtmlMessageError('Bạn chưa nhập username');
        } else if(password.trim() === ''){
            setHtmlMessageError('Bạn chưa nhập password');
        } else {
            setHtmlMessageError('username hoặc password không chính xác');
        }


        try {
            const loginData = await loginUser(login);
            
            setMessageError(true);

            if(loginData.success && loginData.role === 'user'){
                navigate(config.routes.home);
            } else if(loginData.success && loginData.role === 'admin') {
                navigate(config.routes.adminStatistical);
            } else if(!loginData.success) {
                setMessageError(false);
            }


        } catch (error) {
            console.log(error);
        }

    }


    return <div className={cx('wrapper')}>
        <div className={cx('header')}>
            <Link to={config.routes.home} >
                <img alt="logo" className={cx('logo-img')} src={logo} />
            </Link>
            <div className={cx('header-text')}>Shop giày bóng đá chính hãng</div>
        </div>

        {
            authLoading === true ?
            <div className='d-flex justify-content-center mt-2'>
                <Spinner animation='border' variant='info' />
            </div> : isAuthenticated === true ?
            <Navigate to={config.routes.home} /> :
            <form className={cx('form-login')} onSubmit={handleSubmit}>
                <input value={username} onChange={handleLogin} placeholder='Enter username' className={cx('input')} name='username' type='text' />
                <input value={password} onChange={handleLogin} placeholder='Password' className={cx('input')} name='password' type='password' />
                <div className={cx('wrapper-remember')}>
                    <input checked={remember} onChange={e => setRemember(e.target.checked)} type='checkbox' className={cx('input-checkbox')} name='remember' />
                    <div className={cx('remember-text')}>Remember me</div>
                </div>
                <div className={cx('wrapper-message-error', {active: messageError})}>
                    <div className={cx('message-error')}>{htmlMessageError}</div>
                </div>
                <button className={cx('btn')}>Sign in</button>
            </form>
        }

        <div className={cx('noti-text')}>
            Don't have an account?
            <div className={cx('signup-text')} onClick={onClick}>Sign up</div>  
        </div>
    </div>;
}

export default FormLogin;