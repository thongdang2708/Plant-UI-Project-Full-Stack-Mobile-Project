

import { Dispatch } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import axios from "axios";
import { Action, PlantObject } from "../reducers/PlantReducer";
import { ProductsInOrder } from "../reducers/OrderReducer";

const WEB_API_URL="https://backend-for-plant-ui-production.up.railway.app";

//Update plant array after adding products to order
export const updatePlantsAfterSavingOrder = (array: ProductsInOrder[]) => async (dispatch: Dispatch<Action>, getState : any) => {

    let allPlants = getState().plants.plantSearch;

    let newArray = allPlants.map((plant: PlantObject) => {

        let newQuantity = plant.quantity;

        array.forEach((minorPlant: ProductsInOrder) => {
            if (plant.id === minorPlant.id) {
                newQuantity = newQuantity - minorPlant.quantity;
            }
        });

        return {
            ...plant,
            quantity: newQuantity,
            temporaryQuantity: newQuantity
        }
    });
    console.log(allPlants);
    console.log(newArray);

    dispatch({
        type: "UPDATE_PLANTS_AFTER_SAVING_ORDER",
        payload: newArray
    });

};

//Update plant array after removing order
export const updatePlantsAfterRemovingOrder = (array: ProductsInOrder[]) => async (dispatch: Dispatch<Action>, getState : any) => {

    let allPlants = getState().plants.plantSearch;

    let newArray = allPlants.map((plant: PlantObject) => {

        let newQuantity = plant.quantity;
        let newTempQuantity = plant.temporaryQuantity;

        array.forEach((minorPlant: ProductsInOrder) => {
            if (plant.id === minorPlant.productId) {
                newQuantity = newQuantity + minorPlant.quantity;
                newTempQuantity = newTempQuantity + minorPlant.quantity;
            }
        });

        return {
            ...plant,
            quantity: newQuantity,
            temporaryQuantity: newTempQuantity
        }
    });

    console.log(newArray);
    console.log(allPlants);

    dispatch({
        type: "UPDATE_PLANTS_AFTER_REMOVING_ORDER",
        payload: newArray
    });

};




//Get all plants


export const getAllPlants = () => async (dispatch : Dispatch<Action> , getState: any) => {
    
    try {

    let response = await axios.get(WEB_API_URL + "/plant/all");

    let data = response.data;

    dispatch({
        type: "GET_ALL_PLANTS_SUCCESS",
        payload: data
    });

    } catch (error) {
        let castError = error as any;
        let message = (castError.response && castError.response.data && castError.response.data.message) || castError.message || castError.toString();
        
        dispatch({
            type: "GET_ALL_PLANTS_FAIL",
            payload: message
        })
    }
}

//Get all plants for list

export const getAllPlantsForList = () => async (dispatch : Dispatch<Action> , getState: any) => {
    
    try {

    let response = await axios.get(WEB_API_URL + "/plant/all");

    let data = response.data;

    dispatch({
        type: "GET_ALL_PLANTS_FOR_SEARCH",
        payload: data
    });

    } catch (error) {
        let castError = error as any;
        let message = (castError.response && castError.response.data && castError.response.data.message) || castError.message || castError.toString();
        
        dispatch({
            type: "GET_ALL_PLANTS_FAIL",
            payload: message
        })
    }
}

//Get search results for plants based on keywords

export const getPlantsByKeywords = (searchText: string) => async (dispatch :Dispatch<Action>, getState : any) => {

    try {

        let response = await axios.get(WEB_API_URL + "/plant/search/" + searchText);

        let data = response.data;

        dispatch({
            type: "GET_PLANTS_BY_KEYWORDS",
            payload: data
        })

    } catch (error) {

        let castError = error as any;

        let message = (castError.response && castError.response.data && castError.response.data.message) || castError.message || castError.toString();

        dispatch({
            type: "GET_ALL_PLANTS_FAIL",
            payload: message
        })
    }

}

//Get search results based on types

export const getPlantsByTypes = (searchText: string) => async (dispatch :Dispatch<Action>, getState : any) => {

    try {

        let response = await axios.get(WEB_API_URL + "/plant/filter/type/" + searchText);

        let data = response.data;

        dispatch({
            type: "GET_PLANTS_BY_KEYWORDS",
            payload: data
        })

    } catch (error) {

        let castError = error as any;

        let message = (castError.response && castError.response.data && castError.response.data.message) || castError.message || castError.toString();

        dispatch({
            type: "GET_ALL_PLANTS_FAIL",
            payload: message
        })
    }

}

//Get search results based on status

