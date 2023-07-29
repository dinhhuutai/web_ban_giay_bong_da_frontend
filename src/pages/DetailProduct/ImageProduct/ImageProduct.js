import classNames from 'classnames/bind';
import styles from './ImageProduct.module.scss';
import { useEffect, useRef, useState } from 'react';



const cx = classNames.bind(styles);

function ImageProduct({product}) {

    const [index, setIndex] = useState(0);


    const imgRef = useRef();
    const sliderRef = useRef();
    const lineRef = useRef();

    useEffect(() => {

        sliderRef.current.style = `transform: translateX(${(0 - imgRef.current.offsetWidth) * index}px)`;
        lineRef.current.style.left = `${index * (100/product.image.length)}%`;

    }, [index]);

    const onclickImg = (i) => {
        setIndex(i);
    }


    return <div className={cx('wrapper')}>
        <div className={cx('grid')}>
            <div className={cx('row', 'mobi-row')}>
                <div className={cx('col', 'l-2', 'mobi-img')}>
                    {
                        product === 0 || product.image.map((e, i) => <img onClick={() => onclickImg(i)} key={i} src={e} alt="imgProduct" className={cx('img-child', i === index ? 'activeImg' : '')} />)
                    }
                </div>
                
                <div className={cx('col', 'l-10', 'm-12')}>
                    <div className={cx('wrapper-slider')}>
                        <div className={cx('slider')}>
                            <div ref={sliderRef} className={cx('goTo-slider')}>
                                {
                                    product === 0 || product.image.map((e, i) => <img ref={imgRef} key={i} src={e} alt="imgProduct" className={cx('img-slider')} />)
                                }
                            </div>
                        </div>
                    </div>

                    <div className={cx('wapper-sroll')}>
                        <div ref={lineRef} className={cx('sroll')}></div>
                    </div>
                </div>
            </div>
        </div>
    </div>;
}

export default ImageProduct;
