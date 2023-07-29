import classNames from 'classnames/bind';
import styles from './UserList.module.scss';
import { useEffect, useState } from 'react';

import {
    AiOutlineDoubleLeft,
    AiOutlineDoubleRight,
    AiOutlineEllipsis,
} from 'react-icons/ai';


import axios from 'axios';
import { apiUrl } from '~/contexts/constants';


const cx = classNames.bind(styles);

function UserList() {
    
    const [pageCurrent, setPageCurrent] = useState(0);
    const [itemUserInPage, setItemUserInPage] = useState(10);

    const [isPrev, setIsPrev] = useState(true);
    const [isNext, setIsNext] = useState(false);

    const [userState, setUserState] = useState({
        users: [],
        quantityUser: 0,
    })

    const {users, quantityUser} = userState;

    const handlePrev = (e) => {
        const page = pageCurrent === 0 ? 0 : pageCurrent - 1;
        setPageCurrent(page);
        if (page === 0) {
            setIsPrev(true);
        } else {
            setIsPrev(false);
        }
        if (page === Math.floor(quantityUser / itemUserInPage)) {
            setIsNext(true);
        } else {
            setIsNext(false);
        }
    };
    
    const handleNext = (e) => {
        const page =
        pageCurrent === Math.floor(quantityUser / itemUserInPage)
                ? Math.floor(quantityUser / itemUserInPage)
                : pageCurrent + 1;
                
        setPageCurrent(page);
        if (page === 0) {
            setIsPrev(true);
        } else {
            setIsPrev(false);
        }
        if (page === Math.floor(quantityUser / itemUserInPage)) {
            setIsNext(true);
        } else {
            setIsNext(false);
        }
    };
    
    const handleNum = (page) => {
        if (pageCurrent !== page) {
            setPageCurrent(page);
        }
        if (page === 0) {
            setIsPrev(true);
        } else {
            setIsPrev(false);
        }
        if (page === Math.floor(quantityUser / itemUserInPage)) {
            setIsNext(true);
        } else {
            setIsNext(false);
        }
    };


    const getData = async (itemUserInPage, pageCurrent) => {

        const response = await axios.get(`${apiUrl}/admin/user?limit=${itemUserInPage}&skip=${itemUserInPage * pageCurrent}`);

        if(response.data.success){
            setUserState({
                users: response.data.user,
                quantityUser: response.data.quantityUser,
            })
        }


    }
    
    useEffect(() => {
        getData(itemUserInPage, pageCurrent)
    }, [pageCurrent]);




    return <div className={cx('wrapper')}>
        <div className={cx('header')}>
            <label className={cx('label-total-user')}>Tổng người dùng:</label>
            <div className={cx('total-user')}>{quantityUser}</div>
        </div>

        <div className={cx('body')}>
            <div className={cx('table')}>
                <div className={cx('row')}>
                    <div className={cx('cell', 'cell-stt')}>STT</div>
                    <div className={cx('cell', 'cell-avatar')}>Avatar</div>
                    <div className={cx('cell', 'cell-full-name')}>Full name</div>
                    <div className={cx('cell', 'cell-role')}>Role</div>
                    <div className={cx('cell', 'cell-email')}>Email</div>
                    <div className={cx('cell', 'cell-phone')}>Phone</div>
                    <div className={cx('cell', 'cell-create-at')}>Create At</div>
                </div>

                {
                    users.map((user, index) => 

                        <div key={index} className={cx('row')}>
                            <div className={cx('cell', 'cell-stt')}>{index + 1 + pageCurrent * itemUserInPage}</div>
                            <div className={cx('cell', 'cell-avatar')}><img className={cx('cell-avatar-img')} alt='img' src={user.avatar[1] || user.avatar[0]} /></div>
                            <div className={cx('cell', 'cell-full-name')}>{user.name}</div>
                            <div className={cx('cell', 'cell-role')}>{user.role}</div>
                            <div className={cx('cell', 'cell-email')}>{user.email}</div>
                            <div className={cx('cell', 'cell-phone')}>{user.phone}</div>
                            <div className={cx('cell', 'cell-create-at')}>{user.createAt.split('T')[0]}</div>
                        </div>

                    )
                }

            </div>
        </div>


        <div className={cx('wrapper-paging')}>
                <div className={cx('paging')}>
                    <div onClick={handlePrev} className={cx('page', 'prev', { enable: isPrev })}>
                        <AiOutlineDoubleLeft />
                    </div>
                    {[0, 1, 2, 3, 4].map((element, index) => {
                        if (Math.floor(quantityUser / itemUserInPage) + 1 <= 5) {
                            if (index + 1 <= Math.floor(quantityUser / itemUserInPage) + 1) {
                                return (
                                    <div
                                        onClick={() => handleNum(element)}
                                        key={index}
                                        className={cx('page', 'number', { active: index === pageCurrent })}
                                    >
                                        {element + 1}
                                    </div>
                                );
                            }
                        } else {
                            if (
                                (index === 3 &&
                                    pageCurrent + 1 < Math.floor(quantityUser / itemUserInPage) + 1 - 2) ||
                                (index === 1 &&
                                    pageCurrent + 1 >= Math.floor(quantityUser / itemUserInPage) + 1 - 2)
                            ) {
                                return (
                                    <div className={cx('page', 'dot')}>
                                        <AiOutlineEllipsis />
                                    </div>
                                );
                            } else if (
                                (index === 4 &&
                                    pageCurrent + 1 < Math.floor(quantityUser / itemUserInPage) + 1 - 2) ||
                                (index === 0 &&
                                    pageCurrent + 1 >= Math.floor(quantityUser / itemUserInPage) + 1 - 2)
                            ) {
                                if (index === 0) {
                                    return (
                                        <div onClick={() => handleNum(0)} value={1} className={cx('page', 'number')}>
                                            1
                                        </div>
                                    );
                                } else {
                                    return (
                                        <div
                                            onClick={() => handleNum(Math.floor(quantityUser / itemUserInPage))}
                                            className={cx('page', 'number')}
                                        >
                                            {Math.floor(quantityUser / itemUserInPage) + 1}
                                        </div>
                                    );
                                }
                            } else {
                                if (pageCurrent + 1 === 1) {
                                    return (
                                        <div
                                            onClick={() => handleNum(pageCurrent + element)}
                                            className={cx('page', 'number', {
                                                active: pageCurrent + 1 + element === pageCurrent + 1,
                                            })}
                                        >
                                            {pageCurrent + 1 + element}
                                        </div>
                                    );
                                } else if (pageCurrent + 1 >= Math.floor(quantityUser / itemUserInPage) + 1 - 2) {
                                    return (
                                        <div
                                            onClick={() =>
                                                handleNum(Math.floor(quantityUser / itemUserInPage) + element - 4)
                                            }
                                            className={cx('page', 'number', {
                                                active:
                                                    Math.floor(quantityUser / itemUserInPage) +
                                                        1 +
                                                        element -
                                                        4 ===
                                                    pageCurrent + 1,
                                            })}
                                        >
                                            {Math.floor(quantityUser / itemUserInPage) + 1 + element - 4}
                                        </div>
                                    );
                                } else {
                                    return (
                                        <div
                                            onClick={() => handleNum(pageCurrent + element - 1)}
                                            className={cx('page', 'number', {
                                                active: pageCurrent + 1 + element - 1 === pageCurrent + 1,
                                            })}
                                        >
                                            {pageCurrent + 1 + element - 1}
                                        </div>
                                    );
                                }
                            }
                        }
                    })}
                    <div onClick={handleNext} className={cx('page', 'next', { enable: isNext })}>
                        <AiOutlineDoubleRight />
                    </div>
                </div>
            </div>
    </div>;
}

export default UserList;