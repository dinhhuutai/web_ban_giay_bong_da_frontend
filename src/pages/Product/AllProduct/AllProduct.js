import { useEffect, useState } from 'react';
import styles from './AllProduct.module.scss';
import classNames from 'classnames/bind';

import { AiFillAppstore, AiOutlineDoubleLeft, AiOutlineDoubleRight, AiOutlineEllipsis } from "react-icons/ai";

import imgProduct from '~/assets/imgs/giay.png';
import InfoProduct from '~/components/InfoProduct';

const cx = classNames.bind(styles);

function AllProduct({title, onClick}) {

    const apiListProducts = {
        quantityProduct: 15,
        data: [
            {
                id: 1,
                img: imgProduct,
                name: 'giày đá bóng zocker space - neon/green',
                isNew: true,
                price: 569000,
                discount: 10,
            },
            {
                id: 2,
                img: imgProduct,
                name: 'giày đá bóng zocker space - neon/green',
                isNew: false,
                price: 569000,
                discount: 30,
            },
            {
                id: 3,
                img: imgProduct,
                name: 'giày đá bóng zocker space - neon/green',
                isNew: false,
                price: 569000,
                discount: 10,
            },
            {
                id: 4,
                img: imgProduct,
                name: 'giày đá bóng zocker space - neon/green',
                isNew: true,
                price: 569000,
                discount: 10,
            },
            {
                id: 5,
                img: imgProduct,
                name: 'giày đá bóng zocker space - neon/green',
                isNew: true,
                price: 569000,
                discount: 10,
            },
            {
                id: 6,
                img: imgProduct,
                name: 'giày đá bóng zocker space - neon/green',
                isNew: false,
                price: 569000,
                discount: 10,
            },
            {
                id: 7,
                img: imgProduct,
                name: 'giày đá bóng zocker space - neon/green',
                isNew: false,
                price: 569000,
                discount: 10,
            },
            {
                id: 8,
                img: imgProduct,
                name: 'giày đá bóng zocker space - neon/green',
                isNew: true,
                price: 569000,
                discount: 10,
            },
            {
                id: 9,
                img: imgProduct,
                name: 'giày đá bóng zocker space - neon/green',
                isNew: true,
                price: 569000,
                discount: 10,
            },
            {
                id: 10,
                img: imgProduct,
                name: 'giày đá bóng zocker space - neon/green',
                isNew: false,
                price: 569000,
                discount: 10,
            },
            {
                id: 11,
                img: imgProduct,
                name: 'giày đá bóng zocker space - neon/green',
                isNew: true,
                price: 569000,
                discount: 10,
            },
            {
                id: 12,
                img: imgProduct,
                name: 'giày đá bóng zocker space - neon/green',
                isNew: true,
                price: 569000,
                discount: 10,
            },
            {
                id: 13,
                img: imgProduct,
                name: 'giày đá bóng zocker space - neon/green',
                isNew: false,
                price: 569000,
                discount: 10,
            },
            {
                id: 14,
                img: imgProduct,
                name: 'giày đá bóng zocker space - neon/green',
                isNew: false,
                price: 569000,
                discount: 10,
            },
            {
                id: 15,
                img: imgProduct,
                name: 'giày đá bóng zocker space - neon/green',
                isNew: false,
                price: 569000,
                discount: 10,
            },
        ],
    };

    const [productList, setProductList] = useState([]);
    const [pageCurrent, setPageCurrent] = useState(0);
    const [itemProductInPage, setItemProductInPage] = useState(10);
    const [totalProduct, setTotalProduct] = useState(0);

    const [isPrev, setIsPrev] = useState(true);
    const [isNext, setIsNext] = useState(false);

    const getProductList = async () => {
        setProductList(apiListProducts.data);
        setTotalProduct(apiListProducts.quantityProduct);
    }

    useEffect(() => {
        getProductList();
    }, [])

    const handlePrev = (e) => {
        const page = pageCurrent === 0 ? 0 : pageCurrent - 1;
        getProductList();
        setPageCurrent(page);
        if(page === 0){
            setIsPrev(true);
        } else {
            setIsPrev(false);
        }
        if(page === Math.floor(totalProduct / itemProductInPage)){
            setIsNext(true);
        } else {
            setIsNext(false);
        }
    }

    const handleNext = (e) => {
        const page = pageCurrent === Math.floor(totalProduct / itemProductInPage) ? Math.floor(totalProduct / itemProductInPage) : pageCurrent + 1;
        getProductList();
        setPageCurrent(page);
        if(page === 0){
            setIsPrev(true);
        } else {
            setIsPrev(false);
        }
        if(page === Math.floor(totalProduct / itemProductInPage)){
            setIsNext(true);
        } else {
            setIsNext(false);
        }
    }

    const handleNum = (page) => {
        if(pageCurrent !== page){
            getProductList();
            setPageCurrent(page);
        }
        if(page === 0){
            setIsPrev(true);
        } else {
            setIsPrev(false);
        }
        if(page === Math.floor(totalProduct / itemProductInPage)){
            setIsNext(true);
        } else {
            setIsNext(false);
        }
    }

    


    const handleArrange = (e) => {
        onClick('sap xep', e.target.value * 1);
    }


    return <div className={cx('wrapper')}>
        <div className={cx('title')}>{title}</div>
        <div className={cx('wrapper-arrange')}>
            <div className={cx('warpper-icon')}><AiFillAppstore /></div>
            <div className={cx('wrapper-text')}>
                <div className={cx('text')}>Sắp xếp theo:</div>
                <select onChange={handleArrange} className={cx('select-arrange')} name='arrange' id='arrange'>
                    <option value='0'>Mới nhất</option>
                    <option value='1'>Giá (rẻ)</option>
                    <option value='2'>Giá (mắc)</option>
                </select>
            </div>
        </div>
        <div className={cx('grid')}>
            <div className={cx('row')}>
                {
                    productList.map((apiProduct, index) => 
                        <div key={index} className={cx('col', 'l-3')}>
                            <InfoProduct apiProduct={apiProduct} />
                        </div>
                    )
                }
            </div>

            <div className={cx('wrapper-paging')}>
                <div className={cx('paging')}>
                    <div onClick={handlePrev} className={cx('page', 'prev', {enable: isPrev})}><AiOutlineDoubleLeft /></div>
                    {
                        [0, 1, 2, 3, 4].map((element, index) => {
                            if(Math.floor(totalProduct / itemProductInPage) + 1 <= 5) {
                                if(index + 1 <= Math.floor(totalProduct / itemProductInPage) + 1){
                                    return (
                                        <div onClick={() => handleNum(element)} key={index} className={cx('page', 'number', {active: index === pageCurrent})}>{element + 1}</div>
                                    )
                                }
                            } else {
                                if((index === 3 && pageCurrent + 1 < Math.floor(totalProduct / itemProductInPage) + 1 - 2) || (index === 1 && pageCurrent + 1 >= Math.floor(totalProduct / itemProductInPage) + 1 - 2)){
                                    return <div className={cx('page', 'dot')}><AiOutlineEllipsis /></div>
                                } else if((index === 4 && pageCurrent + 1 < Math.floor(totalProduct / itemProductInPage) + 1 - 2) || (index === 0 && pageCurrent + 1 >= Math.floor(totalProduct / itemProductInPage) + 1 - 2)){
                                    if(index === 0){
                                        return <div onClick={() => handleNum(0)} value={1} className={cx('page', 'number')}>1</div>
                                    } else {
                                        return <div onClick={() => handleNum(Math.floor(totalProduct / itemProductInPage))} className={cx('page', 'number')}>{Math.floor(totalProduct / itemProductInPage) + 1}</div>
                                    }
                                } else {
                                    if(pageCurrent + 1 === 1){
                                        return <div onClick={() => handleNum(pageCurrent + element)} className={cx('page', 'number', {active: pageCurrent + 1 + element === pageCurrent + 1})}>{pageCurrent + 1 + element}</div>
                                    } else if(pageCurrent + 1 >= Math.floor(totalProduct / itemProductInPage) + 1 - 2){
                                        return <div onClick={() => handleNum(Math.floor(totalProduct / itemProductInPage) + element - 4)} className={cx('page', 'number', {active: Math.floor(totalProduct / itemProductInPage) + 1 + element - 4 === pageCurrent + 1})}>{Math.floor(totalProduct / itemProductInPage) + 1 + element - 4}</div>
                                    } else {
                                        return <div onClick={() => handleNum(pageCurrent + element - 1)} className={cx('page', 'number', {active: pageCurrent + 1 + element - 1 === pageCurrent + 1})}>{pageCurrent + 1 + element - 1}</div>
                                    }
                                }
                            }
                        })
                    }
                    <div onClick={handleNext} className={cx('page', 'next', {enable: isNext})}><AiOutlineDoubleRight /></div>
                </div>
            </div>
        </div>
    </div>;
}

export default AllProduct;