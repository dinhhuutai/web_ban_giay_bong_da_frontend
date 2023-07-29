import { UPDATE_CART, SET_AUTH } from "~/contexts/constants";

export const authReducer = (state, action) => {
    const {
        type,
        payload: {
            isAuthenticated,
            user,
            carts,
        }
    } = action;

    switch(type) {
        case SET_AUTH:
            return {
                ...state,
                authLoading: false,
                isAuthenticated,
                user,
                carts: user ? user.cart : [],
            }
        case UPDATE_CART:
            return {
                ...state,
                carts: carts,
            }
        default:
            return state;
    }
}