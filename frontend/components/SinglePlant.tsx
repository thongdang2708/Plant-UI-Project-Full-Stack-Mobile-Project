import React from 'react';
import {View, Text, StyleSheet, Image} from "react-native";
import { PlantObject } from '../store/reducers/PlantReducer';

import { MotiView } from 'moti';
import {Ionicons} from "@expo/vector-icons";
import { useState } from 'react';
import { colors } from '../constants/colors';
import { dispatchStore } from '../store/store';
import { Pressable } from 'react-native';
import { updateStatusForPlantSearchList } from '../store/actions/PlantAction';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootParamList } from '../App';
import { DrawerNavigationProp } from '@react-navigation/drawer';

const WEB_API_URL="https://backend-for-plant-ui-production.up.railway.app"

interface PlantObjectWithUpdateStatus extends PlantObject {
    updateStatus: React.Dispatch<React.SetStateAction<boolean>>
}

function SinglePlant(item : PlantObjectWithUpdateStatus) {


    //Define variables
    let {id, name, urlImage, plantType, price, quantity, expressionStatus, updateStatus} = item;

    //Set navigation
    let navigation = useNavigation<DrawerNavigationProp<RootParamList>>();

    //Function to update status
    const handleStatus = () => {
        if (expressionStatus === "liked") {
            dispatchStore(updateStatusForPlantSearchList(id, "unliked") as any);
            updateStatus(true);
        } else {
            dispatchStore(updateStatusForPlantSearchList(id, "liked") as any);
            updateStatus(true);
        }
    };

    //Handle press
    const handlePress = () => {

        navigation.navigate("SinglePlantPage", {
            id: id
        });

    };


  return (
    <Pressable onPress={handlePress}>
    
    <View style={styles.productContainer}>

        <View>
            <Image source={{uri: WEB_API_URL + "/api/v1/file/read/" + urlImage}} style={styles.image}/>
        </View>


        <View>
        <Text style={styles.title}> Name: <Text style={styles.mainTitle}> {name} </Text> </Text>
        <Text style={styles.title}> Price: <Text style={styles.mainTitle}> {price} </Text></Text>
        <Text style={styles.title}> Plant Type: <Text style={styles.mainTitle}> {plantType} </Text> </Text> 
        </View>

        <View style={styles.iconContainer}>
        <Ionicons name="heart-circle-outline" size={26} style={[styles.icon, expressionStatus === "liked" && styles.likedIcon]} onPress={handleStatus}/>
        </View>
    </View>
    </Pressable>
  )
};

const styles = StyleSheet.create({
    productContainer: {
       marginRight: 20,
       padding: 10,
       borderWidth: 2,
       borderRadius: 5,
       elevation: 4,
       shadowColor: colors.green,
       shadowOffset: {width: 0, height: 2},
       shadowRadius: 4,
       shadowOpacity: 0.45,
       overflow: "hidden"
    },
    image: {
        height: 200
    },
    mainTitle: {
        fontWeight: "bold"
    },
    title: {
        marginVertical: 5
    },
    iconContainer: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginTop: 10
    },
    icon: {
        color: colors.dark
    },
    likedIcon: {
        color: colors.red
    }
}); 

export default SinglePlant