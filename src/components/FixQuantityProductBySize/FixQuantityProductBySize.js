import classNames from 'classnames/bind';
import styles from './FixQuantityProductBySize.module.scss';

import { apiUrl } from '~/contexts/constants';
import axios from 'axios';

import { AiOutlineClose } from 'react-icons/ai';
import { ProductContext } from '~/contexts/ProductContext';
import { useContext, useEffect, useState } from 'react';

import ModelQuantityProduct from './ModelQuantityProduct';

const cx = classNames.bind(styles);

function FixQuantityProductBySize({itemProductInPage, pageCurrent}) {

    const {
        getProduct,
        modelFixQuantityProductBySize: {status, product},
        setModelFixQuantityProductBySize,
    } = useContext(ProductContext);

    const [productSize, setProductSize] = useState([]);
    const [listSize, setListSize] = useState([]);

    const [handleQuantity, setHandleQuantity] = useState({
        status: false,
        type: 0,
        size: [],
    });

    const getData = async () => {
        const resProductSize = await axios.get(`${apiUrl}/admin/productSize/findProductBySize?id=${product._id}`);
        const resListSize = await axios.get(`${apiUrl}/admin/size`);

        setProductSize(resProductSize.data.quantityBySize);
        setListSize(resListSize.data.size);

        setHandleQuantity({
            ...handleQuantity,
            size: resListSize.data.size,
        })

    }

    useEffect(() => {
        getData();

    }, []);


    return <div onClick={() => setModelFixQuantityProductBySize({status: false, product: {}})} className={cx('wrapper')}>
        <div onClick={(e) => e.stopPropagation()} className={cx('container')}>
            <div onClick={() => setModelFixQuantityProductBySize({status: false, product: {}})} className={cx('closed')}><AiOutlineClose /></div>
            <div className={cx('header')}>
                <div className={cx('name')}>{product.name}</div>
            </div>
            <div className={cx('body')}>
                <div className={cx('wrapper-img')}>
                    <img src={product.image[0]} alt="img" className={cx('img')}></img>
                    <img src={product.image[1]} alt="img" className={cx('img')}></img>
                    <img src={product.image[2]} alt="img" className={cx('img')}></img>
                    <img src={product.image[3]} alt="img" className={cx('img')}></img>
                </div>
                <div className={cx('wrapper-main')}>
                    <div className={cx('wrapper-table')}>
                        <div className={cx('table', 'table-1')}>
                            <div className={cx('roww')}>
                                <div className={cx('cell')}>Size</div>
                            </div>
                            <div className={cx('roww')}>
                                <div className={cx('cell')}>Quantity</div>
                            </div>
                        </div>

                        <div className={cx('table', 'table-2')}>
                            {
                                listSize.map((size, index) => {
                                    var isQuantity = 0;
                                    return <div key={index} className={cx('row')}>
                                        <div className={cx('cell')}>{size.size.$numberDecimal}</div>
                                        <div className={cx('cell')}>
                                            {
                                                (() => {
                                                    var quantityYes;
                                                    productSize.map(element => {
                                                        if(element.idSize._id === size._id){
                                                            isQuantity = 1;
                                                            quantityYes = element.quantity;
                                                        }
                                                    })
    
                                                    return isQuantity === 0 ? "0" : quantityYes;
                                                })()
                                            }
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('footer')}>
                <button onClick={() => setHandleQuantity({...handleQuantity, status: true, type: -1})} className={cx('decrease', 'btn')}>Decrease</button>
                <button onClick={() => setHandleQuantity({...handleQuantity, status: true, type: 1})} className={cx('increase', 'btn')}>Increase</button>
            </div>
        </div>

        {handleQuantity.status ? <ModelQuantityProduct getData={getData} handleQuantity={handleQuantity} setHandleQuantity={setHandleQuantity} productSize={productSize} itemProductInPage={itemProductInPage} pageCurrent={pageCurrent} /> : ''}
    </div>;
}

export default FixQuantityProductBySize;