import styles from './FormRegister.module.scss';
import classNames from 'classnames/bind';
import { useState, useContext } from 'react';

import { AuthContext } from '~/contexts/AuthContext';
import config from '~/config';

import logo from '~/assets/imgs/logo.png';
import { Link, useNavigate, Navigate } from 'react-router-dom';

import Spinner from 'react-bootstrap/Spinner';

const cx = classNames.bind(styles);

function FormRegister({onClick}) {
    
    const {registerUser, authState: {authLoading, isAuthenticated}} = useContext(AuthContext);

    const [login, setLogin] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        fullname: '',
        phone: '',
        address: '',
    })

    const [remember, setRemember] = useState(false);
    const [messageError, setMessageError] = useState(true);
    const [htmlMessageError, setHtmlMessageError] = useState('tài khoản đã tồn tại');

    const {username, password, confirmPassword, fullname, phone, address} = login;

    const handleLogin = e => {
        setMessageError(true);
        setLogin({
            ...login,
            [e.target.name]: e.target.value,
        })
    }

    const handleConfirmPassword = e => {

        if(password.trim() !== '' && confirmPassword.trim() !== '' && password.trim() !== confirmPassword.trim()){
            setHtmlMessageError('confirm password khác password');
            setMessageError(false);
        }

    }

    const navigate = useNavigate();
    const handleSubmit = async e => {
        e.preventDefault();

        if(username.trim() === ''){
            setHtmlMessageError('Bạn chưa nhập username');
        } else if(password.trim() === ''){
            setHtmlMessageError('Bạn chưa nhập password');
        } else if(confirmPassword.trim() === ''){
            setHtmlMessageError('Bạn chưa nhập confirm password');
        } else if(fullname.trim() === ''){
            setHtmlMessageError('Bạn chưa nhập fullname');
        } else if(phone.trim() === ''){
            setHtmlMessageError('Bạn chưa nhập phone');
        } else if(address.trim() === ''){
            setHtmlMessageError('Bạn chưa nhập address');
        } else {
            setHtmlMessageError('tài khoản đã tồn tại');
        }

        if(password.trim() === confirmPassword.trim()){
            try {
                const loginData = await registerUser(login);
                
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
        } else {
            setMessageError(false);
            setHtmlMessageError('confirm password khác password');
        }

    }

    return <div className={cx('wrapper')}>
        <div className={cx('header')}>
            <Link to={config.routes.home}>
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
                <input value={confirmPassword} onBlur={handleConfirmPassword} onChange={handleLogin} placeholder='Confirm Password' className={cx('input')} name='confirmPassword' type='password' />
                <input value={fullname} onChange={handleLogin} placeholder='Full name' className={cx('input')} name='fullname' type='text' />
                <input value={phone} onChange={handleLogin} placeholder='Phone number' className={cx('input')} name='phone' type='text' />
                <input value={address} onChange={handleLogin} placeholder='Address' className={cx('input')} name='address' type='text' />
                <div className={cx('wrapper-remember')}>
                    <input checked={remember} onChange={e => setRemember(e.target.checked)} type='checkbox' className={cx('input-checkbox')} name='remember' />
                    <div className={cx('remember-text')}>
                        You're okay with our 
                        <span>Terms of Service, Privacy Policy</span>
                    </div>
                </div>
                    <div className={cx('wrapper-message-error', {active: messageError})}>
                        <div className={cx('message-error')}>{htmlMessageError}</div>
                    </div>
                <button className={cx('btn')}>Create Acount</button>
            </form>
        }

        <div className={cx('noti-text')}>
            Already have an account?
            <div className={cx('signup-text')} onClick={onClick}>Sign in</div>  
        </div>
    </div>;
}

export default FormRegister;