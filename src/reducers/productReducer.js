import { GET_PRODUCT } from "~/contexts/constants";


export const productReducer = (state, action) => {
    const {type, payload} = action;

    switch(type) {
        case GET_PRODUCT:
            return {
                ...state,
                quantityProduct: payload.quantityProduct,
                products: payload.product,
            }
        default:
            return state;
    }
}