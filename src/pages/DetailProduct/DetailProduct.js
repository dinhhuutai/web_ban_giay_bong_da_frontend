import classNames from 'classnames/bind';
import styles from './DetailProduct.module.scss';

import { useParams, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { apiUrl } from '~/contexts/constants';
import axios from 'axios';

import ImageProduct from './ImageProduct';
import InfoProduct from './InfoProduct';
import DescriptionProduct from './DescriptionProduct';
import RelateProduct from './RelateProduct';


const cx = classNames.bind(styles);

function DetailProduct() {

    const id = useSearchParams()[0].get('pd');
    //const [id, setId] = useState(useSearchParams()[0].get('pd'));

    const [product, setProduct] = useState(false);

    const getData = async (id) => {
        const resProduct = await axios.get(`${apiUrl}/product/${id}`);
        

        if(resProduct.data.success){
            setProduct(resProduct.data.product);
        }

    }



    useEffect(() => {
        getData(id);
        
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
        
        
    }, [id]);


    const updateView = async (id) => {
        await axios.get(`${apiUrl}/product/updateView/${id}`);
    }

    useEffect(() => {

        updateView(id)
        

        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }, []);



    return <div className={cx('wrapper')}>
        <div className={cx('grid')}>
            <div className={cx('row')}>
                <div className={cx('col', 'l-6', 'm-12')}>
                    {
                        product && <ImageProduct product={product} />
                    }
                </div>
                
                <div className={cx('col', 'l-6', 'm-12')}>
                    {
                        product && <InfoProduct product={product} />
                    }
                </div>
            </div>

            <div className={cx('row')}>
                <div className={cx('col', 'l-12')}>
                    {
                        product && <DescriptionProduct product={product} />
                    }
                </div>
            </div>

            
            <div className={cx('row')}>
                <div className={cx('col', 'l-12')}>
                    {
                        product && <RelateProduct product={product} />
                    }
                </div>
            </div>
        </div>




    </div>;
}

export default DetailProduct;

