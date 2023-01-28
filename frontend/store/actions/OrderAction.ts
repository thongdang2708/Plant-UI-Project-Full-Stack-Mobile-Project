
import axios from "axios";
import { Dispatch } from "redux";
import { WEB_API_URL } from "@env";
import { OrderObject } from "../reducers/OrderReducer";
import { PlantObject } from "../reducers/PlantReducer";
import { Action } from "../reducers/OrderReducer";
import { ProductsFromOrder } from "../../screens/CartPage";

interface Order {
    orderDate: string,
    productsFromOrder: ProductsFromOrder[]
}

interface ResponseOrder {
    id: number,
    orderDate: string
}

//Add Order

export const addProductsToOrder = (order: Order) => async (dispatch: Dispatch<Action>, getState: any) => {
    console.log(order);
    try {

    let response = await axios.post(WEB_API_URL + "/carts", order);

    let data = response.data;
    console.log(data);
    let plants = data.plants;
    console.log(plants);
    let plantSearch = getState().plants.plantSearch;

    let newArray = plantSearch.map((plant: PlantObject) => {

        let newQuantity = plant.quantity;
        let newTempQuantity = plant.temporaryQuantity;

        plants.forEach((minorplant: PlantObject) => {
            if (plant.id === minorplant.id) {
                newQuantity = minorplant.quantity;
                newTempQuantity = minorplant.temporaryQuantity
            }
        });

        return {
            ...plant,
            quantity: newQuantity,
            temporaryQuantity: newQuantity
        }
    });

    
    dispatch({
        type: "ADD_PRODUCTS_TO_ORDER_SUCCESS",
        payload: {
            id: data.id,
            orderDate: data.orderDate
        }
    });

    dispatch({
        type: "UPDATE_PLANTS_AFTER_SAVING_ORDER",
        payload: newArray
    });

    } catch (error) {

        let castError = error as any;
        let message = (castError.response && castError.response.data && castError.response.data.message) || castError.message || castError.toString();

        dispatch({
            type: "ADD_PRODUCTS_TO_ORDER_FAIL",
            payload: message
        })
    }
};

//Get all orders

export const getAllOrders = () => async (dispatch: Dispatch<Action>, getState: any) => {

    try {

    let response = await axios.get(WEB_API_URL + "/carts/all");

    let data = response.data;

    dispatch({
        type: "GET_ALL_ORDERS",
        payload: data
    });

    } catch (error) {
        
        let castError = error as any;
        let message = (castError.response && castError.response.data && castError.response.data.message) || castError.message || castError.toString();

        dispatch({
            type: "GET_ALL_PRODUCTS_FAIL",
            payload: message
        })
    }
}

//Get all products in order

export const getAllProductsInOrder = (id : number) => async (dispatch: Dispatch<Action>, action: Action) => {

    try {

    let response = await axios.get(WEB_API_URL + "/carts/getProducts/" + id);

    let data = response.data;

    let mappedArray = data.map((minorData : any) => (
        {
            id: minorData.id,
            name: minorData.name,
            price: minorData.price,
            quantity: minorData.quantity,
            productId: minorData.productId
        }
    ));

    dispatch({
        type: "GET_ALL_PRODUCTS_IN_ORDER",
        payload: mappedArray
    });


    } catch (error) {
        let castError = error as any;
        let message = (castError.response && castError.response.data && castError.response.data.message) || castError.message || castError.toString();

        dispatch({
            type: "GET_ALL_PRODUCTS_IN_ORDER_FAIL",
            payload: message
        });
        
    }
};

//Delete order

export const deleteOrder = (id : number) => async (dispatch: Dispatch<Action>, getState: any) => {

    try {

    let response = await axios.delete(WEB_API_URL + "/carts/" + id);

    dispatch({
        type: "DELETE_ORDER",
        payload: id
    });

    } catch (error) {
        let castError = error as any;
        let message = (castError.response && castError.response.data && castError.response.data.message) || castError.message || castError.toString();

        dispatch({
            type: "DELETE_ORDER_FAIL",
            payload: message
        });
    }
}