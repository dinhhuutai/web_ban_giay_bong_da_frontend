import classNames from 'classnames/bind';
import styles from './RelateProduct.module.scss';

import InfoProduct from '~/components/InfoProduct';
import { useEffect, useState } from 'react';

import axios from 'axios';
import { apiUrl } from '~/contexts/constants';
import { useNavigate } from 'react-router-dom';

import config from '~/config';


const cx = classNames.bind(styles);

function RelateProduct({product}) {

    const [products, setProducts] = useState([]);

    const getData = async () => {
        const relateProducts = await axios.get(`${apiUrl}/product/relate/${product._id}?idCategory=${product.idCategory._id}&idTrademark=${product.idTrademark._id}&limit=10`);

        if(relateProducts.data.success){
            setProducts(relateProducts.data.products);
        }


    }

    useEffect(() => {
        getData();

    }, [product]);


    const navigate = useNavigate();

    const handleSeeMore = () => {
        navigate(`${config.routes.product}?idCategory=${product.idCategory._id}&idTrademark=${product.idTrademark._id}`);
    }



    return <div className={cx('wrapper')}>
        <div className={cx('title')}>sản phẩm liên quan</div>
        <div className={cx('list-product')}>
            <div className={cx('grid')}>
                <div className={cx('row')}>
                    {
                        products.map((apiProduct, index) => 
                            <div key={index} className={cx('col', 'l-2-5', 'm-6')}>
                                <InfoProduct apiProduct={apiProduct} />
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
        <div className={cx('btn')}>
            <button onClick={handleSeeMore} className={cx('see-more')}>Xem thêm</button>
        </div>
    </div>;
}

export default RelateProduct;