import classNames from 'classnames/bind';
import styles from './TopProduct.module.scss';

import { AiFillEye } from "react-icons/ai";


const cx = classNames.bind(styles);

function TopProduct({data}) {




    return <div className={cx('wrapper')}>
        <div className={cx('title')}>Top Product</div>
        <div className={cx('list')}>
            {
                data.map((user, index) => 
                    <div key={index} className={cx('item')}>
                        <div className={cx('wrapper-avatar')}><img className={cx('avatar')} alt='avatar' src={user.image[0]} /></div>

                        <div className={cx('wrapper-info')}>
                            <div className={cx('info')}>
                                <div className={cx('name')}>{user.name}</div>
                                <div className={cx('view')}>
                                    <div className={cx('wrapper-icon-view')}>
                                        <AiFillEye />
                                    </div>
                                    {user.view}
                                </div>
                            </div>
                            <div className={cx('spend')}>{user.quantitySold.toLocaleString()}</div>
                        </div>
                    </div>
                )
            }
        </div>
    </div>;
}

export default TopProduct;