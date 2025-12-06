import React from 'react';
//import { loadStripe } from '@stripe/stripe-js';
import './App.css'; // Assuming you have a default App.css

// Load your Stripe public key from the environment variables
//const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

function App() {
  const handlePurchase = async () => {
    // This Price ID must match the one used in your Netlify function for validation
   const priceId = process.env.REACT_APP_PDF_PRICE_ID;
    console.log(priceId);

    // 1. Call your Netlify serverless function
    const response = await fetch('.netlify/functions/create-checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // Pass the Price ID to the function to confirm which product is being bought
      body: JSON.stringify({ priceId: priceId }),
    });
    
    const data = await response.json();
    console.log(data)

    if (response.ok) {
      window.location.href = data.url;
    } else {
      //console.error('Function error:', session.error);
      //alert(`Could not initiate payment: ${session.error}`);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Exclusive PDF Download</h1>
        <p>Get instant access to our premium digital guide!</p>
        
        {/* Replace with your actual product details */}
        <div className="product-card">
            <h2>The Essential Guide to Everything</h2>
            <p>Price: $9.99</p>
            
            {/* 

[Image of PDF digital download icon]
 */}
            
            <button 
              className="purchase-button" 
              onClick={handlePurchase} 
              disabled={!process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}
            >
              Buy Now
            </button>
            {!process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY && (
              <p style={{ color: 'red' }}>Stripe Public Key is missing. Check your .env file.</p>
            )}
        </div>
      </header>
    </div>
  );
}

export default App;