export const getPlantsByStatus = (searchText: string) => async (dispatch :Dispatch<Action>, getState : any) => {

    try {

        let response = await axios.get(WEB_API_URL + "/plant/filter/status/" + searchText);

        let data = response.data;

        dispatch({
            type: "GET_PLANTS_BY_KEYWORDS",
            payload: data
        })

    } catch (error) {

        let castError = error as any;

        let message = (castError.response && castError.response.data && castError.response.data.message) || castError.message || castError.toString();

        dispatch({
            type: "GET_ALL_PLANTS_FAIL",
            payload: message
        })
    }

}

//Update status "liked" or "unliked" for plant search list

export const updateStatusForPlantSearchList = (id: number, status: string) => async (dispatch: Dispatch<Action>, getState : any) => {

    try {

    let response = await axios.put(WEB_API_URL + "/plant/" + id + "/update/" + status);

    let data = response.data;

    

    dispatch({
        type: "UPDATE_STATUS_FOR_PLANT_SEARCH",
        payload: data
    });

    } catch (error) {
        let castError = error as any;

        let message = (castError.response && castError.response.data && castError.response.data.message) || castError.message || castError.toString();

        dispatch({
            type: "UPDATE_PLANT_FAIL",
            payload: message
        })
    }
}

//Update status "liked" or "unliked" for high recommend list

export const updateStatusForHighRecommendList = (id: number, status: string) => async (dispatch: Dispatch<Action>, getState : any) => {

    try {

    let response = await axios.put(WEB_API_URL + "/plant/" + id + "/update/" + status);

    let data = response.data;

    console.log(data);
    dispatch({
        type: "UPDATE_STATUS_FOR_PLANT_HIGH_RECOMMEND_LIST",
        payload: data
    });

    } catch (error) {
        let castError = error as any;

        let message = (castError.response && castError.response.data && castError.response.data.message) || castError.message || castError.toString();

        dispatch({
            type: "UPDATE_PLANT_FAIL",
            payload: message
        })
    }
}

//Get single plant 

export const getSinglePlant = (id: number) => async (dispatch: Dispatch<Action>, getState: any) => {

    try {

    let response = await axios.get(WEB_API_URL + "/plant/" + id);

    let data = response.data;

    dispatch({
        type: "GET_SINGLE_PLANT_SUCCESS",
        payload: data
        
    });


    } catch (error) {
        let castError = error as any;

        let message = (castError.response && castError.response.data && castError.response.data.message) || castError.message || castError.toString();

        dispatch({
            type: "GET_SINGLE_PLANT_FAIL",
            payload: message
        })
    }
};

//Reset plant search

export const resetPlantSearch = () => async (dispatch: Dispatch<Action>, getState : any) => {

    dispatch({
        type: "RESET_PLANT_SEARCH"
    })
}

//Update temporary quantity

export const updateTemporaryQuantity = (id : number, temporaryQuantity : number) => async (dispatch: Dispatch<Action>, getState: any) => {

    try {
        console.log(temporaryQuantity);
    let response = await axios.put(WEB_API_URL + "/plant/" + id + "/changeTempQuantity/" + temporaryQuantity);

    let data = response.data;

    dispatch({
        type: "UPDATE_TEMPORARY_QUANTITY",
        payload: data
    });



    } catch (error) {
        let castError = error as any;

        let message = (castError.response && castError.response.data && castError.response.data.message) || castError.message || castError.toString();

        dispatch({
            type: "GET_SINGLE_PLANT_FAIL",
            payload: message
        })
    }

};

//Update temporary quantity when increase or decrease in a shopping cart

export const updateTemporaryQuantityWhenIncreasingOrDecreasing = (id : number, temporaryQuantity : number, totalQuantity: number) => async (dispatch: Dispatch<Action>, getState: any) => {

    try {
    
    let newCheckNumber;
    if (temporaryQuantity <= 0) {
        newCheckNumber = 0;
    } else if (temporaryQuantity === totalQuantity) {
        newCheckNumber = totalQuantity;
    } else {
        newCheckNumber = temporaryQuantity;
    }


    let response = await axios.put(WEB_API_URL + "/plant/" + id + "/changeTempQuantity/" + newCheckNumber);

    let data = response.data;

    dispatch({
        type: "UPDATE_TEMPORARY_QUANTITY",
        payload: data
    });



    } catch (error) {
        let castError = error as any;

        let message = (castError.response && castError.response.data && castError.response.data.message) || castError.message || castError.toString();

        dispatch({
            type: "GET_SINGLE_PLANT_FAIL",
            payload: message
        })
    }

};

