
import { WEB_API_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dispatch } from "redux";
import { Action } from "../reducers/ItemsInCartReducer";
import { ItemInCart } from "../../screens/SinglePlantPage";
//Get all items in cart from async storage

export const getAllItemsInCart = () => async (dispatch: Dispatch<Action>, getState : any) => {

    let storage = await AsyncStorage.getItem("order");

    let items;
    if (storage) {
        items = JSON.parse(storage);
    }

    dispatch({
        type: "GET_ALL_ITEMS_IN_CART",
        payload: items
    })
};

//Update items in cart

export const updateItemsInCart = (array: ItemInCart[]) => async (dispatch: Dispatch<Action>, getState : any) => {

    dispatch({
        type: "UPDATE_ITEMS_IN_CART",
        payload: array
    })
    console.log(getState().itemsInCart.itemsInCart);
    await AsyncStorage.setItem("order", JSON.stringify(getState().itemsInCart.itemsInCart));
    console.log(await AsyncStorage.getItem("order"));
};

//Delete item in cart

export const deleteItemsInCart = (id : number) => async (dispatch: Dispatch<Action>, getState: any) => {

    dispatch({
        type: "DELETE_ITEM_IN_CART",
        payload: id
    });

    await AsyncStorage.setItem("order", JSON.stringify(getState().itemsInCart.itemsInCart));

};

//Update decrease items in cart

export const updateDecreaseQuantityOfItemInCart = (id: number, orderedQuantity: number) => async (dispatch: Dispatch<Action>, getState: any) => {
    
    dispatch({
        type: "UPDATE_DECREASE_QUANTITY_OF_ITEM_IN_CART",
        payload: {
            id: id,
            orderedQuantity: orderedQuantity
        }
    })

    await AsyncStorage.setItem("order", JSON.stringify(getState().itemsInCart.itemsInCart));

};

//Update increase items in cart


export const updateIncreaseQuantityOfItemInCart = (id: number, orderedQuantity: number) => async (dispatch: Dispatch<Action>, getState: any) => {
    
    dispatch({
        type: "UPDATE_INCREASE_QUANTITY_OF_ITEM_IN_CART",
        payload: {
            id: id,
            orderedQuantity: orderedQuantity
        }
    })

    AsyncStorage.setItem("order", JSON.stringify(getState().itemsInCart.itemsInCart));

};

//Clear items in cart

export const clearItemsInCart = () => async (dispatch: Dispatch<Action>, getState: any) => {

    AsyncStorage.removeItem("order");

   dispatch({
       type: "CLEAR_ITEMS_IN_CART"
   });
}
