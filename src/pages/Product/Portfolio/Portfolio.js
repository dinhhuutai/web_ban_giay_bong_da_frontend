import { useEffect, useState } from 'react';
import styles from './Portfolio.module.scss';
import classNames from 'classnames/bind';

import { apiUrl } from '~/contexts/constants';
import axios from 'axios';

import { AiOutlineCloseCircle } from "react-icons/ai";


const cx = classNames.bind(styles);

function Portfolio({onClick, setSideBar}) {

    const [apiPortfolios, setApiPortfolios] = useState([]);

    const getData = async () => {
        const listCategory = await axios.get(`${apiUrl}/admin/category`);

        setApiPortfolios(listCategory.data.category);
    };

    useEffect(() => {
        getData();
    }, []);


    return <div className={cx('wrapper')}>
        <div className={cx('portfolio')}>
            <div onClick={() => setSideBar(false)} className={cx('wrapper-closed')}>
                <AiOutlineCloseCircle />
            </div>
            <div className={cx('title')}>danh mục sản phẩm</div>
            <ul className={cx('list-portfolio')}>
                <li onClick={() => onClick('danh muc', 'tất cả sản phẩm', -1)} className={cx('item-portfolio')}>tất cả</li>
                {
                    apiPortfolios.map((apiPortfolio, index) => 
                        <li key={index} onClick={() => onClick('danh muc', apiPortfolio.name, apiPortfolio._id)} className={cx('item-portfolio')}>{apiPortfolio.name}</li>
                    )
                }
            </ul>
        </div>
    </div>;
}

export default Portfolio;