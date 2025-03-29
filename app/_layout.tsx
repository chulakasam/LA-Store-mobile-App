import { Stack } from 'expo-router';
import { store } from '../store/store';
import { Provider } from 'react-redux';
import Home from './dashboard/Home';
import CartScreen from "./dashboard/Cart";

export default function RootLayout() {
    return (
        <Provider store={store}>
            <Stack>
                {/* Use the layout without passing `component` */}
                <Stack.Screen name='index' options={{ headerShown: false }} />
                <Stack.Screen name="dashboard/Home" options={{ title: 'Home' }} />
                <Stack.Screen name="dashboard/Cart" options={{ title: 'Your Cart' }} />
            </Stack>
        </Provider>
    );
}
