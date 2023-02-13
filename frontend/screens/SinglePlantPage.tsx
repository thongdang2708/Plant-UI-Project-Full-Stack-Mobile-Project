import React, { useEffect } from 'react';
import {View, Text, Pressable} from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootParamList } from '../App';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { dispatchStore } from '../store/store';
import { getAllPlantsForList, getSinglePlant } from '../store/actions/PlantAction';
import { useSelector } from 'react-redux';
import { PlantObject } from '../store/reducers/PlantReducer';
import { RootState } from '../store/store';
import { StyleSheet } from 'react-native';
import {Ionicons} from "@expo/vector-icons";
import { colors } from '../constants/colors';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'react-native';

import { useState } from 'react';
import { updateTemporaryQuantity } from '../store/actions/PlantAction';
import { color } from 'react-native-reanimated';
import { getAllPlants } from '../store/actions/PlantAction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { updateItemsInCart } from '../store/actions/ItemsInCartAction';

const WEB_API_URL="https://backend-for-plant-ui-production.up.railway.app"

export interface ItemInCart {
  id: number,
  name: string,
  price: number,
  quantity: number,
  orderedQuantity: number
}

function SinglePlantPage ({navigation, route} : any) {


  //Set state to check that item is added to cart
  let [addToCart, setAddToCart] = useState<boolean>(false);

  //Set state for item to select in cart
  let [amount, setAmount] = useState<number>(1);

  //Get param id for the single plant page
  let id = route.params?.id;

  //Get state for orders in cart to check changes
  let {orders, isSuccess} = useSelector((state : RootState) => state.orders);

  // Fetch single plant based on id
  useEffect(() => {

    
      dispatchStore(getAllPlants() as any);
 

  },[]);

  //Get items in cart in redux
  let {itemsInCart} = useSelector((state: RootState) => state.itemsInCart)

  //Get global state for single plant from redux
  let {plantSearch} = useSelector((state : RootState) => state.plants);

  let plant = plantSearch.filter((plant : PlantObject) => plant.id === id)[0];
  console.log(plant.quantity);
  //Set check for update quantity
  let [checkQuantity, setCheckQuantity] = useState<boolean>();

  //Check quantity
  let quantity;

  useEffect(() => {
    
    
  
      if (itemsInCart || itemsInCart?.length > 0) {
  
        let filteredArray = itemsInCart.filter((plantInCart : ItemInCart) => plantInCart.id === plant.id);

        if (filteredArray.length > 0) {
          
          let getOrderedQuantity = filteredArray[0].orderedQuantity;
          dispatchStore(updateTemporaryQuantity(plant.id, plant.quantity - getOrderedQuantity) as any);
        } else if (filteredArray.length === 0){
          dispatchStore(updateTemporaryQuantity(plant.id, plant.temporaryQuantity !== plant.quantity || plant.temporaryQuantity === 0? plant.quantity : plant.temporaryQuantity) as any);
        }
  
  
      } 
       else if (itemsInCart?.length === 0) {
        dispatchStore(updateTemporaryQuantity(plant.id, plant.temporaryQuantity !== plant.quantity || plant.temporaryQuantity === 0? plant.quantity : plant.temporaryQuantity) as any);
      }
      
      setAmount(1);
    
    
  },[checkQuantity, plant.id]);
    


   
  console.log(plant.temporaryQuantity);
 


  
  
  //Handle Press
  let handlePress = () => {
      navigation.goBack();
  };

  //Handle decrease amount
  const handleDecrease = () => {
      amount--;

      if (amount <= 1) {
        setAmount(1);
      } else {
        setAmount(amount);
      }
  }

  //Handle increase amount
  const handleIncrease = () => {
    amount++;

    if (amount > plant.temporaryQuantity) {
      setAmount(plant.temporaryQuantity);
    } else {
      setAmount(amount);
    }
  }

  //Handle Press To Add To Cart

  const handlePressToSaveToCart = async () => {

    let newItem : ItemInCart = {
      id: plant.id,
      name: plant.name,
      price: plant.price,
      quantity: plant.quantity,
      orderedQuantity: amount
    }

    
    // let storedItems = await AsyncStorage.getItem("order");
    // let items;
    // if (storedItems) {
    //   items = JSON.parse(storedItems);
    // } else {
    //   items = [];
    // }

    let items;

    if (itemsInCart || itemsInCart?.length > 0) {
      items = itemsInCart;
    } else {
      items = [];
    }


    let checkedId = items.some((item : ItemInCart) => item.id === plant.id);

    if (checkedId) {
      let mappedItems = items.map((item : ItemInCart) => {
        let newItem = item.orderedQuantity;
        if (item.id === plant.id) {
          if (item.orderedQuantity + amount > item.quantity) {
            newItem = item.quantity;
          } else if (item.orderedQuantity + amount <= item.quantity) {
            newItem = amount + item.orderedQuantity;
          }
        }

        return {
          ...item,
          quantity: plant.quantity,
          orderedQuantity: newItem
        }
      })
      // await AsyncStorage.setItem("order", JSON.stringify(mappedItems));
      dispatchStore(updateItemsInCart(mappedItems) as any);
    
    } else {
      items.push(newItem);
     
      // await AsyncStorage.setItem("order", JSON.stringify(items));
      dispatchStore(updateItemsInCart(items) as any);
    }

    console.log(await AsyncStorage.getItem("order"));

    setAddToCart(true);
    setCheckQuantity(!checkQuantity);
    setAmount(1);
    setTimeout(async () => {
      setAddToCart(false);
    
    }, 2000);

  };  

  
  //Handle To Cart
  const handleToCart = () => {
    navigation.navigate("CartPage");
  };
  


  return (
    <View style={styles.screen}>
        <View style={styles.header}>
            <View style={styles.backButton}>
            <Ionicons name="arrow-back-outline" size={24} onPress={handlePress} color={colors.dark}/>
            </View>

            <View style={styles.cartButton}>
          <Ionicons name='cart-outline' color={colors.dark} size={30} onPress={handleToCart}/>
        </View>

        </View>

        <View style={styles.body}>
            <View style={styles.firstBodyPart}>
                <Image source={{uri: WEB_API_URL + "/api/v1/file/read/" + plant.urlImage}} style={styles.image}/>
            </View>

            <View style={styles.secondBodyPart}>
                <Text style={styles.title}> Name: {plant.name} </Text>
                <Text style={styles.title}> Plant Type: {plant.plantType.charAt(0).toUpperCase() + plant.plantType.substring(1)} </Text>
                <Text style={styles.title}> Price: {plant.price} </Text>
                <View>
                  <Text style={styles.title}> About: </Text>
                  <Text style={styles.description}> {plant.description}</Text>
                </View>

                {plant.temporaryQuantity <= 0 ? (
                  <View style={styles.overItemButton}> 
                    <Text style={styles.textOverItemButton}> This item is out of stock </Text>
                  </View>
                ) : (
                  <>
                  <View style={styles.buttonContainer}>
                  <View>
                      <Ionicons name="remove-circle-outline" size={30} color={colors.dark} onPress={handleDecrease}/>
                  </View>
                  <View style={styles.sideBoxForAmount}>
                    <Text style={styles.textAmount}> {amount}</Text>
                  </View>
                  <View style={styles.rightSideBox}>
                      <Ionicons name="add-circle-outline" size={30} color={colors.dark} onPress={handleIncrease}/>
                  </View>
                </View>

                {plant.temporaryQuantity === amount && (<Text style={styles.warningText}> Item reaches the amount in stock! </Text>)}

                <Pressable style={({pressed}) => pressed && styles.pressedButton} onPress={handlePressToSaveToCart} disabled={addToCart}>
                <View style={[styles.addToCartButton, addToCart && styles.selectedButton]}>
                    <Text style={styles.textAddToCartButton}> {addToCart ? "Added" : "Save To Cart"} </Text>
                </View>
                </Pressable>
                </>
                )}
               
            </View> 
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    screen: {
      flex: 1,
    
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginHorizontal: 10,
    },
    backButton: {
      padding: 5,
      borderWidth: 2,
      borderRadius: 5,
      marginTop: 5
    },
    title: {
      fontWeight: "bold",
      fontSize: 20,
      marginVertical: 5
    },
    body: {
      flex: 1
    },
    image: {
      height: "100%"
    },
    firstBodyPart: {
      flex: 0.45
    },
    secondBodyPart: {
      flex: 0.55,
      borderWidth: 2,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      borderColor: colors.dark,
      backgroundColor: colors.green,
      padding: 10
    },
    cartButton: {
      marginTop: 5
    },
    description: {
      textAlign: "justify"
    },
    buttonContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginVertical: 10
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
    addToCartButton: {
      backgroundColor: colors.purple,
      padding: 10,
      borderRadius: 5,
      elevation: 4,
      shadowColor: colors.dark,
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.34,
      shadowRadius: 4
    },
    textAddToCartButton: {
      textAlign: "center",
      fontWeight: "bold",
      fontSize: 20
    },
    pressedButton: {
      opacity: 0.35
    },
    selectedButton: {
      backgroundColor: colors.yellow
    },
    overItemButton: {
      backgroundColor: colors.purple,
      padding: 10,
      borderRadius: 5,
      elevation: 4,
      shadowColor: colors.dark,
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.34,
      shadowRadius: 4,
      marginVertical: 12
    },
    textOverItemButton: {
      textAlign: "center",
      fontWeight: "bold",
      fontSize: 20
    },
    warningText: {
      marginVertical: 8,
      color: colors.red,
      textAlign: "center",
      fontWeight: "bold",
      fontSize: 14,
    }
});
export default SinglePlantPage;