// const {fetch} = require("node-fetch");
const { CLIENT_ID, APP_SECRET } = process.env;

const base = "https://api-m.sandbox.paypal.com";

async function handleResponse(response) {
    if (response.status === 200 || response.status === 201) {
        return response.json();
    }
    
    const errorMessage = await response.text();
    throw new Error(errorMessage);
};

async function generateAccessToken () {
    const auth = Buffer.from(CLIENT_ID + ":" + APP_SECRET).toString("base64");
    const response = await fetch(`${base}/v1/oauth2/token`, {
        method: "post",
        body: "grant_type=client_credentials",
        headers: {
        Authorization: `Basic ${auth}`,
        },
    });
    
    const jsonData = await handleResponse(response);
    return jsonData.access_token;
};

const paypal = {
    createOrder: async (data) => { 
        const accessToken = await generateAccessToken();
        const url = `${base}/v2/checkout/orders`;
        const response = await fetch(url, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
                intent: "CAPTURE",
                purchase_units: [
                {
                    amount: {
                    currency_code: "USD",
                    value: data.product.cost,
                    },
                },
                ],
            }),
        })
  
        const temp = await response.json();
    
        return temp;
    },
    capturePayment: async (orderId) => {
        const accessToken = await generateAccessToken();
        const url = `${base}/v2/checkout/orders/${orderId}/capture`;
        const response = await fetch(url, {
            method: "post",
            headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
            },
        });
        
        return handleResponse(response);
    },
};

module.exports = paypal;

 



