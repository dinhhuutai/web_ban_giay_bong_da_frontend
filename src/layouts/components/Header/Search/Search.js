import styles from './Search.module.scss';
import classNames from 'classnames/bind';

import {useState} from 'react';
import { AiOutlineSearch } from "react-icons/ai";


const cx = classNames.bind(styles);


function Search() {

    const [input, setInput] = useState('');

    const handleInput = (e) => {
        setInput(e.target.value);
    }


    return <div className={cx('wrapper')}>
        <input value={input} onChange={(e) => handleInput(e)} type='text' className={cx('input')} placeholder='Bạn đang tìm kiếm...' />
        <AiOutlineSearch className={cx('icon-search')} />
    </div>;
}

export default Search;