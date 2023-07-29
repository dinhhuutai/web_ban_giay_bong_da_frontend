import classNames from 'classnames/bind';
import styles from './MyProfile.module.scss';

import { useContext, useEffect, useRef, useState } from 'react';

import { AuthContext } from '~/contexts/AuthContext';
import axios from 'axios';
import uploadImageOne from '~/utils/uploadImageOne';
import {apiUrl} from '~/contexts/constants';

import { AiFillCheckCircle } from "react-icons/ai";


const cx = classNames.bind(styles);

function MyProfile() {
    const {authState: {user}, updateUser} = useContext(AuthContext);
    const [noticeUpdateUser, setNoticeUpdateUser] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        birth: '',
        sex: '',
        avatar: '',
    });

    const [checkAvatar, setCheckAvatar] = useState(false);
    
    
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }, []);


    useEffect(() => {
        var vt;
        var birthTemp;
        if(user && user.birth){
            vt = user.birth.indexOf('T');
            birthTemp = user.birth.slice(0, vt);
        }

        setFormData({
            name: user && user.name,
            email: user && user.email,
            phone: user && user.phone,
            birth: user && birthTemp,
            sex: user && user.sex,
            avatar: user && user.avatar,
        });

    }, [user]);

    const {name, email, phone, birth, sex, avatar} = formData;

    const handleFormData = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    const handleRadioMen = (e) => {
        if(e.target.checked) {
            setFormData({
                ...formData,
                [e.target.name]: 'nam',
            });
        }
    }

    const handleRadioWomen = (e) => {
        if(e.target.checked) {
            setFormData({
                ...formData,
                [e.target.name]: 'nu',
            });
        }
    }

    const handleRadioOther = (e) => {
        if(e.target.checked) {
            setFormData({
                ...formData,
                [e.target.name]: 'khac',
            });
        }
    }

    var imageRef = useRef();


    const [image, setImage] = useState('');
    const handleImg = (e) => {
        const check = e.target.files[0];
        const urlImg = URL.createObjectURL(check);
        setImage(e.target.files[0]);
        setCheckAvatar(true);

        imageRef.current.src = urlImg;
    }


    const handleUploadOneImg = async () => {

        const uploadData = uploadImageOne(image);

        return await axios.post(`${apiUrl}/user/uploadimgOne`, uploadData);
    }

    const handleSave = async () => {
        
        let productData = {
            ...formData,
            avatar: null,
        }

        if(checkAvatar) {
            const dataImg = await handleUploadOneImg();
        
            productData = {
                ...formData,
                avatar: dataImg.data.link.path,
            }

        }

        const response = await axios.put(`${apiUrl}/user/update`, productData);

        if(response.data.success) {
            updateUser(response.data.user);
            setNoticeUpdateUser(true);
            
        }
        
    }

    const handleCloseNotice = () => {
        setNoticeUpdateUser(false);
    }
    



    return <><div className={cx('wrapper')}>
        <div className={cx('title')}>Hồ sơ của tôi</div>
        <div className={cx('grid')}>
            <div className={cx('row')}>
                <div className={cx('col', 'l-8', 'm-12')}>
                    <div className={cx('wrapper-name')}>
                        <label className={cx('label', 'label-name')}>Tên</label>
                        <input onChange={handleFormData} value={name} className={cx('input-name')} placeholder='' name='name' type="text" />
                    </div>
                    
                    <div className={cx('wrapper-email')}>
                        <label className={cx('label', 'label-email')}>Email</label>
                        <input onChange={handleFormData} value={email} className={cx('input-email')} placeholder='' name='email' type="text" />
                    </div>
                    
                    <div className={cx('wrapper-phone')}>
                        <label className={cx('label', 'label-phone')}>Phone</label>
                        <input onChange={handleFormData} value={phone} className={cx('input-phone')} placeholder='' name='phone' type="text" />
                    </div>
                    
                    <div className={cx('wrapper-date')}>
                        <label className={cx('label', 'label-date')}>Ngày sinh</label>
                        <input onChange={handleFormData} value={birth} className={cx('input-date')} placeholder='' name='birth' type="date" />
                    </div>
                    
                    <div className={cx('wrapper-sex')}>
                        <label className={cx('label', 'label-sex')}>Giới tính</label>
                        <div className={cx('wrapper-children-sex')}>
                            <div className={cx('wrapper-man')}>
                                <input checked={sex === 'nam'} onChange={handleRadioMen} className={cx('input-sex')} placeholder='' name='sex' type="radio" />
                                <label className={cx('label-children', 'label-man')}>Nam</label>
                            </div>
                            <div className={cx('wrapper-women')}>
                                <input checked={sex === 'nu'} onChange={handleRadioWomen} className={cx('input-sex')} placeholder='' name='sex' type="radio" />
                                <label className={cx('label-children', 'label-women')}>Nữ</label>
                            </div>
                            <div className={cx('wrapper-order')}>
                                <input checked={sex === 'khac'} onChange={handleRadioOther} className={cx('input-sex')} placeholder='' name='sex' type="radio" />
                                <label className={cx('label-children', 'label-order')}>Khác</label>
                            </div>
                        </div>
                    </div>

                    <div className={cx('wrapper-btn-save')}>
                        <button onClick={handleSave} className={cx('btn-save')}>Lưu</button>
                    </div>
                </div>
                
                <div className={cx('col', 'l-4', 'm-12')}>
                    <div className={cx('wrapper-select-avatar')}>
                        <div className={cx('wrapper-avatar')}>
                            <img ref={imageRef} alt="avatar" className={cx('img-avatar')} src={avatar && (avatar[1] || avatar[0]) } />
                        </div>
    
                        <div className={cx('wrapper-input-img')}>
                            <input onChange={handleImg} accept="image/png, image/jpeg" className={cx('input-avatar')} placeholder='' name='sex' type="file" />
                            <div className={cx('word')}>Chọn Ảnh</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    
    {
        noticeUpdateUser && <div onClick={handleCloseNotice} className={cx('wrapper-notice')}>
            <div onClick={(e) => e.stopPropagation()} className={cx('container')}>
                <div className={cx('icon-success')}><AiFillCheckCircle /></div>
                <div className={cx('content')}>Cập nhật hồ sơ</div>
            </div>
        </div>
    }
    </>;
}

export default MyProfile;