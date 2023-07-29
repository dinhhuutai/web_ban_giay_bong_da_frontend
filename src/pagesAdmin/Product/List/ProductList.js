import styles from './ProductList.module.scss';
import classNames from 'classnames/bind';
import axios from 'axios';
import { useEffect, useState, useContext, useRef } from 'react';
import {
    AiOutlineDoubleLeft,
    AiOutlineDoubleRight,
    AiOutlineEllipsis,
    AiOutlinePlus,
    AiOutlineDelete,
} from 'react-icons/ai';

import { AiOutlineClose } from 'react-icons/ai';

import config from '~/config';
import UpdateProduct from '~/components/UpdateProduct';
import ModelDelete from '~/components/ModelDelete';
import FixQuantityProductBySize from '~/components/FixQuantityProductBySize';

import { apiUrl } from '~/contexts/constants';
import { ProductContext } from '~/contexts/ProductContext';
import { Link } from 'react-router-dom';
import Noti from '~/components/Noti';

const cx = classNames.bind(styles);

function ProductList() {
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

    const [noti, setNoti] = useState({
        status: false,
        text: '',
        type: false,
    });

    const [pageCurrent, setPageCurrent] = useState(0);
    const [itemProductInPage, setItemProductInPage] = useState(2);

    const [isPrev, setIsPrev] = useState(true);
    const [isNext, setIsNext] = useState(false);

    const handlePrev = (e) => {
        const page = pageCurrent === 0 ? 0 : pageCurrent - 1;
        setPageCurrent(page);
        if (page === 0) {
            setIsPrev(true);
        } else {
            setIsPrev(false);
        }
        if (page === Math.floor(quantityProduct / itemProductInPage)) {
            setIsNext(true);
        } else {
            setIsNext(false);
        }
    };

    const handleNext = (e) => {
        const page =
            pageCurrent === Math.floor(quantityProduct / itemProductInPage)
                ? Math.floor(quantityProduct / itemProductInPage)
                : pageCurrent + 1;

        setPageCurrent(page);
        if (page === 0) {
            setIsPrev(true);
        } else {
            setIsPrev(false);
        }
        if (page === Math.floor(quantityProduct / itemProductInPage)) {
            setIsNext(true);
        } else {
            setIsNext(false);
        }
    };

    const handleNum = (page) => {
        if (pageCurrent !== page) {
            setPageCurrent(page);
        }
        if (page === 0) {
            setIsPrev(true);
        } else {
            setIsPrev(false);
        }
        if (page === Math.floor(quantityProduct / itemProductInPage)) {
            setIsNext(true);
        } else {
            setIsNext(false);
        }
    };

    useEffect(() => {
        getProduct(itemProductInPage, pageCurrent);
    }, [pageCurrent]);

    const onclick = (e, product) => {
        setModelUpdate({
            status: true,
            product,
        });
    };

    const handleQuantity = (product) => {
        setModelFixQuantityProductBySize({
            status: true,
            product,
        })
    }

    const [arrayIdDelete, setArrayIdDelete] = useState([]);
    const refAllProduct = useRef();
    const refInput = useRef();

    const handleProduct = (e, i) => {
        var checkProducts = document.querySelectorAll('input[name=product]:checked');

        if (i === 1 && e.target.checked) {
            const checks = document.querySelectorAll('input[name=product]');
            checks.forEach((check) => {
                check.checked = true;
            });
        } else if (i === 1 && e.target.checked === false) {
            const checks = document.querySelectorAll('input[name=product]');
            checks.forEach((check) => {
                check.checked = false;
            });
        } else if (checkProducts.length === itemProductInPage && refAllProduct.current.checked === false) {
            refAllProduct.current.checked = true;
        } else if (checkProducts.length < itemProductInPage) {
            refAllProduct.current.checked = false;
        } else {
            refAllProduct.current.checked = false;
        }

        checkProducts = document.querySelectorAll('input[name=product]:checked');

        var newProducts = [];
        checkProducts.forEach((checkTrademark) => {
            newProducts.push(checkTrademark.getAttribute('data-product'));
        });

        var endProducts = newProducts.filter((item) => item !== null);

        setArrayIdDelete(endProducts);
    };

    const handleDelete = async (e) => {
        if(arrayIdDelete.length > 0){
            setModelDelete(true);
        }
    };

    const handleCloseDelete = () => {
        setModelDelete(false);
    };

    const handleCloseDeleteNo = () => {
        setModelDelete(false);
    };

    const handleCloseDeleteYes = async () => {
        setModelDelete(false);

        const req = {
            listId: arrayIdDelete,
        };

        const result = await axios.post(`${apiUrl}/admin/product/delete`, req);

        if (result.data.success) {
            setNoti({
                status: true,
                text: 'Xóa sản phẩm thành công',
                type: true,
            });

            getProduct(itemProductInPage, pageCurrent);

            const checks = document.querySelectorAll('input[name=product]');
            checks.forEach((check) => {
                check.checked = false;
            });
            setArrayIdDelete([]);

            setTimeout(() => {
                setNoti({
                    status: false,
                    text: 'Chưa nhập giá sản phẩm',
                    type: false,
                });
            }, 5000);
        } else {
            setNoti({
                status: true,
                text: 'Xóa sản phẩm không thành công',
                type: false,
            });

            setTimeout(() => {
                setNoti({
                    status: false,
                    text: 'Chưa nhập giá sản phẩm',
                    type: false,
                });
            }, 5000);
        }
    };

    return (
        <div className={cx('wrapper')}>
            {noti.status && <Noti text={noti.text} type={noti.type} />}
            <div className={cx('wrapper-header')}>
                <div className={cx('wrapper-icon')}>
                    <Link to={config.routes.adminProductAdd} className={cx('wrapper-create', 'icon-header')}>
                        <AiOutlinePlus />
                    </Link>
                    <div onClick={handleDelete} className={cx('wrapper-delete', 'icon-header')}>
                        <AiOutlineDelete />
                    </div>
                </div>
                <div className={cx('wrapper-text')}>Tổng sản phẩm: {quantityProduct}</div>
            </div>

            <div className={cx('wrapper-table')}>
                <div className={cx('table', 'table-1')}>
                    <div className={cx('row', 'header', 'blue')}>
                        <div className={cx('cell', 'cell-input')}>
                            <input
                                ref={refAllProduct}
                                onChange={(e) => handleProduct(e, 1)}
                                type="checkbox"
                                name="product"
                            />
                        </div>
                        <div className={cx('cell', 'cell-stt')}>STT</div>
                        <div className={cx('cell', 'cell-name')}>Tên sản phẩm</div>
                        <div className={cx('cell', 'cell-image')}>Hình ảnh</div>
                    </div>

                    {products.map((product, index) => (
                        <div
                            onClick={(e) => onclick(e, product)}
                            data-id={product._id}
                            key={index}
                            className={cx('row')}
                        >
                            <div className={cx('cell', 'cell-input')}>
                                <input
                                    ref={refInput}
                                    onChange={handleProduct}
                                    data-product={product._id}
                                    onClick={(e) => e.stopPropagation()}
                                    type="checkbox"
                                    name="product"
                                />
                            </div>
                            <div className={cx('cell', 'cell-stt')}>{index + 1 + pageCurrent * itemProductInPage}</div>
                            <div className={cx('cell', 'cell-name')} data-title={product.name}>
                                {product.name}
                            </div>
                            <div className={cx('cell', 'cell-image')} data-title={product.image[0]}>
                                <img className={cx('cell-img')} src={product.image[0]} alt={product.name} />

                                <div className={cx('wrapper-image-support')}>
                                    <img className={cx('image-support')} src={product.image[0]} alt={product.name} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className={cx('wrapper-table-2')}>
                    <div className={cx('table', 'table-2')}>
                        <div className={cx('row', 'header', 'blue')}>
                            <div className={cx('cell', 'cell-category')}>Danh mục</div>
                            <div className={cx('cell', 'cell-trademark')}>Thương Hiệu</div>
                            <div className={cx('cell', 'cell-color')}>Màu</div>
                            <div className={cx('cell', 'cell-quantity')}>Tổng Số lượng</div>
                            <div className={cx('cell', 'cell-new')}>Mới ra mắt</div>
                            <div className={cx('cell', 'cell-price')}>Giá</div>
                            <div className={cx('cell', 'cell-discount')}>Giảm giá</div>
                        </div>

                        {products.map((product, index) => (
                            <div
                                onClick={(e) => onclick(e, product)}
                                data-id={product._id}
                                key={index}
                                className={cx('row')}
                            >
                                <div className={cx('cell', 'cell-category')} data-title={product.idCategory.name}>
                                    {product.idCategory.name}
                                </div>
                                <div
                                    style={{ 'text-transform': 'uppercase' }}
                                    className={cx('cell', 'cell-trademark')}
                                    data-title={product.idTrademark.name}
                                >
                                    {product.idTrademark.name}
                                </div>
                                <div className={cx('cell', 'cell-color')} data-title={product.idColor.name}>
                                    <div
                                        className={cx('color')}
                                        style={{ 'background-color': product.idColor.code }}
                                    ></div>
                                    {product.idColor.name}
                                </div>
                                <div className={cx('cell', 'cell-quantity')} data-title={product.quantity}>
                                    {product.totalQuantity}
                                    <button onClick={(e) => {handleQuantity(product); e.stopPropagation()}} className={cx('fix-quantity')}>Chỉnh sửa số lượng</button>
                                </div>
                                <div className={cx('cell', 'cell-new')} data-title={product.isNew}>
                                    {product.isNew ? 'Có' : 'Không'}
                                </div>
                                <div className={cx('cell', 'cell-price')} data-title={product.price}>
                                    {product.price}
                                </div>
                                <div className={cx('cell', 'cell-discount')} data-title={product.discount}>
                                    {product.discount === '' ? '0' : product.discount} %
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className={cx('wrapper-paging')}>
                <div className={cx('paging')}>
                    <div onClick={handlePrev} className={cx('page', 'prev', { enable: isPrev })}>
                        <AiOutlineDoubleLeft />
                    </div>
                    {[0, 1, 2, 3, 4].map((element, index) => {
                        if (Math.floor(quantityProduct / itemProductInPage) + 1 <= 5) {
                            if (index + 1 <= Math.floor(quantityProduct / itemProductInPage) + 1) {
                                return (
                                    <div
                                        onClick={() => handleNum(element)}
                                        key={index}
                                        className={cx('page', 'number', { active: index === pageCurrent })}
                                    >
                                        {element + 1}
                                    </div>
                                );
                            }
                        } else {
                            if (
                                (index === 3 &&
                                    pageCurrent + 1 < Math.floor(quantityProduct / itemProductInPage) + 1 - 2) ||
                                (index === 1 &&
                                    pageCurrent + 1 >= Math.floor(quantityProduct / itemProductInPage) + 1 - 2)
                            ) {
                                return (
                                    <div className={cx('page', 'dot')}>
                                        <AiOutlineEllipsis />
                                    </div>
                                );
                            } else if (
                                (index === 4 &&
                                    pageCurrent + 1 < Math.floor(quantityProduct / itemProductInPage) + 1 - 2) ||
                                (index === 0 &&
                                    pageCurrent + 1 >= Math.floor(quantityProduct / itemProductInPage) + 1 - 2)
                            ) {
                                if (index === 0) {
                                    return (
                                        <div onClick={() => handleNum(0)} value={1} className={cx('page', 'number')}>
                                            1
                                        </div>
                                    );
                                } else {
                                    return (
                                        <div
                                            onClick={() => handleNum(Math.floor(quantityProduct / itemProductInPage))}
                                            className={cx('page', 'number')}
                                        >
                                            {Math.floor(quantityProduct / itemProductInPage) + 1}
                                        </div>
                                    );
                                }
                            } else {
                                if (pageCurrent + 1 === 1) {
                                    return (
                                        <div
                                            onClick={() => handleNum(pageCurrent + element)}
                                            className={cx('page', 'number', {
                                                active: pageCurrent + 1 + element === pageCurrent + 1,
                                            })}
                                        >
                                            {pageCurrent + 1 + element}
                                        </div>
                                    );
                                } else if (pageCurrent + 1 >= Math.floor(quantityProduct / itemProductInPage) + 1 - 2) {
                                    return (
                                        <div
                                            onClick={() =>
                                                handleNum(Math.floor(quantityProduct / itemProductInPage) + element - 4)
                                            }
                                            className={cx('page', 'number', {
                                                active:
                                                    Math.floor(quantityProduct / itemProductInPage) +
                                                        1 +
                                                        element -
                                                        4 ===
                                                    pageCurrent + 1,
                                            })}
                                        >
                                            {Math.floor(quantityProduct / itemProductInPage) + 1 + element - 4}
                                        </div>
                                    );
                                } else {
                                    return (
                                        <div
                                            onClick={() => handleNum(pageCurrent + element - 1)}
                                            className={cx('page', 'number', {
                                                active: pageCurrent + 1 + element - 1 === pageCurrent + 1,
                                            })}
                                        >
                                            {pageCurrent + 1 + element - 1}
                                        </div>
                                    );
                                }
                            }
                        }
                    })}
                    <div onClick={handleNext} className={cx('page', 'next', { enable: isNext })}>
                        <AiOutlineDoubleRight />
                    </div>
                </div>
            </div>

            {status ? <UpdateProduct itemProductInPage={itemProductInPage} pageCurrent={pageCurrent} /> : ''}

            {modelFixQuantityProductBySize.status ? <FixQuantityProductBySize itemProductInPage={itemProductInPage} pageCurrent={pageCurrent} /> : ''}


            {modelDelete ? (
                <div className={cx('wrapper-model-delete')}>
                    <div className={cx('container-delete')}>
                        <div className={cx('header-delete')}>
                            <div onClick={handleCloseDelete} className={cx('icon-close-delete')}>
                                <AiOutlineClose />
                            </div>
                        </div>
                        <span className={cx('title-delete')}>Bạn có chắc chắn muốn xóa những sản phẩm này?</span>
                        <div className={cx('wrapper-answer-delete')}>
                            <button onClick={handleCloseDeleteNo} className={cx('answer-delete', 'no-delete')}>
                                Không
                            </button>
                            <button onClick={handleCloseDeleteYes} className={cx('answer-delete', 'yes-delete')}>
                                Có
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                ''
            )}
        </div>
    );
}

export default ProductList;
