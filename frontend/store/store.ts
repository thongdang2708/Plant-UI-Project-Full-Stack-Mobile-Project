
import { createStore } from "redux";
import { applyMiddleware } from "redux";
import { combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import plantReducers from "./reducers/PlantReducer";
import { itemsInCartReducers } from "./reducers/ItemsInCartReducer";
import { orderReducers } from "./reducers/OrderReducer";
const reducers = combineReducers({
    plants: plantReducers,
    itemsInCart: itemsInCartReducers,
    orders: orderReducers
}); 

const middleware = [thunk];

export const store = createStore(reducers, composeWithDevTools(applyMiddleware(...middleware)));

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const dispatchStore = store.dispatch;