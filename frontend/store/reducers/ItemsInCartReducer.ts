import {ItemInCart} from "../../screens/SinglePlantPage";


//Get all items in cart

interface InitialState {
    itemsInCart: ItemInCart[] | []
};



const initialState : InitialState = {
    itemsInCart: []
}

export interface Action {
    type: string,
    payload?: any
}
export const itemsInCartReducers = (state : InitialState = initialState, action : Action) => {
    switch (action.type) {
        case "GET_ALL_ITEMS_IN_CART": 
            return {
                ...state,
                itemsInCart: action.payload
            }
        case "UPDATE_ITEMS_IN_CART":
            return {
                ...state,
                itemsInCart: action.payload
            }
        case "DELETE_ITEM_IN_CART":
            return {
                ...state,
                itemsInCart: state.itemsInCart.filter((item: ItemInCart) => item.id !== action.payload)
            }
        case "UPDATE_INCREASE_QUANTITY_OF_ITEM_IN_CART":
            return {
                ...state,
                itemsInCart: state.itemsInCart.map((item : ItemInCart) => {
                    let updatedQuantity = item.orderedQuantity;
                    if (item.id === action.payload.id) {
                        if (item.orderedQuantity + 1 <= item.quantity) {
                            updatedQuantity = item.orderedQuantity + 1;
                        } else if (item.orderedQuantity + 1 > item.quantity) {
                            updatedQuantity = item.quantity;
                        }
                    }

                    return {
                        ...item,
                        orderedQuantity: updatedQuantity
                    }
                })
            }
        case "UPDATE_DECREASE_QUANTITY_OF_ITEM_IN_CART":
            return {
                ...state,
                itemsInCart: state.itemsInCart.map((item : ItemInCart) => {
                    let updatedQuantity = item.orderedQuantity;
                    if (item.id === action.payload.id) {
                        if (item.orderedQuantity - 1 <= 0) {
                            updatedQuantity = 0;
                        } else if (item.orderedQuantity - 1 > 0) {
                            updatedQuantity = item.orderedQuantity - 1;
                        }
                    }

                    return {
                        ...item,
                        orderedQuantity: updatedQuantity
                    }
                })
            }
        case "CLEAR_ITEMS_IN_CART":
            return {
                ...state,
                itemsInCart: []
            }
        default:
            return state
    }
};