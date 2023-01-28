import React from 'react';
import {View, Text, StyleSheet, ListRenderItem, Pressable, Alert} from "react-native";
import { useState } from 'react';
import { useEffect } from 'react';
import { RootState } from '../store/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAllItemsInCart, updateItemsInCart } from '../store/actions/ItemsInCartAction';
import { dispatchStore } from '../store/store';
import { useSelector } from 'react-redux';
import { ItemInCart } from './SinglePlantPage';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import SinglePlantInOrder from '../components/SinglePlantInOrder';
import { colors } from '../constants/colors';
import { useNavigation } from '@react-navigation/native';
import { RootParamList } from '../App';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { addProductsToOrder } from '../store/actions/OrderAction';
import { clearItemsInCart } from '../store/actions/ItemsInCartAction';
import { updatePlantsAfterSavingOrder, updateTemporaryQuantity } from '../store/actions/PlantAction';

export interface ProductsFromOrder {
    id: number,
    name: string,
    price: number,
    quantity: number
}

function CartPage({route} : any) {

    //Get items in cart from redux;

    let { itemsInCart} = useSelector((state : RootState) => state.itemsInCart);

    //Set effect to get order
    useEffect(() => {
       
        dispatchStore(getAllItemsInCart() as any);
    },[route]);

    //Set navigation
    let navigation = useNavigation<DrawerNavigationProp<RootParamList>>();

    //Handle single item
    const handleRenderItem : ListRenderItem<ItemInCart>= ({item, index}) => {

        return <SinglePlantInOrder {...item} />
    };


    //Calculate the total bill for items in cart

    let totalPricesForEachItem = itemsInCart?.map((item: ItemInCart) => item.price * item.orderedQuantity);

    let totalSum = totalPricesForEachItem?.reduce((acc: any, ele: any) => acc += ele, 0);
    //Handle save order 

    console.log(itemsInCart);

    const handleSaveOrder = () => {

        let productsFromOrder : ProductsFromOrder[] = itemsInCart.map((item: ItemInCart) => (
            {
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.orderedQuantity
            }
        ));
        
        let getYear = new Date().getFullYear();
        let getMonth = (new Date().getMonth() + 1).toString().length === 1 ? "0" + (new Date().getMonth() + 1) : (new Date().getMonth() + 1);
        let getDate = (new Date().getDate()).toString().length === 1 ? "0" + (new Date().getDate()) : (new Date().getDate());
        let orderDate = getYear + "-" + getMonth + "-" + getDate;

        const saveOrder = () => {
            
            let order = {
                orderDate: orderDate,
                productsFromOrder: productsFromOrder
            };

            
            
            dispatchStore(addProductsToOrder(order) as any);
            dispatchStore(clearItemsInCart() as any);
            navigation.navigate("OrderPage");
            

        };
        Alert.alert("Let\t's save this order", "Are you sure to save this order", [
            {
                text: "Cancel",
                onPress: () => console.log("Cancel to save order!"),
                style: "cancel"
            },
            {
                text: "OK to save this order",
                onPress: saveOrder,
            }
        ]);
    }
    

  return (
    <View style={styles.cartPage}>
        <View style={styles.header}>
        <Text style={styles.title}> Cart Page </Text>

        {itemsInCart?.length > 0 && itemsInCart ? (
            <Pressable onPress={handleSaveOrder} style={({pressed}) => pressed && styles.pressedButton}>
            <View style={styles.buttonSave}>
                <Text style={styles.saveText}> Save order! </Text>
            </View>
            </Pressable>
        ) : 
            (
            <View style={styles.buttonWarning}>
                <Text style={styles.warningText}> Cannot Save Order</Text>
            </View>
            )
        }
        </View>

        {itemsInCart?.length > 0 && (
            <View>
                <Text style={styles.totalSum}> Total Values For The Cart: {(totalSum).toFixed(2)} </Text> 
            </View>
        )}


        {itemsInCart?.length > 0 && itemsInCart 
        ? 
        (
              
        <View style={styles.bodyCart}>
        <FlatList data={itemsInCart} renderItem={handleRenderItem} keyExtractor={(item : any) => item.id}/>
        </View>
        ) : 
        (
        <View style={styles.warningPage}>
            <Text style={styles.warningText}> Page is empty as there are no items added into cart! </Text>
        </View>
        )}
      
    </View>
  )
}; 

const styles = StyleSheet.create({
    cartPage: {
        flex: 1
    },
    title: {
        textAlign: "left",
        fontWeight: "bold",
        fontSize: 26,
        marginVertical: 10
    },
    bodyCart: {
        marginVertical: 20
    },
    header: {
        marginVertical: 10,
        marginHorizontal: 5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    buttonSave: {
        padding: 5,
        backgroundColor: colors.green,
        borderRadius: 4,
        borderWidth: 2
    },
    buttonWarning: {
        backgroundColor: colors.yellow,
        padding: 5,
        borderRadius: 4,
        borderWidth: 2
    },
    warningText: {
        fontWeight: "bold"
    },
    saveText: {
        fontWeight: "bold"
    },
    warningPage: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    totalSum: {
        fontWeight: "bold",
        marginHorizontal: 6,
        marginVertical: 10,
        fontSize: 20
    },
    pressedButton: {
        opacity: 0.35
    }
    
});




export default CartPage;