
# Read from Archieved shi on chat gpt
# Razorpay Transaction Flow in Next.js

This document explains the **full technical flow** of how a Razorpay transaction works in your Next.js application, including **fetch calls, handlers, and backend communication**.

---

## **1. User Initiates Payment**
- The user clicks a **Donate / Pay** button in your `PaymentPage.js`.
- This triggers a **`fetch` POST request** to your **Next.js API route** (`/api/auth/razorpay`).
- Purpose: Tell the server **how much to charge** and create an **Order** in Razorpay.

---

## **2. Backend Creates Razorpay Order**
- The **Next.js API route** (`/api/auth/razorpay/page.js`) runs on the **server**.
- Inside this route:
  - Your Razorpay API key/secret is used to **call Razorpay's Orders API**.
  - Razorpay returns an **Order ID** (e.g., `order_9A33XWu170gUtm`).
  - Response includes:
    ```json
    {
      "id": "order_123456",
      "amount": 50000,
      "currency": "INR",
      "status": "created"
    }
    ```
- This response is sent back to the frontend.

---

## **3. Frontend Opens Razorpay Checkout**
- The frontend receives the **Order ID**.
- Razorpay's **Checkout.js script** is used to open the payment modal.
- You pass:
  - `key`: Your public Razorpay key.
  - `amount`, `currency`: From server response.
  - `order_id`: From server response.
  - `handler`: A callback function triggered **after payment success**.

Example:
```javascript
handler: async function (response) {
    // Payment successful, now verify
    const verifyRes = await fetch('/api/auth/razorpay/verify', {
        method: 'POST',
        body: JSON.stringify(response)
    });
}



sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    participant Razorpay

    User->>Frontend: Clicks Pay button
    Frontend->>Backend: POST /api/auth/razorpay (amount, currency)
    Backend->>Razorpay: Create Order API call
    Razorpay-->>Backend: Returns order_id
    Backend-->>Frontend: Sends order_id
    Frontend->>Razorpay: Open Checkout with order_id
    Razorpay-->>User: Payment UI
    User->>Razorpay: Enters details & pays
    Razorpay-->>Frontend: Calls handler() with payment info
    Frontend->>Backend: POST /verify with payment details
    Backend->>Razorpay: Verify signature
    Backend->>Database: Set done=true if verified
    Backend-->>Frontend: Payment success response
