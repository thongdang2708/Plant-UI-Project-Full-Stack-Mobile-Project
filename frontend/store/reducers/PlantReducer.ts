

export interface PlantObject {
    id: number,
    name: string,
    description: string,
    expressionStatus: string,
    highRecommend: boolean,
    price: number,
    quantity: number,
    temporaryQuantity: number,
    urlImage: string,
    plantType: string
}

interface initialStateDeclare {
    plants: PlantObject[] | [],
    plantSearch: PlantObject[] | [],
    plant: PlantObject | {},
    plantBasedOnType: PlantObject[] | [],
    plantBasedOnStatus: PlantObject[] | [],
    isSuccess: boolean,
    isError: boolean,
    message: string,
}

export interface Action {
    type: string,
    payload?: any
}


const initialState = {
    plants: [],
    plant: {},
    plantSearch: [],
    plantBasedOnType: [],
    plantBasedOnStatus: [],
    isSuccess: false,
    isError: false,
    message: "",
}

const plantReducers = (state: initialStateDeclare = initialState, action: Action) => {

    switch (action.type) {
        case "GET_ALL_PLANTS_SUCCESS":
            return {
                ...state,
                plantSearch: action.payload,
                isSuccess: true
            }
        case "UPDATE_PLANTS_AFTER_SAVING_ORDER":
            return {
                ...state,
                plantSearch: action.payload
            }
        case "UPDATE_PLANTS_AFTER_REMOVING_ORDER":
            return {
                ...state,
                plantSearch: action.payload
            }
        case "GET_ALL_PLANTS_FAIL":
            return {
                ...state,
                isError: true,
                message: action.payload
            }
        case "GET_ALL_PLANTS_FOR_SEARCH":
            return {
                ...state,
                plantSearch: action.payload,
                isSuccess: true
            }
        case "GET_PLANTS_BY_KEYWORDS":
            return {
                ...state,
                plantSearch: action.payload.length === 0 ? state.plantSearch : action.payload,
                isSuccess:true
            }
        case "RESET_PLANT_SEARCH":
            return {
                ...state,
                plantSearch: []
            }
        case "UPDATE_PLANT_FAIL": 
            return {
                ...state,
                isError: true,
                message: action.payload
            }
        case "UPDATE_STATUS_FOR_PLANT_HIGH_RECOMMEND_LIST": 
            return {
                ...state,
                plantSearch: state.plantSearch.map((plant: PlantObject) => plant.id === action.payload.id ? action.payload : plant),
                isSuccess: true
            }
        case "UPDATE_STATUS_FOR_PLANT_SEARCH": 
            return {
                ...state,
                plantSearch: state.plantSearch.map((plant: PlantObject) => plant.id === action.payload.id ? action.payload : plant),
                isSuccess: true
            }
        case "GET_SINGLE_PLANT_SUCCESS":
            return {
                ...state,
                plant: action.payload,
                isSuccess: true
            }
        case "GET_SINGLE_PLANT_FAIL":
            return {
                ...state,
                isError: true,
                message: action.payload
            }
        case "UPDATE_TEMPORARY_QUANTITY":
            return {
                ...state,
                plantSearch: state.plantSearch.map((plant: PlantObject) => plant.id === action.payload.id ? action.payload : plant)
            }
        default:
            return state
    }
}

export default plantReducers;