import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack"
import {HomeIcon, ShoppingCartIcon, CalendarIcon, CreditCardIcon} from "lucide-react-native";
import Payment from "./Payment";
import Schedule from "./Schedule";
import CartScreen from "./Cart";
import {CartProvider} from "./CartContext";
import Home from "./Home";
import Cart from "./Cart";








const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


export default function App() {
    return (
         <CartProvider>

                <Tab.Navigator
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ color, size }) => {
                            const icons: { [key: string]: React.ElementType } = {
                                Home: HomeIcon,
                                Cart: ShoppingCartIcon,
                                Payment: CreditCardIcon,
                                Schedule: CalendarIcon,
                            };

                            const IconComponent = icons[route.name] || HomeIcon;
                            return <IconComponent size={size} color={color} />;
                        },
                        tabBarActiveTintColor: "#3B82F6",
                        tabBarInactiveTintColor: "gray",
                        headerShown: false,
                    })}
                >
                    <Tab.Screen name="Home" component={Home} />
                    <Tab.Screen name="Cart" component={Cart} />
                    <Tab.Screen name="Payment" component={Payment} />
                    <Tab.Screen name="Schedule" component={Schedule} />
                </Tab.Navigator>

        </CartProvider>
);

}
