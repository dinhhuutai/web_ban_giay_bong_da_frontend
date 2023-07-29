import { useEffect, useState, useContext } from 'react';
import styles from './AllProduct.module.scss';
import classNames from 'classnames/bind';

import { AiFillAppstore, AiOutlineDoubleLeft, AiOutlineDoubleRight, AiOutlineEllipsis } from "react-icons/ai";

import imgProduct from '~/assets/imgs/giay.png';
import InfoProduct from '~/components/InfoProduct';

import { ProductContext } from '~/contexts/ProductContext';


const cx = classNames.bind(styles);

function AllProduct({title, onClick, search, setSideBar, sideBar}) {
    
    const {
        productState: { quantityProduct, products },
        getProduct,
        modelUpdate: { status, product },
        setModelUpdate,
        getProductBy,
    } = useContext(ProductContext);

    

    

    const [pageCurrent, setPageCurrent] = useState(0);
    const [itemProductInPage, setItemProductInPage] = useState(10);

    const [isPrev, setIsPrev] = useState(true);
    const [isNext, setIsNext] = useState(false);

    
    useEffect(() => {
        getProductBy(itemProductInPage, pageCurrent, search);

    }, [pageCurrent]);


    const handlePrev = (e) => {
        const page = pageCurrent === 0 ? 0 : pageCurrent - 1;
        setPageCurrent(page);
        if(page === 0){
            setIsPrev(true);
        } else {
            setIsPrev(false);
        }
        if(page === Math.floor(quantityProduct / itemProductInPage)){
            setIsNext(true);
        } else {
            setIsNext(false);
        }
    }

    const handleNext = (e) => {
        const page = pageCurrent === Math.floor(quantityProduct / itemProductInPage) ? Math.floor(quantityProduct / itemProductInPage) : pageCurrent + 1;
        
        setPageCurrent(page);
        if(page === 0){
            setIsPrev(true);
        } else {
            setIsPrev(false);
        }
        if(page === Math.floor(quantityProduct / itemProductInPage)){
            setIsNext(true);
        } else {
            setIsNext(false);
        }
    }

    const handleNum = (page) => {
        if(pageCurrent !== page){
            
            setPageCurrent(page);
        }
        if(page === 0){
            setIsPrev(true);
        } else {
            setIsPrev(false);
        }
        if(page === Math.floor(quantityProduct / itemProductInPage)){
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
            <div onClick={() => setSideBar(!sideBar)} className={cx('warpper-icon')}><AiFillAppstore /></div>
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
                    products.map((apiProduct, index) => 
                        <div key={index} className={cx('col', 'l-3', 'm-6')}>
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
                            if(Math.floor(quantityProduct / itemProductInPage) + 1 <= 5) {
                                if(index + 1 <= Math.floor(quantityProduct / itemProductInPage) + 1){
                                    return (
                                        <div onClick={() => handleNum(element)} key={index} className={cx('page', 'number', {active: index === pageCurrent})}>{element + 1}</div>
                                    )
                                }
                            } else {
                                if((index === 3 && pageCurrent + 1 < Math.floor(quantityProduct / itemProductInPage) + 1 - 2) || (index === 1 && pageCurrent + 1 >= Math.floor(quantityProduct / itemProductInPage) + 1 - 2)){
                                    return <div className={cx('page', 'dot')}><AiOutlineEllipsis /></div>
                                } else if((index === 4 && pageCurrent + 1 < Math.floor(quantityProduct / itemProductInPage) + 1 - 2) || (index === 0 && pageCurrent + 1 >= Math.floor(quantityProduct / itemProductInPage) + 1 - 2)){
                                    if(index === 0){
                                        return <div onClick={() => handleNum(0)} value={1} className={cx('page', 'number')}>1</div>
                                    } else {
                                        return <div onClick={() => handleNum(Math.floor(quantityProduct / itemProductInPage))} className={cx('page', 'number')}>{Math.floor(quantityProduct / itemProductInPage) + 1}</div>
                                    }
                                } else {
                                    if(pageCurrent + 1 === 1){
                                        return <div onClick={() => handleNum(pageCurrent + element)} className={cx('page', 'number', {active: pageCurrent + 1 + element === pageCurrent + 1})}>{pageCurrent + 1 + element}</div>
                                    } else if(pageCurrent + 1 >= Math.floor(quantityProduct / itemProductInPage) + 1 - 2){
                                        return <div onClick={() => handleNum(Math.floor(quantityProduct / itemProductInPage) + element - 4)} className={cx('page', 'number', {active: Math.floor(quantityProduct / itemProductInPage) + 1 + element - 4 === pageCurrent + 1})}>{Math.floor(quantityProduct / itemProductInPage) + 1 + element - 4}</div>
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