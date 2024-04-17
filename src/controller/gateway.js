const https = require('https');
const dotenv = require ('dotenv').config()
const { Client, Environment, ApiError } = require("square");

// Initialize the client
const client = new Client({
    environment: Environment.Sandbox,
    bearerAuthCredentials: {
        accessToken: process.env.SQUARE_ACCESS_TOKEN
    },
});

const { paymentsApi } = client;

async function paymentGateWay(amount, currency, buyerEmail) {
    try {
        // Create payment request
        const response = await paymentsApi.createPayment({
        sourceId: 'cnon:card-nonce-ok',
        idempotencyKey: '57d34b73-ddda-431e-86e5-695d69cb9d57',
        amountMoney: {
            amount: amount,
            currency: currency
        },
        acceptPartialAuthorization: false,
        buyerEmailAddress: buyerEmail
        });

        console.log("Payment Successful:", response.result);
        return response.result;     
        
    } catch (error) {
        if (error instanceof ApiError) {
        console.error("API Error:", error.errors);
        } else {
        console.error("Unexpected error occurred:", error);
        }
    }
}

module.exports = { paymentGateWay }
