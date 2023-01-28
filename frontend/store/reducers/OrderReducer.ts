

export interface OrderObject {
    id: number
    orderDate: string,
}

export interface ProductsInOrder {
    id: number,
    name: string,
    price: number,
    quantity: number,
    productId: number
}

interface InitialState {
    orders: OrderObject[] | [],
    productsInOrder: ProductsInOrder[] | [],
    isSuccess: boolean,
    isError: boolean,
    message: string
}

const initialState :InitialState = {
    orders: [],
    productsInOrder: [],
    isSuccess: false,
    isError: false,
    message: ""
} 

export interface Action {
    type: string,
    payload?: any
}

export const orderReducers = (state : InitialState = initialState, action: Action) => {

    switch (action.type) {
        case "ADD_PRODUCTS_TO_ORDER_SUCCESS":
            return {
                ...state,
                orders: [...state.orders, action.payload],
                isSuccess: true
            }
        case "ADD_PRODUCTS_TO_ORDER_FAIL":
            return {
                ...state,
                isError: true,
                message: action.payload
            }
        case "GET_ALL_ORDERS":
            return {
                ...state,
                orders: action.payload
            }
        case "GET_ALL_PRODUCTS_FAIL":
            return {
                ...state,
                isError: true,
                message: action.payload
            }
        case "GET_ALL_PRODUCTS_IN_ORDER":
            return {
                ...state,
                productsInOrder: action.payload
            }
        case "GET_ALL_PRODUCTS_IN_ORDER_FAIL":
            return {
                ...state,
                isError: true,
                message: action.payload
            }
        case "DELETE_ORDER": 
            return {
                ...state,
                orders: state.orders.filter((order: OrderObject) => order.id !== action.payload),
                isSuccess: false
            }
        case "DELETE_ORDER_FAIL":
            return {
                ...state,
                isError: true,
                message: action.payload
            }
        default:
            return state;
    }
}