import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, TextInput, ScrollView, Alert } from 'react-native';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
    const navigation = useNavigation();
    const [cart, setCart] = useState([]);

    const addToCart = (item) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
            if (existingItem) {
                return prevCart.map(cartItem =>
                    cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
                );
            } else {
                return [...prevCart, { ...item, quantity: 1 }];
            }
        });
        Alert.alert("Success", `${item.name} added to cart!`);
    };

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + (parseFloat(item.price.replace("Rs.", "").replace(",", "")) * item.quantity), 0);
    };

    const categories = ['Dumbbells', 'Treadmills', 'Yoga Mats', 'Resistance Bands'];
    const featuredProducts = [
        { id: '1', name: 'Knee Wrap', image: require('../../assets/knee wrap.png'), price: 'Rs.1000.00' },
        { id: '2', name: 'Wrist Wrap', image: require('../../assets/wist wrap.png'), price: 'Rs.2500.00' },
        { id: '3', name: 'Mass Gainer', image: require('../../assets/mass gainer.png'), price: 'Rs.25000.00' },
        { id: '4', name: 'Gold Standard Whey Protein', image: require('../../assets/gold stand.png'), price: 'Rs.35500.00' },
        { id: '5', name: 'Dennis James Mass Gainer', image: require('../../assets/dennis james.png'), price: 'Rs.34500.00' }
    ];

    const stockItems = [
        { id: '6', name: 'Carnivor Mass Gainer', image: require('../../assets/carnivor mass.png'), price: 'Rs.30000.00' },
        { id: '7', name: 'C4 Pre-Workout', image: require('../../assets/C4 pre workout.png'), price: 'Rs.7500.00' },
        { id: '8', name: 'BCAA', image: require('../../assets/bcaa.png'), price: 'Rs.10500.00' },
        { id: '9', name: 'Whey Protein', image: require('../../assets/whey protein.png'), price: 'Rs.16800.00' }
    ];

    const newArrivals = [
        { id: '10', name: 'Protein Bars', image: require('../../assets/protein bar.png'), price: 'Rs.500.00' },
        { id: '11', name: 'Vitamins', image: require('../../assets/multivitamin.png'), price: 'Rs.11000.00' },
        { id: '12', name: 'Fish Oil', image: require('../../assets/fish oil.png'), price: 'Rs.13200.00' },
        { id: '13', name: 'Beef Protein', image: require('../../assets/beef protein.png'), price: 'Rs.23400.00' }
    ];

    const navigateToCart = () => {
        navigation.navigate('Cart', { cart });
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.searchContainer}>
                <TextInput style={styles.searchInput} placeholder="Search for fitness equipment..." placeholderTextColor="#bbb" />
            </View>

            <View style={styles.categoriesContainer}>
                <Text style={styles.sectionTitle}>Categories</Text>
                <FlatList horizontal data={categories} renderItem={({ item }) => (
                    <TouchableOpacity style={styles.categoryCard}>
                        <Text style={styles.categoryText}>{item}</Text>
                    </TouchableOpacity>
                )} keyExtractor={(item) => item} />
            </View>

            {[{ title: "Featured Products", data: featuredProducts }, { title: "Our Stock", data: stockItems }, { title: "New Arrivals", data: newArrivals }].map((section, index) => (
                <View key={index} style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>{section.title}</Text>
                    <FlatList horizontal data={section.data} renderItem={({ item }) => (
                        <View style={styles.productCard}>
                            <Image source={item.image} style={styles.productImage} />
                            <Text style={styles.productName}>{item.name}</Text>
                            <Text style={styles.productPrice}>{item.price}</Text>
                            <TouchableOpacity style={styles.addToCartButton} onPress={() => addToCart(item)}>
                                <Text style={styles.addToCartText}>Add to Cart</Text>
                            </TouchableOpacity>
                        </View>
                    )} keyExtractor={(item) => item.id} />
                </View>
            ))}

            <View style={styles.cartContainer}>
                <Text style={styles.sectionTitle}>Your Cart</Text>
                {cart.length > 0 ? (
                    <>
                        <FlatList data={cart} renderItem={({ item }) => (
                            <View style={styles.cartItem}>
                                <Text style={styles.cartItemText}>{item.name} x {item.quantity}</Text>
                                <Text style={styles.cartItemPrice}>Rs.{(parseFloat(item.price.replace("Rs.", "").replace(",", "")) * item.quantity).toFixed(2)}</Text>
                            </View>
                        )} keyExtractor={(item) => item.id} />
                        <Text style={styles.totalPrice}>Total: Rs.{calculateTotal().toFixed(2)}</Text>
                    </>
                ) : (
                    <Text style={styles.emptyCartText}>Your cart is empty</Text>
                )}
            </View>

            <View style={styles.promotionContainer}>
                <Text style={styles.promotionText}>Limited Time Offer! Get 10% off on your first purchase!</Text>
            </View>

            <TouchableOpacity style={styles.viewCartButton} onPress={navigateToCart}>
                <Text style={styles.viewCartText}>View Cart</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 10, backgroundColor: '#f7f7f7' },
    searchContainer: { marginBottom: 20 },
    searchInput: { height: 45, borderColor: '#e2e2e2', borderWidth: 1, borderRadius: 25, paddingLeft: 15, backgroundColor: '#fff', fontSize: 16 },
    sectionContainer: { marginBottom: 20 },
    sectionTitle: { fontSize: 20, fontWeight: '600', marginBottom: 10, color: '#333' },
    categoryCard: { backgroundColor: '#fff', paddingVertical: 12, paddingHorizontal: 18, marginRight: 15, borderRadius: 25, elevation: 5 },
    categoryText: { fontSize: 16, color: '#333', textAlign: 'center' },
    productCard: { width: 250, height: 350, backgroundColor: '#fff', marginRight: 15, borderRadius: 12, padding: 15, alignItems: 'center', justifyContent: 'center', elevation: 5 },
    productImage: { width: 180, height: 180, borderRadius: 12, resizeMode: 'contain' },
    productName: { fontSize: 16, fontWeight: '600', marginTop: 10, textAlign: 'center', color: '#333' },
    productPrice: { fontSize: 14, color: '#888', marginTop: 5 },
    addToCartButton: { marginTop: 10, backgroundColor: '#ff5722', paddingVertical: 8, paddingHorizontal: 20, borderRadius: 8 },
    addToCartText: { color: '#fff', fontSize: 16, fontWeight: '600' },
    cartContainer: { marginTop: 20, padding: 10, backgroundColor: '#fff', borderRadius: 12 },
    cartItem: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
    cartItemText: { fontSize: 16, fontWeight: '600', color: '#333' },
    cartItemPrice: { fontSize: 16, color: '#555' },
    totalPrice: { fontSize: 18, fontWeight: '700', color: '#000', marginTop: 10 },
    emptyCartText: { textAlign: 'center', fontSize: 16, color: '#888' },
    promotionContainer: { backgroundColor: '#ff5722', padding: 15, borderRadius: 12, marginTop: 30 },
    promotionText: { color: '#fff', textAlign: 'center', fontSize: 18, fontWeight: '600' },
    viewCartButton: { marginTop: 20, backgroundColor: '#ff5722', paddingVertical: 12, paddingHorizontal: 30, borderRadius: 8, alignItems: 'center' },
    viewCartText: { color: '#fff', fontSize: 18, fontWeight: '600' },
});

export default HomeScreen;
