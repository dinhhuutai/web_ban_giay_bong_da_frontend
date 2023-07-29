import classNames from 'classnames/bind';
import styles from './TopUser.module.scss';
import { useEffect } from 'react';


const cx = classNames.bind(styles);

function TopUser({data}) {



    return <div className={cx('wrapper')}>
        <div className={cx('title')}>Top User</div>
        <div className={cx('list')}>
            {
                data.map((user, index) => 
                    <div key={index} className={cx('item')}>
                        <div className={cx('wrapper-avatar')}><img className={cx('avatar')} alt='avatar' src={user.avatar[1] || user.avatar[0]} /></div>

                        <div className={cx('wrapper-info')}>
                            <div className={cx('info')}>
                                <div className={cx('name')}>{user.name}</div>
                                <div className={cx('email')}>{user.phone}</div>
                            </div>
                            <div className={cx('spend')}>{(user.spend/1000).toLocaleString()}k đ</div>
                        </div>
                    </div>
                )
            }
        </div>
    </div>;
}

export default TopUser;