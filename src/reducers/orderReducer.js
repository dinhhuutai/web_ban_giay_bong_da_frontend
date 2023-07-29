import { GET_ORDER } from "~/contexts/constants";

export const orderReducer = (state, action) => {
    const {
        type,
        payload: {
            order,
        }
    } = action;

    switch(type) {
        case GET_ORDER:
            return {
                ...state,
                order,
            }
        default:
            return state;
    }
}