import React, { useEffect } from 'react';
import {View, Text, ImageBackground, StyleSheet, Dimensions} from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { PlantObject } from '../store/reducers/PlantReducer';
import { useState } from 'react';

import { MotiView } from 'moti';
import axios from 'axios';
import { RootParamList } from '../App';
import {Ionicons} from "@expo/vector-icons";
import { colors } from '../constants/colors';
import { updateStatusForHighRecommendList } from '../store/actions/PlantAction';
import { dispatchStore } from '../store/store';
import {useNavigation} from "@react-navigation/native"
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { Pressable } from 'react-native';
const width = Dimensions.get("screen").width;
interface PlantObjectWithUpdateStatus extends PlantObject {
    updateStatus: React.Dispatch<React.SetStateAction<boolean>>
}

const WEB_API_URL="https://backend-for-plant-ui-production.up.railway.app"

function SingleHighRecommendPlant(item : PlantObjectWithUpdateStatus) {

     //Define variables
     let {id, name, urlImage, plantType, price, quantity, expressionStatus, updateStatus} = item;
    
    //Set navigation
    let navigation = useNavigation<DrawerNavigationProp<RootParamList>>();
    

    //Function to update status
    const handleUpdateStatus = () => {
        if (expressionStatus === "liked") {
            dispatchStore(updateStatusForHighRecommendList(id, "unliked") as any);
            updateStatus(true);
        } else {
            dispatchStore(updateStatusForHighRecommendList(id, "liked") as any);
            updateStatus(true);
        }

    };

    //Handle press when clicking on an item
    let handlePress = () => {
        navigation.navigate("SinglePlantPage", {
            id: id
        });
    };

  

  return (
    <Pressable onPress={handlePress}>
    <View style={styles.cardImage} >
        <View style={styles.imageContainer}>
            <ImageBackground source={{uri: WEB_API_URL + "/api/v1/file/read/" + urlImage}} style={styles.image}>

            </ImageBackground>
        </View>

        <View style={styles.textContainer}>
            <Text style={styles.mainTitle}> Name: <Text style={styles.mainTitleName}> {name} </Text> </Text>
            <Text style={styles.mainTitle}> Price: <Text style={styles.mainTitleName}> {price} </Text> </Text>
            <Text style={styles.mainTitle}> Plant type: <Text style={styles.mainTitleName}> {plantType} </Text> </Text>
            

            <View style={styles.iconContainer}> 
                <View >
                {expressionStatus === "liked" ? ( <Ionicons name="heart-circle-outline" size={22} color={colors.red} onPress={handleUpdateStatus}/>) : (  <Ionicons name="heart-circle-outline" size={22} color={colors.dark} onPress={handleUpdateStatus}/>)}
                </View>
            </View>
        </View>

    </View>
    </Pressable>
  )
};

const styles = StyleSheet.create({
    cardImage: {
        height: 300,
        width: width / 2,
        borderWidth: 2,
        marginRight: 10,
        borderRadius: 4
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        borderBottomWidth: 2
    },
    imageContainer: {
        flex: 0.70,
        overflow: "hidden",

    },
    textContainer: {
        flex: 0.30,
        marginVertical: 10
    },
    mainTitleName: {
        fontWeight: "bold",
        marginVertical: 10
    },
    mainTitle: {
        marginVertical: 2
    },
    iconContainer: {
        marginVertical: 5,
        marginHorizontal: 5,
        flexDirection: "row",
        justifyContent: "flex-end"
    },
    
});

export default SingleHighRecommendPlant