import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const Payment = ({ route, navigation }) => {
    const { totalAmount } = route.params;
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');

    const handlePaymentSubmit = () => {
        if (!cardNumber || !expiryDate || !cvv) {
            Alert.alert("Incomplete Details", "Please enter all payment details.");
            return;
        }

        // Simulate Payment Processing
        Alert.alert("Payment Successful", `You have been charged Rs.${totalAmount}`);

        // Redirect to Home or Order Confirmation Screen
        navigation.navigate('Cart', { cart: [] }); // Empty the cart
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>💳 Payment</Text>
            <Text style={styles.amountText}>Total Amount: Rs.{totalAmount}</Text>

            <TextInput
                style={styles.input}
                placeholder="Card Number"
                keyboardType="numeric"
                maxLength={16}
                value={cardNumber}
                onChangeText={setCardNumber}
            />
            <TextInput
                style={styles.input}
                placeholder="Expiry Date (MM/YY)"
                keyboardType="numeric"
                maxLength={5}
                value={expiryDate}
                onChangeText={setExpiryDate}
            />
            <TextInput
                style={styles.input}
                placeholder="CVV"
                keyboardType="numeric"
                maxLength={3}
                secureTextEntry
                value={cvv}
                onChangeText={setCvv}
            />

            <TouchableOpacity style={styles.payButton} onPress={handlePaymentSubmit}>
                <Text style={styles.payButtonText}>Confirm Payment</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f7f7f7', padding: 20 },
    title: { fontSize: 24, fontWeight: '700', marginBottom: 10, color: '#222' },
    amountText: { fontSize: 18, fontWeight: '600', marginBottom: 20, color: '#444' },
    input: { width: '90%', padding: 10, marginBottom: 15, backgroundColor: '#fff', borderRadius: 8, elevation: 2 },
    payButton: { backgroundColor: '#28a745', paddingVertical: 12, borderRadius: 10, alignItems: 'center', width: '90%' },
    payButtonText: { fontSize: 18, fontWeight: '700', color: '#fff' },
});

export default Payment;
