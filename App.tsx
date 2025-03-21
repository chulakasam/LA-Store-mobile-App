import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { HomeIcon, ShoppingCartIcon, CalendarIcon, CreditCardIcon } from "lucide-react-native"; // Import correct icons

import Home from "./app/dashboard/Home";
import Cart from "./app/dashboard/Cart";
import Payment from "./app/dashboard/Payment";
import Schedule from "./app/dashboard/Schedule";

const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ color, size }) => {
                        const icons: { [key: string]: React.ElementType } = {
                            Home: HomeIcon,
                            Cart: ShoppingCartIcon,
                            Payment: CreditCardIcon,
                            Schedule: CalendarIcon,
                        };

                        const IconComponent = icons[route.name] || HomeIcon; // Default to HomeIcon if undefined
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
        </NavigationContainer>
    );
}
