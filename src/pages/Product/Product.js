import styles from './Product.module.scss';
import classNames from 'classnames/bind';

import Portfolio from './Portfolio';
import Search from './Search';
import AllProduct from './AllProduct';

import { useEffect, useState, useContext } from 'react';
import { ProductContext } from '~/contexts/ProductContext';
import { useSearchParams } from 'react-router-dom';

const cx = classNames.bind(styles);

function Product() {

    const idCategory = useSearchParams()[0].get('idCategory');
    const idTrademark = useSearchParams()[0].get('idTrademark');

    

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });

        setSearch({
            ...search,
            category: idCategory || -1,
            trademark: [idTrademark || -1],
        });

    }, []);

        
    const {
        getProductBy,
    } = useContext(ProductContext);

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
        getProductBy(10, 0, search);

    }, [search])


    const [sideBar, setSideBar] = useState(false);


    return <div className={cx('wrapper')}>
        <div className={cx('grid')}>
            <div className={cx('row')}>
                <div className={cx('col', 'l-2-4', 'm-0', {sidebar: sideBar})}>
                    <Portfolio setSideBar={setSideBar} onClick={handleSearch} />
                    <Search onClick={handleSearch} />
                </div>
                <div className={cx('col', 'l-10-4', 'm-12')}>
                    <AllProduct onClick={handleSearch} setSideBar={setSideBar} sideBar={sideBar} title={category} search={search} />
                </div>
            </div>
        </div>
    </div>;
}

export default Product;