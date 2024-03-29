import { createContext, useReducer, useEffect } from "react";
import { authReducer } from "~/reducers/authReducer";
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME, UPDATE_CART, SET_AUTH } from './constants';
import axios from "axios";

import setAuthToken from '~/utils/setAuthToken';

export const AuthContext = createContext();

const AuthContextProvider = ({children}) => {
    const [authState, dispatch] = useReducer(authReducer, {
        authLoading: true,
        isAuthenticated: false,
        user: null,
        carts: [],
    });

    // Authenticate user
    const loadUser = async () => {
        if(localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
            setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);
        }

        try {
            const response = await axios.get(`${apiUrl}/user`)

            if(response.data.success) {
                dispatch({
                    type: SET_AUTH,
                    payload: {
                        isAuthenticated: true,
                        user: response.data.user,
                    }
                })
            }
        } catch (error) {
            localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
            setAuthToken(null);
            dispatch({
                type: 'SET_AUTH',
                payload: {
                    isAuthenticated: false,
                    user: null,
                }
            })
        }
    }

    useEffect(() => {
        loadUser();
    }, []);

    
    const uploadCart = async (data) => {
        const response = await axios.put(`${apiUrl}/user/cart`, data);

        if(response.data.success) {
            dispatch({
                type: UPDATE_CART,
                payload: {
                    carts: response.data.carts,
                },
            })

            return true;
        }

    }

    const deleteProductInCart = async () => {
        const response = await axios.put(`${apiUrl}/user/deleteCart`);


        if(response.data.success) {
            dispatch({
                type: UPDATE_CART,
                payload: {
                    carts: response.data.carts,
                },
            })

            return true;
            
        } else {
            return false;
        }
    }

    const removeProductInCart = async (id) => {
        const response = await axios.put(`${apiUrl}/user/removeCart`, {id});

        if(response.data.success) {
            dispatch({
                type: UPDATE_CART,
                payload: {
                    carts: response.data.carts,
                },
            })
            
        }
    }


    //Login
    const loginUser = async userForm => {
        try {
            const response = await axios.post(`${apiUrl}/user/login`, userForm)
            
            if(response.data.success){
                localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.accessToken);
            }

            await loadUser();

            return response.data;

        } catch (error) {
            if(error.response.data){
                return error.response.data;
            } else {
                return {success: false, message: error.message}
            }
        }
    }

    //Register
    const registerUser = async userForm => {
        try {
            const response = await axios.post(`${apiUrl}/user/register`, userForm)
            
            if(response.data.success){
                localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.accessToken);
            }

            await loadUser();

            return response.data;

        } catch (error) {
            if(error.response.data){
                return error.response.data;
            } else {
                return {success: false, message: error.message}
            }
        }
    }

    // Logout
    const logoutUser = () => {
        localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
        dispatch({
            type: SET_AUTH,
            payload: {
                isAuthenticated: false,
                user: null,
            }
        })
    }

    //Update user
    const updateUser = async (user) => {
        dispatch({
            type: SET_AUTH,
            payload: {
                isAuthenticated: true,
                user: user,
            }
        })
    }

    //Update Address user
    const updateAddressUser = async (data) => {

        try {
            const response = await axios.put(`${apiUrl}/user/updateAddress`, data)
            
            if(response.data.success){
                dispatch({
                    type: SET_AUTH,
                    payload: {
                        isAuthenticated: true,
                        user: response.data.user,
                    }
                })
            }


        } catch (error) {
            
        }
    }

    //Context data
    const authContextData = {deleteProductInCart, updateAddressUser, updateUser, loginUser, registerUser, logoutUser, authState, uploadCart, removeProductInCart}

    //Return provider
    return (
        <AuthContext.Provider value={authContextData}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;


