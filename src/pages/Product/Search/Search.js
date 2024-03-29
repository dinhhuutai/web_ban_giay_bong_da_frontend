import { useEffect, useRef, useState } from 'react';
import styles from './Search.module.scss';
import classNames from 'classnames/bind';

import { apiUrl } from '~/contexts/constants';
import axios from 'axios';


const cx = classNames.bind(styles);

function Search({onClick}) {

    
    const [apiTrademarks, setApiTrademarks] = useState([]);
    const [apiColors, setApiColors] = useState([]);

    const getData = async () => {
        const listTrademark = await axios.get(`${apiUrl}/admin/trademark`);
        const listColor = await axios.get(`${apiUrl}/admin/color`);

        setApiTrademarks(listTrademark.data.trademark);
        setApiColors(listColor.data.color);
    };

    useEffect(() => {
        getData();
    }, []);
    

    const refAllPrices = useRef();
    const refAllTrademark = useRef();
    const refAllColor = useRef();
    useEffect(() => {

        refAllPrices.current.checked = true;
        refAllTrademark.current.checked = true;
        refAllColor.current.checked = true;

        handleTrademark({target: refAllTrademark.current}, 1);
        handleColor({target: refAllColor.current}, 1);
    }, [apiTrademarks]);

    const handleTrademark = (e, i) => {

        var checkTrademarks = document.querySelectorAll('input[name=trademark]:checked');
        

        if(i === 1 && e.target.checked){
            const checks = document.querySelectorAll('input[name=trademark]');
            checks.forEach(check => {
                check.checked = true;
            });
        } else if(i === 1 && e.target.checked === false){
            const checks = document.querySelectorAll('input[name=trademark]');
            checks.forEach(check => {
                check.checked = false;
            });
        } else if(checkTrademarks.length === apiTrademarks.length && refAllTrademark.current.checked === false){
            refAllTrademark.current.checked = true;
        } else if(checkTrademarks.length < apiTrademarks.length){
            refAllTrademark.current.checked = false;
        } else {
            refAllTrademark.current.checked = false;
        }
        
        
        checkTrademarks = document.querySelectorAll('input[name=trademark]:checked');

        var newTrademarks = [];
        checkTrademarks.forEach(checkTrademark => {
            newTrademarks.push(checkTrademark.getAttribute('data-trademark'));
        });

        var endTrademarks = newTrademarks.filter(item => item !== null);

        onClick('thuong hieu', endTrademarks);
    }

    const handlePrice = (e, i) => {
        const checkTrademarks = document.querySelector('input[name=price]:checked');

        var newTrademarks = [checkTrademarks.getAttribute('min') * 1, checkTrademarks.getAttribute('max') * 1];

        onClick('gia', newTrademarks);
    }

    const handleColor = (e, i) => {

        var checkColors = document.querySelectorAll('input[name=color]:checked');
        
        if(i === 1 && e.target.checked){
            const checks = document.querySelectorAll('input[name=color]');
            checks.forEach(check => {
                check.checked = true;
            });
        } else if(i === 1 && e.target.checked === false){
            const checks = document.querySelectorAll('input[name=color]');
            checks.forEach(check => {
                check.checked = false;
            });
        } else if(checkColors.length === apiColors.length && refAllColor.current.checked === false){
            refAllColor.current.checked = true;
        } else if(checkColors.length < apiColors.length){
            refAllColor.current.checked = false;
        } else {
            refAllColor.current.checked = false;
        }

        checkColors = document.querySelectorAll('input[name=color]:checked');

        var newColors = [];
        checkColors.forEach(checkColor => {
            newColors.push(checkColor.getAttribute('data-color'));
        });

        var endColors = newColors.filter(item => item !== null);

        onClick('mau', endColors);
    }



    return <div className={cx('wrapper')}>
        <div className={cx('search')}>
            <div className={cx('title')}>tìm theo</div>

            <div className={cx('trademark')}>
                <div className={cx('title-item')}>thương hiệu</div>
                <ul className={cx('list-trademark')}>
                    <li className={cx('item-trademark')}>
                        <input ref={refAllTrademark} onChange={(e) => handleTrademark(e, 1)} id='alltrademark' type='checkbox' className={cx('input-trademark')} data-trademark={-1} name='trademark' />
                        <label for="alltrademark" className={cx('text-trademark')}>tất cả</label>
                    </li>
                    {
                        apiTrademarks.map((apiTrademark, index) =>
                            <li key={index} className={cx('item-trademark')}>
                                <input onChange={handleTrademark} id={apiTrademark.code} type='checkbox' className={cx('input-trademark')} data-trademark={apiTrademark._id} name='trademark' />
                                <label for={apiTrademark.code} className={cx('text-trademark')}>{apiTrademark.name}</label>
                            </li>
                        )
                    }
                </ul>
            </div>

            <div className={cx('price')}>
                <div className={cx('title-item')}>giá</div>
                <ul className={cx('list-price')}>
                    <li className={cx('item-price')}>
                        <input ref={refAllPrices} onChange={handlePrice} id='allprice' type='radio' className={cx('input-price')} min={-1} max={-1} name='price' />
                        <label for="allprice" className={cx('text-price')}>Tất cả</label>
                    </li>
                    <li className={cx('item-price')}>
                        <input onChange={handlePrice} id='1' type='radio' className={cx('input-price')} min={0} max={1000000} name='price' />
                        <label for="1" className={cx('text-price')}>0 ~ 1.000.000 vnđ</label>
                    </li>
                    <li className={cx('item-price')}>
                        <input onChange={handlePrice} id='2' type='radio' className={cx('input-price')} min={1000000} max={2000000} name='price' />
                        <label for="2" className={cx('text-price')}>1.000.000 ~ 2.000.000 vnđ</label>
                    </li>
                    <li className={cx('item-price')}>
                        <input onChange={handlePrice} id='3' type='radio' className={cx('input-price')} min={2000000} max={3000000} name='price' />
                        <label for="3" className={cx('text-price')}>2.000.000 ~ 3.000.000 vnđ</label>
                    </li>
                    <li className={cx('item-price')}>
                        <input onChange={handlePrice} id='5' type='radio' className={cx('input-price')} min={3000000} max={5000000} name='price' />
                        <label for="5" className={cx('text-price')}>3.000.000 ~ 5.000.000 vnđ</label>
                    </li>
                    <li className={cx('item-price')}>
                        <input onChange={handlePrice} id='6' type='radio' className={cx('input-price')} min={5000000} max={1000000000} name='price' />
                        <label for="6" className={cx('text-price')}>Trên 5.000.000 vnđ</label>
                    </li>
                </ul>
            </div>


            <div className={cx('color')}>
                <div className={cx('title-item')}>màu sắc</div>
                <ul className={cx('list-color')}>
                    <li className={cx('item-color', 'l-12')}>
                        <input ref={refAllColor} onChange={(e) => handleColor(e, 1)} id='allcolor' type='checkbox' className={cx('input-color')} data-color={-1} name='color' />
                        <label for="allcolor" className={cx('text-color')}>
                            <div className={cx('board-color', 'board-all')}></div>
                            Tất cả
                        </label>
                    </li>
                    {
                        apiColors.map((apiColor, index) =>
                            <li key={index} className={cx('item-color', 'l-6')}>
                                <input onChange={handleColor} id={apiColor.code} type='checkbox' className={cx('input-color')} data-color={apiColor._id} name='color' />
                                <label for={apiColor.code} className={cx('text-color')}>
                                    <div style={{'background-color': apiColor.code}} className={cx('board-color')}></div>
                                    {apiColor.name}
                                </label>
                            </li>
                        )
                    }
                </ul>
            </div>

        </div>
    </div>;
}

export default Search;