import classNames from 'classnames/bind';
import styles from './ModelQuantityProduct.module.scss';

import { AiOutlineClose } from 'react-icons/ai';
import { apiUrl } from '~/contexts/constants';
import axios from 'axios';
import { useContext, useState } from 'react';

import { ProductContext } from '~/contexts/ProductContext';

const cx = classNames.bind(styles);

function ModelQuantityProduct({getData, itemProductInPage, pageCurrent, handleQuantity, setHandleQuantity, productSize}) {
    
    const {
        productState: { quantityProduct, products },
        getProduct,
        modelUpdate: { status, product },
        setModelUpdate,
        modelDelete,
        setModelDelete,
        modelFixQuantityProductBySize,
        setModelFixQuantityProductBySize,
    } = useContext(ProductContext);


    const [data, setData] = useState({
        size: handleQuantity.size[0]._id,
        quantity: 0,
    })

    const [error, setError] = useState(false);

    const {size, quantity} = data;

    const handleData = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        })
        setError(false);
    }

    var quantityOfSize = 0;
    var idProductSize;
    var idProduct;
    
    const handleOk = async () => {
        idProductSize = 0;
        idProduct = productSize[0].idProduct;
        productSize.map((e) => {
            if(e.idSize === size){
                quantityOfSize = e.quantity;
                idProductSize = e._id;
            }
        })


        if((handleQuantity.type === -1 && quantityOfSize < quantity) || quantity === 0 || quantity === '0'){
            setError(true);
        } else if(handleQuantity.type === -1) {
            const res = await axios.put(`${apiUrl}/admin/productSize/decrease/${idProductSize}?idProduct=${idProduct}`, data);

            if(res.data.success) {
                getProduct(itemProductInPage, pageCurrent);
                getData();

                setHandleQuantity({
                    status: false,
                })
            }

        } else if(idProductSize === 0){

            var dataCreate = {
                idProduct,
                idSize: size,
                quantity,
            };


            const res = await axios.post(`${apiUrl}/admin/productSize/create`, dataCreate);

            if(res.data.success) {
                getProduct(itemProductInPage, pageCurrent);
                getData();

                setHandleQuantity({
                    status: false,
                })
            }

        }else {
            const res = await axios.put(`${apiUrl}/admin/productSize/increase/${idProductSize}?idProduct=${idProduct}`, data);

            if(res.data.success) {
                getProduct(itemProductInPage, pageCurrent);
                getData();

                setHandleQuantity({
                    status: false,
                })
            }
        }
    }


    return <div onClick={(e) => e.stopPropagation()} className={cx('wrapper')}>
        <div className={cx('container')}>
            <div onClick={() => setHandleQuantity({...handleQuantity, status: false})} className={cx('closed')}><AiOutlineClose /></div>
            <div className={cx('name')}>
            {
                handleQuantity.type === 1 ? "Increase" : "Decrease"
            }
            </div>
            <div className={cx('wrapper-size')}>
                <label className={cx('label-size')}>Size: </label>
                <select onChange={handleData} name="size" className={cx('select-size')}>
                {
                    handleQuantity.size.map((e, i) => (
                        <option key={i} value={e._id}>{e.size.$numberDecimal}</option>
                    ))
                }
                </select>
            </div>
            <div className={cx('wrapper-quantity')}>
                <label className={cx('label-quantity')}>
                The number of products to 
                {
                    handleQuantity.type === 1 ? " increase" : " decrease"
                }
                </label>
                <input value={quantity} onChange={handleData} type='number' name="quantity" placeholder='quantity' className={cx('input-quantity')} />
            </div>

            <div className={cx('noti-error')}>
                {
                    error ? `The amount of the current size is less than ${quantity}` : ""
                }
            </div>

            <div className={cx('wrapper-btn')}>
                <button onClick={() => setHandleQuantity({...handleQuantity, status: false})} className={cx('btn', 'cancel')}>Cancel</button>
                <button onClick={handleOk} className={cx('btn', 'ok')}>Ok</button>
            </div>
        </div>
    </div>;
}

export default ModelQuantityProduct;