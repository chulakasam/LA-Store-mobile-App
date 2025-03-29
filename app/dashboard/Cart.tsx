import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const Cart = ({ route, navigation }) => {
    const { cart } = route.params;

    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + (parseFloat(item.price.replace("Rs.", "").replace(",", "")) * item.quantity), 0);
    };

    const handlePayment = () => {
        if (cart.length === 0) {
            Alert.alert("Your cart is empty!", "Please add items before proceeding.");
            return;
        }

        // Navigate to Payment Screen and pass total amount
        navigation.navigate('Payment', { totalAmount: calculateTotal().toFixed(2) });
    };

    return (
        <View style={styles.container}>
            <View style={styles.dateTimeContainer}>
                <Text style={styles.dateText}>🗓 {currentDate}</Text>
                <Text style={styles.timeText}>⏰ {currentTime}</Text>
            </View>

            <Text style={styles.sectionTitle}>🛒 Your Cart</Text>

            {cart.length > 0 ? (
                <>
                    <FlatList
                        data={cart}
                        renderItem={({ item }) => (
                            <View style={styles.cartItem}>
                                <Text style={styles.cartItemText}>{item.name} x {item.quantity}</Text>
                                <Text style={styles.cartItemPrice}>Rs.{(parseFloat(item.price.replace("Rs.", "").replace(",", "")) * item.quantity).toFixed(2)}</Text>
                            </View>
                        )}
                        keyExtractor={(item) => item.id}
                    />
                    <Text style={styles.totalPrice}>Total: Rs.{calculateTotal().toFixed(2)}</Text>

                    <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
                        <Text style={styles.payButtonText}>💳 Pay Now</Text>
                    </TouchableOpacity>
                </>
            ) : (
                <View style={styles.emptyCartContainer}>
                    <Text style={styles.emptyCartText}>🛍 Your cart is empty</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#e0f7fa', justifyContent: 'center' },
    dateTimeContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, paddingHorizontal: 10 },
    dateText: { fontSize: 16, fontWeight: '600', color: '#555' },
    timeText: { fontSize: 16, fontWeight: '600', color: '#555' },
    sectionTitle: { fontSize: 26, fontWeight: '700', marginBottom: 15, color: '#222', textAlign: 'center' },
    cartItem: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15, padding: 15, backgroundColor: '#fff', borderRadius: 12, shadowOpacity: 0.1, shadowRadius: 6, elevation: 4 },
    cartItemText: { fontSize: 18, fontWeight: '600', color: '#333' },
    cartItemPrice: { fontSize: 16, fontWeight: '500', color: '#666' },
    totalPrice: { fontSize: 22, fontWeight: '700', color: '#000', marginTop: 20, textAlign: 'center', paddingVertical: 10, backgroundColor: '#ffcc00', borderRadius: 10 },
    emptyCartContainer: { justifyContent: 'center', alignItems: 'center', marginTop: 50 },
    emptyCartText: { fontSize: 20, fontWeight: '600', color: '#888' },
    payButton: { backgroundColor: '#28a745', paddingVertical: 12, borderRadius: 10, marginTop: 20, alignItems: 'center', elevation: 4 },
    payButtonText: { fontSize: 18, fontWeight: '700', color: '#fff' },
});


export default Cart;