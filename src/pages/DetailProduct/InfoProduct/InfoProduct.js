import classNames from 'classnames/bind';
import styles from './InfoProduct.module.scss';

import { AiOutlineMinus, AiOutlinePlus, AiOutlineCheck, AiFillCheckCircle } from "react-icons/ai";
import axios from 'axios';

import { apiUrl } from '~/contexts/constants';
import { useContext, useEffect, useState } from 'react';

import { AuthContext } from '~/contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

import config from '~/config';


const cx = classNames.bind(styles);

function InfoProduct({product}) {

    const {
        uploadCart,
    } = useContext(AuthContext);

    const [sizeAndQuantity, setSizeAndQuantity] = useState([]);
    const [selectSize, setSelectSize] = useState({});

    const [valueQuantity, setValueQuantity] = useState(1);

    const navigate = useNavigate();


    const getData = async () => {
        const productBySize = await axios.get(`${apiUrl}/admin/productSize/findProductBySize?id=${product._id}`);

        if(productBySize.data.success) {

            var temp = [];
            var filter;
            var length = 0;
            productBySize.data.quantityBySize.map((e) => {
                filter = {
                    id: e.idSize._id,
                    size: e.idSize.size.$numberDecimal,
                    quantity: e.quantity,
                }

                length = temp.length;
                for(var i = 0; i < length; i++){
                    if(length === 1){
                        if(temp[i].size * 1 > filter.size * 1) {
                            temp.splice(0, 0, filter);
                            return;
                        } else {
                            temp.splice(1, 0, filter);
                            return;
                        }
                    } else if(temp[0].size * 1 > filter.size * 1) {
                        temp.splice(0, 0, filter);
                        return;

                    } else if(temp[length - 1].size * 1 < filter.size * 1) {
                        temp.splice(length, 0, filter);
                        return;

                    } else if(temp[i].size * 1 < filter.size * 1 && temp[i + 1].size * 1 > filter.size * 1) {
                        temp.splice(i + 1, 0, filter);
                        return;
                    }
                }

                if(length === 0) {
                    temp.push(filter);
                }

            });

            setSizeAndQuantity(temp);

            var indexSize = 0;
            var templength = temp.length;
            for(var i = 0; i < templength; i++){
                if(temp[i].quantity !== 0){
                    indexSize = i;
                    setSelectSize(temp[indexSize]);
                    return;
                }
            };

        }
    }

    useEffect(() => {
        getData();
        setValueQuantity(1);
    }, [product]);


    const handleSelectSize = (e) => {
        if(e.quantity*1 !== 0) {
            setSelectSize(e);
            setValueQuantity(1);
        }
    }

    const handleAdjust = (type) => {
        if(type === -1){
            if(valueQuantity > 1){
                setValueQuantity(valueQuantity - 1);
            }
        }

        if(type === 1){
            if(valueQuantity < selectSize.quantity*1){
                setValueQuantity(valueQuantity + 1);
            }
        }
    }


    const [modelAddCart, setModelAddCart] = useState(false);

    const hanldeAddOnCart = () => {
        const data = {
            idProduct: product._id,
            quantity: valueQuantity,
            idSize: selectSize.id,
        };

        const isUpdateCartSuccess = uploadCart(data);
        if(isUpdateCartSuccess) {
            setModelAddCart(true);
            setTimeout(() => {
                setModelAddCart(false);
            }, 2000);
        }

    }

    const handleBuy = () => {
        const data = {
            idProduct: product._id,
            quantity: valueQuantity,
            idSize: selectSize.id,
        };

        const isUpdateCartSuccess = uploadCart(data);
        if(isUpdateCartSuccess) {
            navigate(config.routes.cart);
        }
    }


    return <div className={cx('wrapper')}>
        <div className={cx('name')}>{product.name}</div>
        <span className={cx('price')}>{product.price.toLocaleString()}<span className={cx('unit')}>đ</span></span>
        <div className={cx('wrapper-category')}>
            <label className={cx('label-categoryy')}>Loại:</label>
            <span className={cx('name-category')}>{product.idCategory.name}</span>
        </div>
        <div className={cx('wrapper-size')}>
            <label className={cx('label-size')}>Kích thước:</label>
            <ul className={cx('list-size')}>
                {
                    sizeAndQuantity.map((e, i) => 
                        <li onClick={() => handleSelectSize(e)} key={i} className={cx('item-size', e.size*1 === selectSize.size*1 ? 'active-size' : "", e.quantity === 0 ? "blur" : "")}>
                            {e.size}
                            <div className={cx(e.size*1 === selectSize.size*1 ? 'icon-active' : "hide-icon")}><AiOutlineCheck /></div>
                        </li>
                    )
                }
            </ul>
        </div>
        <div className={cx('wrapper-quantity')}>
            <label className={cx('label-quantity')}>Số lượng:</label>
            <div className={cx('wrapper-adjust')}>
                <button onClick={() => handleAdjust(-1)} className={cx('decrease')}><AiOutlineMinus /></button>
                <span className={cx('quantity')}>{valueQuantity}</span>
                <button onClick={() => handleAdjust(1)} className={cx('increase')}><AiOutlinePlus /></button>
            </div>
            <button onClick={hanldeAddOnCart} className={cx('btn-add-cart')}>Thêm vào giỏ</button>
        </div>
        <div className={cx('wrapper-warehouse')}>
            <label className={cx('label-warehouse')}>Kho:</label>
            <span className={cx('quantity-warehouse')}>
                {
                    sizeAndQuantity.map((e, i) => e.size*1 === selectSize.size*1 ? e.quantity : "")
                }
            </span>
        </div>
        <button onClick={handleBuy} className={cx('btn-buy')}>
            mua ngay
        </button>
        <div className={cx('wrapper-sold')}>
            <label className={cx('label-sold')}>Đã bán:</label>
            <span className={cx('quantity-sold')}>{product.quantitySold}</span>
        </div>

        {
            modelAddCart && 
            <div className={cx('model-notice')}>
                <div className={cx('container')}>
                    <div className={cx('icon')}><AiFillCheckCircle /></div>
                    <div className={cx('content')}>Sản phẩm đã được thêm vào giỏ hàng</div>
                </div>
            </div>
        }
    </div>;
}

export default InfoProduct;