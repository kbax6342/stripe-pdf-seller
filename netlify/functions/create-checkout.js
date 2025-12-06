// netlify/functions/create-checkout.js

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// The base URL of your deployed site
const siteUrl = process.env.URL || 'http://localhost:8888';
console.log(siteUrl)

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { priceId } = JSON.parse(event.body);
    const serverPriceId = process.env.REACT_APP_PDF_PRICE_ID;

    // 💡 ADD THESE DEBUG LOGS
    console.log('--- Price ID Debug ---');
    console.log('ID from Client (priceId):', priceId);
    console.log('ID from Server ENV (process.env.PDF_PRICE_ID):', process.env.PDF_PRICE_ID);
    console.log('Match Status:', priceId === process.env.PDF_PRICE_ID);
    console.log('--- End Debug ---');
    // 💡 OPTIONAL: Trim the ID to remove any whitespace issues
    // const trimmedPriceId = priceId.trim();

    if (priceId !== process.env.REACT_APP_PDF_PRICE_ID) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Invalid price ID.' }),
        };
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: serverPriceId,
          quantity: 1,
          tax_rates: [], // Ensure no tax rates are applied
      adjustable_quantity: {
        enabled: false,
      }
        },
      ],
      mode: 'payment',
      // The customer will be redirected here after successful payment
      success_url: `${siteUrl}/success.html?session_id={CHECKOUT_SESSION_ID}`,
      // The customer will be redirected here if they cancel checkout
      cancel_url: `${siteUrl}/`, 
      // Replace with your Stripe Product ID for digital goods fulfillment
      metadata: {
        product_type: 'digital_download_pdf',
        // You can add logic here to identify the user if you have an auth system
      }
    });

    console.log(session.url)

    return {
      statusCode: 200,
      body: JSON.stringify({ url: session.url, text: "This is a string" }),
    };
  } catch (error) {
    console.error('Stripe error:', error);
    console.error('Stripe Live Mode Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to create Stripe Checkout session.' }),
    };
  }
};