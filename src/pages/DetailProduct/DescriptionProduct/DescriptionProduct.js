import classNames from 'classnames/bind';
import styles from './DescriptionProduct.module.scss';
import { useRef, useState } from 'react';


const cx = classNames.bind(styles);

function DescriptionProduct({product}) {

    const [seeMore, setSeeMore] = useState(false);

    const descriptionRef = useRef();

    const handleSeeMore = () => {
        setSeeMore(!seeMore);

        if(seeMore) {
            descriptionRef.current.style.height = '150px';
        } else {
            descriptionRef.current.style.height = 'auto';
            
            if(descriptionRef.current.offsetHeight < 150){
                descriptionRef.current.style.height = '150px';
            }
        }
    }


    return <div className={cx('wrapper')}>
        <h4 className={cx('title')}>mô tả sản phẩm</h4>
        <p ref={descriptionRef} className={cx('description', seeMore || 'see')}>{product.description}</p>
        <div className={cx('btn')}>
            <button onClick={handleSeeMore} className={cx('see-more')}>
                {
                    seeMore ? 'Rút gọn' : 'Xem thêm'
                }
            </button>
        </div>
    </div>;
}

export default DescriptionProduct;