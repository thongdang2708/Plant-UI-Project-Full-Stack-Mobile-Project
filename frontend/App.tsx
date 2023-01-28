import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler';
import MainPage from './screens/MainPage';
import { colors } from './constants/colors';
import SinglePlantPage from './screens/SinglePlantPage';
import CartPage from './screens/CartPage';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { dispatchStore } from './store/store';
import { updateItemsInCart } from './store/actions/ItemsInCartAction';
import OrderPage from './screens/OrderPage';
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export type RootParamList = {
    MainPage: undefined,
    SinglePlantPage: {
      id: number
    }
    CartPage: undefined,
    OrderPage: undefined
}

interface DrawerOptions {
    drawerLabel: string | null 
}


const RootApp = () => {


  useEffect(() => {

    async function getStorage () {
        
        let storage = await AsyncStorage.getItem("order");

        if (storage) {
            dispatchStore(updateItemsInCart(JSON.parse(storage)) as any);
            console.log(storage);
        }
    }
    getStorage();

    
}, []);

  return (
    <Drawer.Navigator screenOptions={{
      headerTitle: "",
      headerStyle: {backgroundColor: colors.green},
      drawerStyle: {backgroundColor: colors.light},
      drawerActiveBackgroundColor: colors.green,
      drawerActiveTintColor: colors.dark,
      headerTintColor: colors.dark
    }}>
      <Drawer.Screen name='MainPage' component={MainPage} options={{
        drawerLabel: "Main Page"
      }}/>
      <Drawer.Screen name="SinglePlantPage" component={SinglePlantPage} options={{
        drawerItemStyle: {display: "none"}
      }}/>
      <Drawer.Screen name="CartPage" component={CartPage} options={{
        drawerLabel: "Cart Page"
      }}/>
      <Drawer.Screen name="OrderPage" component={OrderPage} options={{
        drawerLabel: "Order Page"
      }}/>
    </Drawer.Navigator>
  )
}

export default function App() {

  useEffect(() => {

    async function getStorage () {
        
        let storage = await AsyncStorage.getItem("order");

        if (storage) {
            dispatchStore(updateItemsInCart(JSON.parse(storage)) as any);
            console.log(storage);
        }
    }
    getStorage();

    
}, []);

  return (
    <>
    <Provider store={store}>
      <NavigationContainer>
        <RootApp />
        </NavigationContainer>
    </Provider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
