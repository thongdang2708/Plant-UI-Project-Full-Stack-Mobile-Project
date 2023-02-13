import { getAllOrders } from '../store/actions/OrderAction';
import React from 'react';
import {View, Text, StyleSheet, ListRenderItem} from "react-native";
import { dispatchStore, RootState } from '../store/store';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import SinglePlantsInSavedOrder from '../components/SinglePlantsInSavedOrder';
import { FlatList } from 'react-native-gesture-handler';


export interface OrderObject {
    id: number,
    orderDate: string
}

function OrderPage() {

    
    //Get orders from redux
    let {orders, isSuccess} = useSelector((state: RootState) => state.orders);

    //Set effect to get all orders
    useEffect(() => {
        
        dispatchStore(getAllOrders() as any);
    },[isSuccess]);


    console.log(orders);

    //Handle render items
    let filterdOrders : OrderObject[] | [] = orders?.filter((order: any) => ({
        id: order.id,
        orderDate: order.orderDate
    }))

    //Handle render orders
    let handleRenderItem : ListRenderItem<OrderObject> = ({item, index}) => {

        return <SinglePlantsInSavedOrder {...item}/>
        
    }

  return (
    <View style={styles.orderScreen}>
        <Text style={styles.title}> Page To Save Order! </Text>

        <View style={styles.bodyPart}>
            <FlatList data={filterdOrders} renderItem={handleRenderItem} keyExtractor={(item : any) => item.id}/>
        </View>
        
    </View>
  )
};

const styles = StyleSheet.create({
    orderScreen: {
        flex: 1
    },
    title: {
        textAlign: "center",
        marginVertical: 20,
        fontSize: 20,
        fontWeight: "bold"
    },
    bodyPart: {
       marginBottom: 80
    }
});

export default OrderPage