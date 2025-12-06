import React from 'react';
//import { loadStripe } from '@stripe/stripe-js';
import './App.css'; // Assuming you have a default App.css
import MultimangoMarketingInfo from './components/marketingc/MultimangoMarketingInfo';

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
        <h1 style={{ margin: 0, padding: 0 }}>Multimango Begginners Guide PDF</h1>
        <h2 style={{ margin: 0, padding: 0 }}>Exclusive PDF Download</h2>
        <p style={{ padding: 0 }}>Get instant access to our premium digital guide!</p>
        <script async
  src="https://js.stripe.com/v3/buy-button.js">
</script>

<stripe-buy-button
  buy-button-id="buy_btn_1SbAqS1jrXLjDwD5Bhr9ExvT"
  publishable-key="pk_live_51S1pGm1jrXLjDwD5SpGd6HK6z7RRbM3kO2C9V5YsnaSDs0prhJPXcncBqtSWLam7rWksxUUiexnftH2KZChHu7Q600yMMP3QbO"
>
</stripe-buy-button>
        <MultimangoMarketingInfo />
        <script async
  src="https://js.stripe.com/v3/buy-button.js">
</script>


        
        {/* Replace with your actual product details */}
      
      </header>
    </div>
  );
}

export default App;