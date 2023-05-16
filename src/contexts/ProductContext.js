import { createContext, useReducer, useState } from "react";
import {productReducer} from '~/reducers/productReducer';
import { apiUrl, GET_PRODUCT } from "./constants";
import axios from 'axios';

export const ProductContext = createContext();

const ProductContextProvider = ({children}) => {
    // State
    const [productState, dispatch] = useReducer(productReducer, {
        quantityProduct: 0,
        products: [],
    })

    const [modelUpdate, setModelUpdate] = useState({
        status: false,
        product: {},
    });

    const [modelDelete, setModelDelete] = useState(false);

    const getProduct = async (limit, pageCurrent) => {
        const response = await axios.get(`${apiUrl}/admin/product?limit=${limit}&skip=${limit * pageCurrent}`);

        if(response.data.success) {
            dispatch({
                type: GET_PRODUCT,
                payload: response.data,
            })
        }
    }



    //Post context data
    const productContextData = {
        productState,
        getProduct,
        modelUpdate,
        setModelUpdate,
        modelDelete,
        setModelDelete,
    };

    return (
        <ProductContext.Provider value={productContextData}>
            {children}
        </ProductContext.Provider>
    )
}

export default ProductContextProvider;

