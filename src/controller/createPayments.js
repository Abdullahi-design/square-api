
const { paymentGateWay } = require  ("./gateway");

function createPayments(req, res) {
    let { amount, currency, buyerEmail } = req.body;
    if (!amount) {
        res.status(401).json({
            message: "Enter a valid amount",        
        });
        return;
    }

    if (req.method === 'POST') {
        paymentGateWay(amount, currency, buyerEmail).then(clientPayment => {
            
            // Convert BigInt to string for serialization
            const serializedPayment = JSON.parse(JSON.stringify(clientPayment, (_, v) =>
                typeof v === 'bigint' ? v.toString() : v));
            res.status(200).json({
                message: "Payment Completed",
                clientPayment: serializedPayment,
            });
        }).catch(error => {
            res.status(500).json({
                message: "Failed to process payment",
                error: error.message,
            });
        });
    }
}

module.exports = { createPayments }