import styles from './ProductCreate.module.scss';
import classNames from 'classnames/bind';

import { AiOutlineFileAdd, AiOutlineSave, AiOutlineFileImage } from 'react-icons/ai';
import { useRef, useEffect, useState } from 'react';
import { apiUrl } from '~/contexts/constants';
import axios from 'axios';

import uploadImage from '~/utils/uploadImage';

import Noti from '~/components/Noti';


const cx = classNames.bind(styles);

function ProductCreate() {

    const [formData, setFormData] = useState({
        name: '',
        price: '',
        size: '38',
        idCategory: '',
        idTrademark: '',
        idColor: '',
        isNew: true,
        discount: '',
        description: '',
        quantity: '',
    });

    const { name, price, size, idCategory, idTrademark, idColor, isNew, discount, description, quantity } = formData;

    const [noti, setNoti] = useState({
        status: false,
        text: "",
        type: false,
    });

    const [disabled, setDisabled] = useState(false);


    const handleFormData = (e) => {
        setNoti({
            status: false,
            text: "",
            type: false,
        })
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleFormRadioTrue = (e) => {
        setNoti({
            status: false,
            text: "",
            type: false,
        })
        if (e.target.checked) {
            setFormData({
                ...formData,
                isNew: true,
            });
        }
    };

    const handleFormRadioFalse = (e) => {
        setNoti({
            status: false,
            text: "",
            type: false,
        })
        if (e.target.checked) {
            setFormData({
                ...formData,
                isNew: false,
            });
        }
    };

    const [select, setSelect] = useState({
        categorys: [],
        trademarks: [],
        colors: [],
    });

    const { categorys, trademarks, colors } = select;

    const [imgMain, setImgMain] = useState();
    const [thumbnailOne, setThumbnailOne] = useState();
    const [thumbnailTwo, setThumbnailTwo] = useState();
    const [thumbnailThree, setThumbnailThree] = useState();

    var imageMain = useRef();
    var thumbnail1 = useRef();
    var thumbnail2 = useRef();
    var thumbnail3 = useRef();

    function handleImage(e) {
        const check = e.target.files[0];
        const urlImg = URL.createObjectURL(check);
        setImgMain(e);

        imageMain.current.src = urlImg;
        imageMain.current.style.zIndex = '10';
    }

    function handleThumbnail1(e) {
        const check = e.target.files[0];
        const urlImg = URL.createObjectURL(check);
        setThumbnailOne(e);

        thumbnail1.current.src = urlImg;
        thumbnail1.current.style.zIndex = '10';
    }

    function handleThumbnail2(e) {
        const check = e.target.files[0];
        const urlImg = URL.createObjectURL(check);
        setThumbnailTwo(e);

        thumbnail2.current.src = urlImg;
        thumbnail2.current.style.zIndex = '10';
    }

    function handleThumbnail3(e) {
        const check = e.target.files[0];
        const urlImg = URL.createObjectURL(check);
        setThumbnailThree(e);

        thumbnail3.current.src = urlImg;
        thumbnail3.current.style.zIndex = '10';
    }

    const getData = async () => {
        const listCategory = await axios.get(`${apiUrl}/admin/category`);
        const listTrademark = await axios.get(`${apiUrl}/admin/trademark`);
        const listColor = await axios.get(`${apiUrl}/admin/color`);

        if (listCategory.data.success && listTrademark.data.success && listColor.data.success) {
            setSelect({
                categorys: listCategory.data.category,
                trademarks: listTrademark.data.trademark,
                colors: listColor.data.color,
            });

            setFormData({
                ...formData,
                idCategory: listCategory.data.category[0]._id,
                idTrademark: listTrademark.data.trademark[0]._id,
                idColor: listColor.data.color[0]._id,
            })
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const handleUploadImg = async () => {

        const uploadData = uploadImage(imgMain, thumbnailOne, thumbnailTwo, thumbnailThree);

        return await axios.post(`${apiUrl}/admin/user/uploadimg`, uploadData);
    };

    const handleSave = async (e) => {

        setDisabled(true);


        if(name.trim() === ""){
            setNoti({
                status: true,
                text: "Chưa nhập tên sản phẩm",
                type: false,
            })
            
            setTimeout(() => {
                setNoti({
                    status: false,
                    text: "Chưa nhập giá sản phẩm",
                    type: false,
                })
            }, 5000)
        } else if(price.trim() === ""){
            setNoti({
                status: true,
                text: "Chưa nhập giá sản phẩm",
                type: false,
            })
            
            setTimeout(() => {
                setNoti({
                    status: false,
                    text: "Chưa nhập giá sản phẩm",
                    type: false,
                })
            }, 5000)
            
        } else if(!parseInt(price)) {
            setNoti({
                status: true,
                text: "Giá sản phẩm không hợp lệ",
                type: false,
            })
            
            setTimeout(() => {
                setNoti({
                    status: false,
                    text: "Chưa nhập giá sản phẩm",
                    type: false,
                })
            }, 5000)
        } else if(price * 1 <= 0){
            setNoti({
                status: true,
                text: "Giá sản phẩm không hợp lệ",
                type: false,
            })
            
            setTimeout(() => {
                setNoti({
                    status: false,
                    text: "Chưa nhập giá sản phẩm",
                    type: false,
                })
            }, 5000)
        } else if(discount.trim() !== "" && !parseInt(discount)){
            setNoti({
                status: true,
                text: "Giảm giá sản phẩm không hợp lệ",
                type: false,
            })
            
            setTimeout(() => {
                setNoti({
                    status: false,
                    text: "Chưa nhập giá sản phẩm",
                    type: false,
                })
            }, 5000)
        } else if(discount.trim() !== "" && discount * 1 <= 0){
            setNoti({
                status: true,
                text: "Giảm giá sản phẩm không hợp lệ",
                type: false,
            })
            
            setTimeout(() => {
                setNoti({
                    status: false,
                    text: "Chưa nhập giá sản phẩm",
                    type: false,
                })
            }, 5000)
        } else if(quantity === ""){
            setNoti({
                status: true,
                text: "Chưa nhập số lượng sản phẩm",
                type: false,
            })
            
            setTimeout(() => {
                setNoti({
                    status: false,
                    text: "Chưa nhập giá sản phẩm",
                    type: false,
                })
            }, 5000)
        } else if(!parseInt(quantity)) {
            setNoti({
                status: true,
                text: "Giá sản phẩm không hợp lệ",
                type: false,
            })
            
            setTimeout(() => {
                setNoti({
                    status: false,
                    text: "Chưa nhập giá sản phẩm",
                    type: false,
                })
            }, 5000)
        } else if(quantity * 1 <= 0){
            setNoti({
                status: true,
                text: "Số lượng sản phẩm không hợp lệ",
                type: false,
            })
            
            setTimeout(() => {
                setNoti({
                    status: false,
                    text: "Chưa nhập giá sản phẩm",
                    type: false,
                })
            }, 5000)
        } else if(description.trim() === ""){
            setNoti({
                status: true,
                text: "Chưa nhập mô tả sản phẩm",
                type: false,
            })
            
            setTimeout(() => {
                setNoti({
                    status: false,
                    text: "Chưa nhập giá sản phẩm",
                    type: false,
                })
            }, 5000)
        } else {
            setNoti({
                status: true,
                text: "Đang lưu sản phẩm",
                type: true,
            })

            
            const dataImg = await handleUploadImg();

            const productData = {
                ...formData,
                image: dataImg.data.link.image[0].path,
                thumbnail1: dataImg.data.link.thumbnail1[0].path,
                thumbnail2: dataImg.data.link.thumbnail2[0].path,
                thumbnail3: dataImg.data.link.thumbnail3[0].path,
            }

            const data = await axios.post(`${apiUrl}/admin/product/create`, productData);
            

            if(data.data.success){
                setNoti({
                    status: true,
                    text: "Thêm sản phẩm thành công",
                    type: true,
                })


                imageMain.current.src = "";
                imageMain.current.style.zIndex = '-1';
                thumbnail1.current.src = "";
                thumbnail1.current.style.zIndex = '-1';
                thumbnail2.current.src = "";
                thumbnail2.current.style.zIndex = '-1';
                thumbnail3.current.src = "";
                thumbnail3.current.style.zIndex = '-1';

                const listCategory = await axios.get(`${apiUrl}/admin/category`);
                const listTrademark = await axios.get(`${apiUrl}/admin/trademark`);
                const listColor = await axios.get(`${apiUrl}/admin/color`);

                if (listCategory.data.success && listTrademark.data.success && listColor.data.success) {
                    setSelect({
                        categorys: listCategory.data.category,
                        trademarks: listTrademark.data.trademark,
                        colors: listColor.data.color,
                    });

                    setFormData({
                        name: '',
                        price: '',
                        size: '38',
                        idCategory: listCategory.data.category[0]._id,
                        idTrademark: listTrademark.data.trademark[0]._id,
                        idColor: listColor.data.color[0]._id,
                        isNew: true,
                        discount: '',
                        description: '',
                        quantity: '',
                    })
                }
            
                setTimeout(() => {
                    setNoti({
                        status: false,
                        text: "Chưa nhập giá sản phẩm",
                        type: false,
                    })
                }, 5000)
            } else {
                setNoti({
                    status: true,
                    text: "Lỗi! Thêm không thành công",
                    type: false,
                })
                
                setFormData({
                    name: '',
                    price: '',
                    size: '38',
                    idCategory: '',
                    idTrademark: '',
                    idColor: '',
                    isNew: true,
                    discount: '',
                    description: '',
                    quantity: '',
                })

                imageMain.current.src = "";
                imageMain.current.style.zIndex = '-1';
                thumbnail1.current.src = "";
                thumbnail1.current.style.zIndex = '-1';
                thumbnail2.current.src = "";
                thumbnail2.current.style.zIndex = '-1';
                thumbnail3.current.src = "";
                thumbnail3.current.style.zIndex = '-1';

                setTimeout(() => {
                    setNoti({
                        status: false,
                        text: "Chưa nhập giá sản phẩm",
                        type: false,
                    })
                }, 5000)
            }
        }

        
        setDisabled(false);

    };

    return (
        <div className={cx('wrapper')}>
            {noti.status && <Noti text={noti.text} type={noti.type} />}
            <div className={cx('grid')}>
                <div className={cx('row')}>
                    <div className={cx('col', 'l-6')}>
                        <div className={cx('wrapper-main-img')}>
                            <div className={cx('main-img')}>
                                <input
                                    onChange={(e) => handleImage(e)}
                                    accept="image/png, image/jpeg"
                                    type="file"
                                    className={cx('input-img')}
                                />
                                <div className={cx('word')}>
                                    <AiOutlineFileAdd className={cx('icon-img')} />
                                    <p className={cx('content-message')}>Upload a product cover image</p>
                                </div>
                                <img ref={imageMain} src="" alt="" className={cx('image')} />
                            </div>

                            <div className={cx('wrapper-thumbnail')}>
                                <div className={cx('thumbnail')}>
                                    <input
                                        onChange={(e) => handleThumbnail1(e)}
                                        accept="image/png, image/jpeg"
                                        type="file"
                                    />
                                    <div className={cx('word-thumbnail')}>
                                        <AiOutlineFileImage className={cx('icon-img-thum')} />
                                    </div>
                                    <img ref={thumbnail1} src="" alt="" className={cx('iamge-thumbnail-1')} />
                                </div>

                                <div className={cx('thumbnail')}>
                                    <input
                                        onChange={(e) => handleThumbnail2(e)}
                                        accept="image/png, image/jpeg"
                                        type="file"
                                    />
                                    <div className={cx('word-thumbnail')}>
                                        <AiOutlineFileImage className={cx('icon-img-thum')} />
                                    </div>
                                    <img ref={thumbnail2} src="" alt="" className={cx('iamge-thumbnail-2')} />
                                </div>

                                <div className={cx('thumbnail')}>
                                    <input
                                        onChange={(e) => handleThumbnail3(e)}
                                        accept="image/png, image/jpeg"
                                        type="file"
                                    />
                                    <div className={cx('word-thumbnail')}>
                                        <AiOutlineFileImage className={cx('icon-img-thum')} />
                                    </div>
                                    <img ref={thumbnail3} src="" alt="" className={cx('iamge-thumbnail-3')} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('col', 'l-6')}>
                        <div className={cx('wrapper-input')}>
                            <label for="name" className={cx('label')}>
                                Tên sản phẩm
                            </label>
                            <input
                                value={name}
                                id="name"
                                type="text"
                                className={cx('input')}
                                name="name"
                                placeholder="Tên sản phẩm"
                                onChange={handleFormData}
                            />
                        </div>
                        <div className={cx('wrapper-input')}>
                            <label for="price" className={cx('label')}>
                                Giá sản phẩm (VNĐ)
                            </label>
                            <input
                                value={price}
                                id="price"
                                type="text"
                                className={cx('input')}
                                name="price"
                                placeholder="Giá sản phẩm"
                                onChange={handleFormData}
                            />
                        </div>
                        <div className={cx('wrapper-input')}>
                            <label className={cx('label')}>Là sản phẩm mới</label>
                            <div className={cx('wrapper-isNew')}>
                                <div className={cx('wrapper-radio')}>
                                    <input
                                        onChange={handleFormRadioTrue}
                                        checked={isNew}
                                        type="radio"
                                        className={cx('input-radio')}
                                        name="isNew"
                                    />
                                    <div className={cx('label-radio')}>Có</div>
                                </div>
                                <div className={cx('wrapper-radio')}>
                                    <input
                                        onChange={handleFormRadioFalse}
                                        checked={!isNew}
                                        type="radio"
                                        className={cx('input-radio')}
                                        name="isNew"
                                    />
                                    <div className={cx('label-radio')}>Không</div>
                                </div>
                            </div>
                        </div>
                        <div className={cx('wrapper-input')}>
                            <label for="discount" className={cx('label')}>
                                Giảm giá
                            </label>
                            <div className={cx('wrapper-discount')}>
                                <input
                                    value={discount}
                                    id="discount"
                                    type="text"
                                    className={cx('input')}
                                    name="discount"
                                    placeholder="Giảm giá"
                                    onChange={handleFormData}
                                />
                                %
                            </div>
                        </div>
                    </div>
                </div>

                <div className={cx('row', 'wrapper-select')}>
                    <div className={cx('wrapper-ids')}>
                        <div className={cx('label-ids')}>Thể loại</div>
                        <select name="idCategory" onChange={handleFormData} className={cx('select')}>
                            {categorys.map((category, index) => (
                                <option key={index} value={category._id} className={cx('option')}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className={cx('wrapper-ids')}>
                        <div className={cx('label-ids')}>Thương hiệu</div>
                        <select name="idTrademark" onChange={handleFormData} className={cx('select')}>
                            {trademarks.map((trademark, index) => (
                                <option key={index} value={trademark._id} className={cx('option')}>
                                    {trademark.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className={cx('wrapper-ids')}>
                        <div className={cx('label-ids')}>Màu sắc</div>
                        <select name="idColor" onChange={handleFormData} className={cx('select')}>
                            {colors.map((color, index) => (
                                <option key={index} value={color._id} className={cx('option')}>
                                    {color.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className={cx('wrapper-ids')}>
                        <div className={cx('label-ids')}>Kích thước</div>
                        <select name="size" onChange={handleFormData} className={cx('select')}>
                            <option value="38">38</option>
                            <option value="39">39</option>
                            <option value="40">40</option>
                            <option value="41">41</option>
                            <option value="42">42</option>
                            <option value="43">43</option>
                            <option value="44">44</option>
                            <option value="45">45</option>
                        </select>
                    </div>

                    <div className={cx('wrapper-ids')}>
                        <div className={cx('label-ids')}>Số lượng sản phẩm</div>
                        <input
                            value={quantity}
                            id="quantity"
                            type="number"
                            className={cx('input-quantity')}
                            name="quantity"
                            placeholder="Số lượng"
                            onChange={handleFormData}
                        />
                    </div>
                </div>

                <div className={cx('row')}>
                    <div className={cx('description')}>
                        <div className={cx('wrapper-des')}>
                            <div className={cx('label')}>Mô tả sản phẩm</div>
                            <textarea
                                value={description}
                                onChange={handleFormData}
                                name="description"
                                placeholder="Enter some short description about this product..."
                            ></textarea>
                        </div>
                    </div>
                </div>

                <div className={cx('row', 'wrapper-btn')}>
                    <button disabled={disabled} onClick={handleSave} className={cx('btn')}>
                        <AiOutlineSave />
                        Lưu
                    </button>
                </div>
            </div>

        </div>
    );
}

export default ProductCreate;
