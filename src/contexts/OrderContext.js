import { createContext, useReducer, useState } from "react";
import { orderReducer } from '~/reducers/orderReducer';
import axios from "axios";
import { apiUrl, GET_ORDER } from "./constants";

export const OrderContext = createContext();

const OrderContextProvider = ({children}) => {
    const [orderState, dispatch] = useReducer(orderReducer, {
        orderLoading: true,
        order: [],
    });

    const getOrder = async (type) => {
        
        const response = await axios.get(`${apiUrl}/order/${type}`);


        if(response.data.success){
            dispatch({
                type: GET_ORDER,
                payload: {
                    order: response.data.order,
                }
            })
        }

    }

    const [dataOrder, setDataOrder] = useState({
        products: [],
        idCoupon: {
            code: "",
            num: 0,
        },
        status: '',
        totalPriceProduct: 0,
        totalPayment: 0,
    })


    const orderContextData = {dataOrder, setDataOrder, orderState, getOrder};

    return (
        <OrderContext.Provider value={orderContextData}>
            {children}
        </OrderContext.Provider>
    )

}

export default OrderContextProvider;