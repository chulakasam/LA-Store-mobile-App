

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from "./app/dashboard/Home";
import CartScreen from "./app/dashboard/Cart";
import Cart from "./app/dashboard/Cart";




const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Cart" component={Cart} options={{ title: "Your Cart" }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
