import styles from './Product.module.scss';
import classNames from 'classnames/bind';

import Portfolio from './Portfolio';
import Search from './Search';
import AllProduct from './AllProduct';

import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function Product() {

    const [search, setSearch] = useState({
        category: -1,
        trademark: [-1],
        price: [-1, -1],
        color: [-1],
        arrange: 0,
    })
    const [category, setCategory] = useState('tất cả sản phẩm');

    
    const handleSearch = (searchName, value, index) => {

        if(searchName === 'danh muc'){
            setCategory(value);
            setSearch({
                ...search,
                category: index,
            })
        } else if(searchName === 'thuong hieu') {
            setSearch({
                ...search,
                trademark: value,
            })
        } else if(searchName === 'gia') {
            setSearch({
                ...search,
                price: value,
            })
        } else if(searchName === 'mau') {
            setSearch({
                ...search,
                color: value,
            })
        } else if(searchName === 'sap xep') {
            setSearch({
                ...search,
                arrange: value,
            })
        }

    }

    
    useEffect(() => {
        console.log(search);
    }, [search])


    return <div className={cx('wrapper')}>
        <div className={cx('grid')}>
            <div className={cx('row')}>
                <div className={cx('col', 'l-2-4')}>
                    <Portfolio onClick={handleSearch} />
                    <Search onClick={handleSearch} />
                </div>
                <div className={cx('col', 'l-10-4')}>
                    <AllProduct onClick={handleSearch} title={category} />
                </div>
            </div>
        </div>
    </div>;
}

export default Product;