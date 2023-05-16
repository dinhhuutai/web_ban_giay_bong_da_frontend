import styles from './ModelDelete.module.scss';
import classNames from 'classnames/bind';

import { useContext } from 'react';
import {ProductContext} from '~/contexts/ProductContext';

import { AiOutlineClose } from 'react-icons/ai';

const cx = classNames.bind(styles);

function ModelDelete({title}) {

    const {
        modelDelete,
        setModelDelete,
    } = useContext(ProductContext);

    const handleClose = () => {
        setModelDelete(false);
    }

    return <div className={cx('wrapper')}>
        <div className={cx('container')}>
            <div className={cx('header')}>
                <div onClick={handleClose} className={cx('icon-close')}><AiOutlineClose /></div>
            </div>
            <span className={cx('title')}>{title}</span>
            <div className={cx('wrapper-answer')}>
                <button className={cx('answer', 'no')}>Không</button>
                <button className={cx('answer', 'yes')}>Có</button>
            </div>
        </div>
    </div>;
}

export default ModelDelete;