import React, { useEffect } from 'react';
import {View, Text, StyleSheet, ListRenderItem, Pressable} from "react-native";
import { colors } from '../constants/colors';
import { OrderObject } from '../screens/OrderPage';
import { dispatchStore, RootState } from '../store/store';
import { getAllProductsInOrder } from '../store/actions/OrderAction';
import { useSelector } from 'react-redux';
import { ProductsInOrder } from '../store/reducers/OrderReducer';
import { FlatList } from 'react-native-gesture-handler';
import {Ionicons} from "@expo/vector-icons";
import { deleteOrder } from '../store/actions/OrderAction';

import { updatePlantsAfterRemovingOrder } from '../store/actions/PlantAction';
import { useState } from 'react';
import axios from 'axios';

const WEB_API_URL="https://backend-for-plant-ui-production.up.railway.app"

function SinglePlantsInSavedOrder({id, orderDate} : OrderObject) {

    //Set state for products of individual orders
    let [allProducts, setAllProducts] = useState<ProductsInOrder[] | []>([]);
    
    //Set effect to fetch all products in order

    useEffect(() => {

        async function getProductsOfOrder () {
            let response = await axios.get(WEB_API_URL + "/carts/getProducts/" + id);

            let data = response.data;

            setAllProducts(data);
        }
        getProductsOfOrder();


    },[id]);



    // Calculate the total sum of bill in each order
    let totalPricesOfEachOrder = allProducts?.map((product : ProductsInOrder) => 
        product.price * product.quantity
    );

    let totalSum = totalPricesOfEachOrder?.reduce((acc: any, element: any) => acc+=element, 0);

  

    const handleRenderItem : ListRenderItem<ProductsInOrder> = ({item, index}) => {

        return (
            <View style={styles.eachProductDisplay}>
                
                <Text style={styles.textForProduct}> Name of product: {item.name} </Text>
                <Text style={styles.textForProduct}> (Price: {item.price} * {item.quantity} = {(item.price * item.quantity).toFixed(2)} )</Text>
                
            </View>
        )
    }
    console.log(allProducts);
    //Handle delete item
    const handleDelete = () => {
        dispatchStore(deleteOrder(id) as any);
        dispatchStore(updatePlantsAfterRemovingOrder(allProducts) as any);
        console.log(allProducts);
    };

  return (

    <View style={styles.orderBox}>
    <View style={styles.buttonContainer}>
        <Pressable onPress={handleDelete}>
        <View style={styles.button}>
            <Ionicons name="close-outline" size={24} color={colors.red}/>
        </View>
        </Pressable>
    </View>
    <View style={styles.orderInformationContainer}>
        <Text style={styles.text}> Order Id: {id} </Text>
        <Text style={styles.text}> Order Date: {orderDate} </Text> 
        <Text style={styles.text}> Total Sum Of The Order: {(totalSum).toFixed(2)} </Text>

        <View style={styles.productList}>
            <Text style={styles.text}> List of products as below: </Text>
            <FlatList data={allProducts} renderItem={handleRenderItem} keyExtractor={(item : any) => item.id}/>
        </View>
    </View>
    </View>
  )
};

const styles = StyleSheet.create({
    orderBox: {
        marginVertical: 20
    },
     orderInformationContainer: {
         padding: 10,
         backgroundColor: "rgba(162, 255, 145, 0.8)",
         marginHorizontal: 15,
         shadowColor: colors.dark,
         elevation: 4,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.40,
        shadowRadius: 4
     },
     text: {
         fontWeight: "bold",
         fontSize: 15,
         marginVertical: 5
     },
     productList: {
         marginVertical: 5
     },
     eachProductDisplay: {
         marginVertical: 5
     },
     textForProduct: {
         fontWeight: "bold",
         fontSize: 13
     },
     buttonContainer: {
        flexDirection: "row",
        justifyContent: "flex-end",
     },
     button: {
        marginRight: 15,
        borderRadius: 5,
        padding: 3,
        backgroundColor: "rgba(255, 119, 145, 0.8)"
     },

});

export default SinglePlantsInSavedOrder