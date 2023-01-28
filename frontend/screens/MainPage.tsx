
import React from 'react';
import {View, Text, ListRenderItem, TextInput} from "react-native";
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getAllPlants } from '../store/actions/PlantAction';
import { RootState } from '../store/store';
import { AppDispatch } from '../store/store';
import { dispatchStore } from '../store/store';
import { colors } from '../constants/colors';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import {Ionicons} from "@expo/vector-icons";
import { PlantObject } from '../store/reducers/PlantReducer'; 
import SingleHighRecommendPlant from '../components/SingleHighRecommendPlant';
import { useState } from 'react';
import { getAllPlantsForList } from '../store/actions/PlantAction';
import { getPlantsByKeywords } from '../store/actions/PlantAction';
import { getPlantsByStatus } from '../store/actions/PlantAction';
import { getPlantsByTypes } from '../store/actions/PlantAction';
import SinglePlant from '../components/SinglePlant';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MotiView } from 'moti';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RootParamList } from '../App';

import AsyncStorage from '@react-native-async-storage/async-storage';


function MainPage() {

  //Get state from redux for plants
  let {plants, plantSearch, isSuccess, plantBasedOnType, plantBasedOnStatus} = useSelector((state : RootState) => state.plants);

  //Set change when update status: 

 
  let [updateStatus, setUpdateStatus] = useState<boolean>(false);

  //Set dispatch
  let dispatch = useDispatch();

  //Set navigation
  let navigation = useNavigation<DrawerNavigationProp<RootParamList>>();
 
  //Set effect to get all data of plants

  useEffect(() => {
  
      dispatch(getAllPlants() as any);
      async function getStorage () {
            
        let storage = await AsyncStorage.getItem("order");

        if (storage) {
            console.log(storage);
        }
        
    }
    getStorage();


  },[updateStatus]);

  //Filter plants based on high recommendation
  let highRecommendPlants = plantSearch.filter((plant: PlantObject) => plant.highRecommend === true);

  //Handle to display single high-recommended plant

  const handleRenderItem : ListRenderItem<PlantObject> = ({item, index}) => {

      return <SingleHighRecommendPlant {...item} updateStatus={setUpdateStatus}/> 

  };

  //Set state and handle text for searching

  let [searchText, setSearchText] = useState<string>("");
  
  const handleChange = (text : string) => {
    setSearchText(text);
  } 

  //Set effect to fetch plants based on search keywords

  useEffect(() => {

    
      if (searchText.trim() === "") {
        dispatchStore(getAllPlantsForList() as any);
      } else {
        dispatchStore(getPlantsByKeywords(searchText.trim()) as any);
        dispatchStore(getPlantsByTypes(searchText.trim()) as any);
        dispatchStore(getPlantsByStatus(searchText.trim()) as any);
      }
    
    

  },[searchText, updateStatus]);

  
  //Handle single item in a product list

  const handleSinglePlant : ListRenderItem<PlantObject>= ({item, index}) => {

    


    return <SinglePlant {...item} updateStatus={setUpdateStatus}/>
  };

  //Click to go to cart
  const handleToCart = () => {
    navigation.navigate("CartPage");
  }


  return (
   <ScrollView style={styles.screen}>
     <View style={styles.header}>
        <View>
          <Text style={styles.upperTitle}> Welcome To </Text>
          <Text style={styles.lowerTitle}> Plant Shop </Text>
        </View> 

        <View>
          <Ionicons name='cart-outline' color={colors.dark} size={24} onPress={handleToCart}/>
        </View>
     </View>

     <View style={styles.searchContainer}>
            <Ionicons name="search-outline" color={colors.dark} size={24} style={styles.iconContainer}/>
            <TextInput placeholder='Enter your search' autoCapitalize='none' autoCorrect={false} multiline={true} style={styles.inputContainer} value={searchText} onChangeText={(text :string) => handleChange(text)}/>
      </View>

     <View style={styles.highRecommendPlantContainer}>
       <MotiView from={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} delay={1000}>
        <Text style={styles.title}> High-Recommended Products! </Text>
        <FlatList data={highRecommendPlants} renderItem={handleRenderItem} keyExtractor={(item: any, index: any) => {
          return item.id;
        }} horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{paddingLeft: 5}}/>
        </MotiView>
     </View>


     <View style={styles.productList}>
       <MotiView from={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} delay={1000}>
     <Text style={styles.title}> Plant Product List: </Text> 
       <View style={styles.productContainer}>
        <FlatList data={plantSearch} renderItem={handleSinglePlant} keyExtractor={(item : any, index: any) => {
          return item.id
        }} horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{paddingLeft: 12}}/>
        </View>
        </MotiView>
     </View>
   </ScrollView>

  )
}

const styles = StyleSheet.create({
    screen: {
      flex: 1,
      padding: 10
    },
    header: {
      marginTop: 10,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between"
    },
    upperTitle: {
      color: colors.dark,
      fontWeight: "bold",
      fontSize: 20
    },
    lowerTitle: {
      color: colors.green,
      fontWeight: "bold",
      fontSize: 30,
      marginTop: 10
    },
    title: {
      marginVertical: 10,
      fontWeight: "bold",
      fontSize: 20,
      color: colors.green
    },
    highRecommendPlantContainer: {
      marginVertical: 10
    },
    searchContainer: {
      flexDirection: "row",
      paddingLeft: 10,
      borderWidth: 2,
      borderRadius: 5,
      marginHorizontal: 5,
      marginVertical: 10,
      alignItems: "center"
    },
    inputContainer: {
      height: 20,
      flex: 0.9,
      textAlignVertical: "top",
      padding: 5,
    },
    iconContainer: {
      flex: 0.1,
    },
    productList: {
      marginVertical: 20
    },
    productContainer: {
      flexDirection: "row",
      flexWrap: "wrap"
    }
});

export default MainPage