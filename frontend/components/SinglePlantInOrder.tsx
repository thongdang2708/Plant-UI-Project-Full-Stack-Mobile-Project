
import { ItemInCart } from '../screens/SinglePlantPage';
import React, { useState } from 'react';
import {View, Text, StyleSheet, Pressable} from "react-native";
import { colors } from '../constants/colors';
import {Ionicons} from "@expo/vector-icons";
import { dispatchStore } from '../store/store';
import { updateTemporaryQuantity } from '../store/actions/PlantAction';
import { deleteItemsInCart } from '../store/actions/ItemsInCartAction';
import { updateDecreaseQuantityOfItemInCart } from '../store/actions/ItemsInCartAction';
import { updateIncreaseQuantityOfItemInCart } from '../store/actions/ItemsInCartAction';
import { updateTemporaryQuantityWhenIncreasingOrDecreasing } from '../store/actions/PlantAction';


function SinglePlantInOrder({id, name, price, orderedQuantity, quantity} : ItemInCart) {

    //Set state for ordered quantity
    let [amount, setAmount] = useState(orderedQuantity);
    
    //Handle decrease item in cart
    const handleDecrease = () => {

        let newQuantity = orderedQuantity - 1;
        
        if (newQuantity < 1) {
            dispatchStore(updateTemporaryQuantity(id, quantity) as any);
            dispatchStore(deleteItemsInCart(id) as any);
        } else {
            dispatchStore(updateDecreaseQuantityOfItemInCart(id, orderedQuantity) as any);
            dispatchStore(updateTemporaryQuantityWhenIncreasingOrDecreasing(id, quantity - orderedQuantity + 1, quantity) as any);
        }
    };

    //Handle delete item in cart
    const handleDelete = () => {
        dispatchStore(updateTemporaryQuantity(id, quantity) as any);
        dispatchStore(deleteItemsInCart(id) as any);
    }

    //Handle increase item in cart
    const handleIncrease = () => {

        let newQuantity = orderedQuantity + 1;

        dispatchStore(updateIncreaseQuantityOfItemInCart(id, orderedQuantity) as any);
        dispatchStore(updateTemporaryQuantityWhenIncreasingOrDecreasing(id, quantity - orderedQuantity - 1, quantity) as any);
    };

    

  return (
    <View>
    <View style={styles.deleteButtonContainer}>
    <Pressable onPress={handleDelete}>
        <View style={styles.deleteButton}>
            <Ionicons name="close-outline" size={20} color={colors.dark}/>
        </View>
    </Pressable>
    </View>
    <View style={styles.itemsInCartContainer}>
        <View style={styles.firstPart}>
        <Text style={styles.title}> Name: </Text>
        <Text style={styles.title}> {name} </Text>
        </View>

        


        <View style={styles.buttonContainer}>
                  <View>
                      <Ionicons name="remove-circle-outline" size={30} color={colors.dark} onPress={handleDecrease}/>
                  </View>
                  <View style={styles.sideBoxForAmount}>
                    <Text style={styles.textAmount}> {orderedQuantity} </Text>
                  </View>
                  <View style={styles.rightSideBox}>
                      <Ionicons name="add-circle-outline" size={30} color={colors.dark} onPress={handleIncrease}/>
                  </View>
        </View>

        <View>
            <Text style={styles.priceInformation}> Total: {(price * orderedQuantity).toFixed(2)}</Text>
        </View>
    </View>
    </View>
  )
};

const styles = StyleSheet.create({
    itemsInCartContainer: {
        padding: 5,
        backgroundColor: colors.blueGreen,
        marginBottom: 10,
        marginHorizontal: 15,
        borderRadius: 4,
        elevation: 4,
        shadowColor: colors.dark,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.45,
        shadowRadius: 4,
    },
    title: {
        fontWeight: "bold",
        fontSize: 16
    },
    firstPart: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 5
    },
    buttonContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10
      },
      sideBoxForAmount: {
        marginHorizontal: 5 
      },
      rightSideBox: {
        marginLeft: 5
      },
      textAmount: {
        fontSize: 24,
        fontWeight: "bold"
      },
      deleteButton: {
          height: 20,
          width: 20,
          borderRadius: 10,
          backgroundColor: "rgba(245, 73, 108, 0.8)",
          borderWidth: 0.5
      },
      priceInformation: {
          textAlign: "center",
          fontWeight: "bold",
        fontSize: 20
      },
      deleteButtonContainer: {
          flexDirection: "row",
          justifyContent: "flex-end",
          marginRight: 15
      }
});

export default SinglePlantInOrder