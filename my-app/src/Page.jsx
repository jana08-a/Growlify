import React, { useState, useEffect, useMemo } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// SVG Icons (unchanged)
const LeafIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M11 20A7 7 0 0 1 4 13V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 0 0 1 2 2v5a7 7 0 0 1-7 7h-1z" />
    <path d="M9 16s1.5-2 4-2 4 2 4 2" />
    <path d="M12 11v5" />
  </svg>
);

const ShoppingCartIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);

const PlusIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const Trash2Icon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M3 6h18" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 0 0 1-2-2V6m3 0V4a2 0 0 1 2-2h4a2 0 0 1 2 2v2" />
    <line x1="10" y1="11" x2="10" y2="17" />
    <line x1="14" y1="11" x2="14" y2="17" />
  </svg>
);

const ArrowLeftIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

const CheckCircleIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#28a745" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-8.83" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const XCircleIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#dc3545" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="10" />
    <line x1="15" y1="9" x2="9" y2="15" />
    <line x1="9" y1="9" x2="15" y2="15" />
  </svg>
);

// Mock product data (unchanged)
export const products = [
  { id: 1, name: 'Tomato Plant', price: 99.00, image: './p2.jpg', type: 'Edible Vegetable Plant', details: '🌱 Organic starter in nursery pot, perfect for home gardening beginners.', bestSeller: true },
  {
    id: 2,
    name: 'Rose Plant',
    price: 149.00,
    image: './p3.jpg',
    type: 'Flowering Plant',
    details: '🌸 Available in red, pink, yellow',
    bestSeller: true,
    colors: ['Red', 'Pink', 'Yellow', 'White'],
    colorImages: { Red: './p3.jpg', Pink: './p5.jpg', Yellow: './p7.jpg', White: './p6.jpg' }
  },
  { id: 3, name: 'Hibiscus Plant', price: 129.00, image: './p8.jpg', type: 'Outdoor Flowering', details: '🌼 Daily blooming, pest resistant, thrives in full sun with vibrant colors.' },
  { id: 4, name: 'Strawberry Plant', price: 149.00, image: './p10.jpg', type: 'Fruit Plant', details: '🍓 Grows well in pots, balcony-friendly, yields sweet and juicy strawberries.', bestSeller: true },
  { id: 5, name: 'Money Plant', price: 79.00, image: './p9.jpg', type: 'Indoor Air Purifier', details: '🌿 Grows in water/soil', bestSeller: true },
  { id: 6, name: 'Snake Plant', price: 199.00, image: './p11.jpg', type: 'Indoor Air Purifying', details: '🌬️ NASA approved oxygen booster' },
  { id: 7, name: 'Peace Lily', price: 189.00, image: './p12.jpg', type: 'Indoor Flowering', details: '🌸 Low light flowering plant' },
  { id: 8, name: 'Spider Plant', price: 119.00, image: './p13.png', type: 'Indoor Hanging', details: '🪴 Great for pet-friendly homes' },
  { id: 9, name: 'Vermicompost', price: 99.00, image: './p16.png', type: 'Organic Soil Enricher', details: '🌿 Improves root growth and soil health', bestSeller: true },
  { id: 10, name: 'Neem Cake Fertilizer', price: 89.00, image: './p17.jpg', type: 'Dual-purpose Pest Control + Fertilizer', details: '🐛 Natural insect deterrent' },
  { id: 11, name: 'Seaweed Extract / Liquid Seaweed', price: 199.00, image: './p18.png', type: 'Liquid Plant Tonic', details: '🌱 Stimulates flowering and immunity' },
  { id: 12, name: 'Bone Meal', price: 149.00, image: './p19.png', type: '🌼 Ideal for flowering plants' },
  { id: 13, name: 'Panchagavya', price: 179.00, image: './p21.png', type: 'Traditional Bio-Fertilizer', details: '🧪 Made from cow-based natural inputs' },
  { id: 14, name: 'Ceramic Duo Planter ', price: 499.00, image: './p20.png', type: 'Premium Indoor Pot (Holds 2 Plants)', details: '🎍 Ceramic + Bamboo Tray', bestSeller: true },
  { id: 15, name: 'GardenStretch 3-in-1 Grow Trough', price: 799.00, image: './p22.png', type: 'Rectangular Outdoor Planter', details: '🌿 Holds up to 3 medium plants' },
  { id: 16, name: 'Growlify – Smart Irrigation System (Auto Water)', price: 'Coming Soon', image: './p14.jpg', type: 'IoT-Based Auto Watering System', details: '🔄 Sensors + Scheduled Watering', comingSoon: true },
];

// Product Card Component (unchanged)
const ProductCard = ({ product, onAddToCart }) => {
  const [selectedOption, setSelectedOption] = useState(product.colors ? product.colors[0] : null);

  const handleAddToCartClick = () => {
    onAddToCart(product, selectedOption);
  };

  return (
    <div className="card shadow-sm h-100 position-relative overflow-hidden">
      {product.bestSeller && (
        <span className="best-seller badge position-absolute top-0 end-0 m-2 text-white shadow" style={{ zIndex: 10 }}>
          Best Seller
        </span>
      )}
      <img
        src={product.colorImages?.[selectedOption] || product.image}
        className="card-img-top"
        alt={product.name}
        style={{ height: '180px', objectFit: 'cover' }}
      />
      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <h5 className="card-title text-dark flex-grow-1">{product.name}</h5>
          {!product.comingSoon && (
            <p className="card-text text-success fw-bold">₹{product.price.toFixed(2)}</p>
          )}
        </div>
        <p className="card-text text-muted small mb-1">{product.type}</p>
        <p className="product-description">{product.details}</p>
        {product.colors && (
          <div className="mb-3">
            <label htmlFor={`color-select-${product.id}`} className="form-label small text-dark">Select Color:</label>
            <select
              id={`color-select-${product.id}`}
              className="form-select form-select-sm rounded-pill border-success shadow-sm"
              style={{ backgroundColor: '#f0fdf4', borderColor: '#28a745', color: '#1b5e20', fontWeight: '500' }}
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
            >
              {product.colors.map(color => (
                <option key={color} value={color}>{color}</option>
              ))}
            </select>
          </div>
        )}
        {product.comingSoon ? (
            <button className="coming-soon mt-auto d-flex align-items-center justify-content-center gap-2 w-100 py-2">
                Coming Soon
            </button>
        ) : (
          <button
            onClick={handleAddToCartClick}
            className="main-action-button add-to-cart-button mt-auto d-flex align-items-center justify-content-center gap-2"
          >
            <PlusIcon style={{ width: '1.25em', height: '1.25em' }} />
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

// Payment Success Animation Component (unchanged)
const PaymentSuccessAnimation = ({ onHideAnimation }) => {
  useEffect(() => {
    const timer = setTimeout(() => onHideAnimation(), 3000);
    return () => clearTimeout(timer);
  }, [onHideAnimation]);

  return (
    <div className="payment-overlay">
      <div className="payment-card">
        <CheckCircleIcon className="payment-icon success-icon" />
        <h3 className="mt-3 mb-2 text-dark">Payment Successful!</h3>
        <p className="text-muted text-center">Your order has been confirmed and an email receipt has been sent.</p>
        <button onClick={onHideAnimation} className="btn btn-success mt-4">
          Continue Shopping
        </button>
      </div>
      <style jsx="true">{`
        .payment-overlay {
          position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
          background-color: rgba(0, 0, 0, 0.6); display: flex;
          justify-content: center; align-items: center; z-index: 2000;
          backdrop-filter: blur(5px); animation: fadeIn 0.3s ease-out;
        }
        .payment-card {
          background-color: #fff; padding: 40px; border-radius: 15px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2); text-align: center;
          max-width: 400px; transform: translateY(20px);
          animation: slideIn 0.4s ease-out forwards; display: flex;
          flex-direction: column; align-items: center;
        }
        .payment-icon {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
        }
        .success-icon {
          animation: drawCheckmark 0.8s ease-out forwards, pulseGreen 1.5s infinite alternate;
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideIn { from { opacity: 0; transform: translateY(50px) scale(0.9); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes drawCheckmark { to { stroke-dashoffset: 0; } }
        @keyframes pulseGreen { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
      `}</style>
    </div>
  );
};

// Payment Failure Animation Component (unchanged)
const PaymentFailureAnimation = ({ onHideAnimation }) => {
  useEffect(() => {
    const timer = setTimeout(() => onHideAnimation(), 4000);
    return () => clearTimeout(timer);
  }, [onHideAnimation]);

  return (
    <div className="payment-overlay">
      <div className="payment-card">
        <XCircleIcon className="payment-icon failure-icon" />
        <h3 className="mt-3 mb-2 text-dark">Payment Failed!</h3>
        <p className="text-muted text-center">Something went wrong. Please check your details and try again.</p>
        <button onClick={onHideAnimation} className="btn btn-danger mt-4">
          Try Again
        </button>
      </div>
      <style jsx="true">{`
        .payment-overlay {
          position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
          background-color: rgba(0, 0, 0, 0.6); display: flex;
          justify-content: center; align-items: center; z-index: 2000;
          backdrop-filter: blur(5px); animation: fadeIn 0.3s ease-out;
        }
        .payment-card {
          background-color: #fff; padding: 40px; border-radius: 15px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2); text-align: center;
          max-width: 400px; transform: translateY(20px);
          animation: slideIn 0.4s ease-out forwards; display: flex;
          flex-direction: column; align-items: center;
        }
        .payment-icon {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
        }
        .failure-icon {
          animation: drawX 0.8s ease-out forwards, pulseRed 1.5s infinite alternate;
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideIn { from { opacity: 0; transform: translateY(50px) scale(0.9); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes drawX {
          0% { stroke-dashoffset: 1000; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes pulseRed {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
      `}</style>
    </div>
  );
};

// Checkout Form Component (MODIFIED)
const CheckoutForm = ({ onBackToCart, cartData, onCloseCart, onPaymentSuccess, onPaymentFailure }) => {
  const [formData, setFormData] = useState({ fullName: '', email: '', phone: '', address: '', area: '', city: '', state: '', pincode: '' });
  const [errors, setErrors] = useState({});
  const [isProcessingOrder, setIsProcessingOrder] = useState(false);
  const [paymentHandled, setPaymentHandled] = useState(false); // New state to track if payment was explicitly handled

  useEffect(() => {
    setErrors(prev => ({ ...prev, pincode: undefined, city: undefined, state: undefined }));
    if (formData.pincode.length === 6) {
      fetch(`https://api.postalpincode.in/pincode/${formData.pincode}`)
        .then(res => res.json())
        .then(data => {
          if (data[0].Status === 'Success' && data[0].PostOffice?.length > 0) {
            const postOffice = data[0].PostOffice[0];
            setFormData(prev => ({ ...prev, city: postOffice.District, state: postOffice.State }));
          } else {
            setFormData(prev => ({ ...prev, city: '', state: '' }));
            setErrors(prev => ({ ...prev, pincode: 'Invalid Pincode.' }));
          }
        })
        .catch(() => setErrors(prev => ({ ...prev, pincode: 'Failed to fetch Pincode details.' })));
    } else if (formData.pincode.length > 0) {
        setErrors(prev => ({ ...prev, pincode: 'Pincode must be 6 digits.' }));
        setFormData(prev => ({ ...prev, city: '', state: '' }));
    }
  }, [formData.pincode]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    if (errors[id]) setErrors(prev => ({ ...prev, [id]: undefined }));
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required.';
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'A valid email is required.';
    if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Phone number must be 10 digits.';
    if (!formData.address.trim()) newErrors.address = 'Address is required.';
    if (!formData.area.trim()) newErrors.area = 'Area is required.';
    if (!/^\d{6}$/.test(formData.pincode)) newErrors.pincode = 'Pincode must be 6 digits.';
    if (!formData.city.trim()) newErrors.city = 'City is required (auto-filled from Pincode).';
    if (!formData.state.trim()) newErrors.state = 'State is required (auto-filled from Pincode).';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = async () => {
    if (!validateForm()) return;
    setIsProcessingOrder(true);
    setPaymentHandled(false); // Reset the flag before opening Razorpay
    const totalAmount = cartData.reduce((sum, item) => item.comingSoon ? sum : sum + item.price * item.quantity, 0);
    const amountInPaise = Math.round(totalAmount * 100);

    try {
      const orderResponse = await fetch("http://localhost:5000/api/shop/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: amountInPaise }),
      });
      const orderData = await orderResponse.json();
      if (!orderData.orderId) throw new Error("Failed to create order.");

      const options = {
        key: "rzp_test_PPZSpcfj6SfJPt",
        amount: orderData.amount,
        currency: "INR",
        name: "Growlify Gardening",
        description: "Plant Order Payment",
        order_id: orderData.orderId,
        prefill: { name: formData.fullName, email: formData.email, contact: formData.phone },
        theme: { color: "#1e7e34" },
        handler: async (response) => {
          setPaymentHandled(true); // Payment successful, set flag
          try {
            await fetch("http://localhost:5000/api/shop/send-confirmation", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ formData, cart: cartData, paymentResponse: response }),
            });
            onPaymentSuccess();
          } catch (emailError) {
            console.error("Error sending confirmation email:", emailError);
            alert("Payment successful, but failed to send confirmation email.");
          } finally {
            setIsProcessingOrder(false);
            onCloseCart();
          }
        },
      };
      
      const rzp = new window.Razorpay(options);

      // Handle explicit payment failure (e.g., declined card)
      rzp.on("payment.failed", (response) => {
        setPaymentHandled(true); // Payment failed, set flag
        console.error("Payment failed details:", response.error);
        onPaymentFailure();
        setIsProcessingOrder(false);
      });

      // Handle user closing the modal without success or explicit failure
      rzp.on('close', () => {
        if (!paymentHandled) { // If payment wasn't explicitly handled by success or failure events
          console.log("Razorpay modal closed without a clear success or failure event.");
          onPaymentFailure(); // Trigger failure animation
        }
        setIsProcessingOrder(false);
      });

      rzp.open();

    } catch (error) {
      console.error("Payment initiation failed:", error);
      alert("Failed to initiate payment. Please try again.");
      setIsProcessingOrder(false);
      onPaymentFailure(); // Show failure animation if even initiation fails
    }
  };

  return (
    <div className="p-4 d-flex flex-column" style={{ maxHeight: '100vh', overflowY: 'auto' }}>
      <div className="flex-shrink-0">
        <button onClick={onBackToCart} className="btn btn-link text-dark d-flex align-items-center gap-2 mb-4 p-0 text-decoration-none">
          <ArrowLeftIcon style={{ width: '1.25em', height: '1.25em' }} />
          Back to Cart
        </button>
        <h3 className="mb-4 text-dark">Checkout</h3>
      </div>
      <form onSubmit={(e) => e.preventDefault()} className="flex-grow-1" style={{ maxWidth: '600px', margin: 'auto', padding: '1.5rem', background: '#fffef3', borderRadius: '16px', boxShadow: '0 0 10px rgba(0,0,0,0.05)', maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
        <h4 className="mb-3 text-secondary">Shipping Address</h4>
        <div className="mb-3">
          <label htmlFor="fullName">Full Name</label>
          <input type="text" id="fullName" value={formData.fullName} onChange={handleChange} placeholder="Enter your name" className={`form-control ${errors.fullName ? 'is-invalid' : ''}`} required />
          {errors.fullName && <div className="invalid-feedback">{errors.fullName}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" className={`form-control ${errors.email ? 'is-invalid' : ''}`} required />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="phone">Phone Number</label>
          <input type="tel" id="phone" value={formData.phone} onChange={handleChange} placeholder="Enter your phone number" maxLength={10} className={`form-control ${errors.phone ? 'is-invalid' : ''}`} required />
          {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="address">Plot No. / Address</label>
          <input type="text" id="address" value={formData.address} onChange={handleChange} placeholder="Enter your address" className={`form-control ${errors.address ? 'is-invalid' : ''}`} required />
          {errors.address && <div className="invalid-feedback">{errors.address}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="area">Area</label>
          <input type="text" id="area" value={formData.area} onChange={handleChange} placeholder="Enter your area" className={`form-control ${errors.area ? 'is-invalid' : ''}`} required />
          {errors.area && <div className="invalid-feedback">{errors.area}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="pincode">Pincode</label>
          <input type="text" id="pincode" value={formData.pincode} onChange={handleChange} placeholder="Enter pincode" maxLength={6} className={`form-control ${errors.pincode ? 'is-invalid' : ''}`} required />
          {errors.pincode && <div className="invalid-feedback">{errors.pincode}</div>}
        </div>
        <div className="row g-3">
          <div className="col-md-6">
            <label htmlFor="city">City</label>
            <input type="text" id="city" value={formData.city} onChange={handleChange} placeholder="City" readOnly className={`form-control ${errors.city ? 'is-invalid' : ''}`} required />
            {errors.city && <div className="invalid-feedback">{errors.city}</div>}
          </div>
          <div className="col-md-6">
            <label htmlFor="state">State</label>
            <input type="text" id="state" value={formData.state} onChange={handleChange} placeholder="State" readOnly className={`form-control ${errors.state ? 'is-invalid' : ''}`} required />
            {errors.state && <div className="invalid-feedback">{errors.state}</div>}
          </div>
        </div>
      </form>
      <div className="flex-shrink-0 mt-4">
        <button className="main-action-button w-100 py-3" onClick={handlePlaceOrder} disabled={isProcessingOrder}>
          {isProcessingOrder ? (
            <><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span><span className="ms-2">Processing...</span></>
          ) : 'Place Order Now'}
        </button>
      </div>
    </div>
  );
};

// Cart Sidebar Component (unchanged logic, prop passing adjusted)
const CartSidebar = ({ isOpen, onClose, cart, onRemoveFromCart, onUpdateQuantity, onClearCart, onPaymentSuccess, onPaymentFailure }) => {
  const [view, setView] = useState('cart');
  const total = useMemo(() => cart.reduce((sum, item) => (item.comingSoon ? sum : sum + item.price * item.quantity), 0), [cart]);

  const handleCheckout = () => setView('checkout');
  const handleBackToCart = () => setView('cart');

  useEffect(() => {
    if (!isOpen) setTimeout(() => setView('cart'), 300);
  }, [isOpen]);

  return (
    <>
      <div className={`offcanvas-backdrop fade ${isOpen ? 'show' : ''}`} style={{ display: isOpen ? 'block' : 'none' }} onClick={onClose}></div>
      <div className={`offcanvas offcanvas-end ${isOpen ? 'show' : ''}`} tabIndex="-1" id="cartOffcanvas" style={{ visibility: isOpen ? 'visible' : 'hidden', width: '100%', maxWidth: '450px', backgroundColor: '#F5F5DC' }}>
        <div className="offcanvas-header pb-0 border-bottom">
          {view === 'cart' && (
            <>
              <h5 className="offcanvas-title text-dark" id="cartOffcanvasLabel">My Cart ({cart.length})</h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </>
          )}
        </div>
        <div className="offcanvas-body d-flex flex-column p-0">
            {view === 'cart' ? (
                <>
                    {cart.length === 0 ? (
                        <div className="d-flex flex-column align-items-center justify-content-center h-100 text-center p-4">
                            <p className="text-secondary fs-5">Your cart is empty.</p>
                            <button onClick={onClose} className="btn btn-link text-success text-decoration-underline mt-3">Start Shopping</button>
                        </div>
                    ) : (
                        <div className="flex-grow-1 overflow-auto p-4">
                            {cart.map(item => (
                                <div key={`${item.id}-${item.selectedOption || ''}`} className="d-flex align-items-center gap-3 mb-3 pb-3 border-bottom">
                                    <img src={item.image} className="rounded" alt={item.name} style={{ width: '64px', height: '64px', objectFit: 'cover' }} />
                                    <div className="flex-grow-1">
                                        <p className="fw-bold mb-1 text-dark">{item.name}{item.selectedOption && ` (${item.selectedOption})`}</p>
                                        {!item.comingSoon ? (
                                            <div className="d-flex align-items-center gap-2">
                                                <button className="btn btn-outline-secondary btn-sm" onClick={() => onUpdateQuantity(item.id, item.quantity - 1, item.selectedOption)} disabled={item.quantity <= 1}>-</button>
                                                <span>{item.quantity}</span>
                                                <button className="btn btn-outline-secondary btn-sm" onClick={() => onUpdateQuantity(item.id, item.quantity + 1, item.selectedOption)}>+</button>
                                                <span className="text-sm text-muted ms-auto">₹{(item.price * item.quantity).toFixed(2)}</span>
                                            </div>
                                        ) : <p className="fw-bold text-info mb-0">Coming Soon</p>}
                                    </div>
                                    <button onClick={() => onRemoveFromCart(item.id, item.selectedOption)} className="btn btn-outline-danger btn-sm border-0 p-1"><Trash2Icon /></button>
                                </div>
                            ))}
                        </div>
                    )}
                    {cart.some(item => !item.comingSoon) && (
                        <div className="p-4 border-top">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <p className="h5 text-dark">Total</p>
                                <p className="h4 fw-bold text-dark">₹{total.toFixed(2)}</p>
                            </div>
                            <button onClick={handleCheckout} className="main-action-button w-100 py-3">Proceed to Checkout</button>
                        </div>
                    )}
                </>
            ) : (
                <CheckoutForm onBackToCart={handleBackToCart} cartData={cart} onCloseCart={() => { onClose(); onClearCart(); }} onPaymentSuccess={onPaymentSuccess} onPaymentFailure={onPaymentFailure} />
            )}
        </div>
      </div>
    </>
  );
};

// Main Page Component (unchanged)
export default function Page() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
  const [showPaymentFailure, setShowPaymentFailure] = useState(false);

  const handleAddToCart = (product, selectedOption = null) => {
    if (product.comingSoon) return;
    setCart(prevCart => {
      const cartItemId = `${product.id}-${selectedOption || ''}`;
      const existingItem = prevCart.find(item => `${item.id}-${item.selectedOption || ''}` === cartItemId);
      if (existingItem) {
        setToastMessage(`${product.name} quantity updated!`);
        return prevCart.map(item => item === existingItem ? { ...item, quantity: item.quantity + 1 } : item);
      }
      setToastMessage(`${product.name} added to cart!`);
      return [...prevCart, { ...product, quantity: 1, selectedOption }];
    });
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleRemoveFromCart = (productId, selectedOption = null) => {
    setCart(prevCart => prevCart.filter(item => `${item.id}-${item.selectedOption || ''}` !== `${productId}-${selectedOption || ''}`));
  };

  const handleUpdateQuantity = (productId, quantity, selectedOption = null) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId, selectedOption);
    } else {
      setCart(prevCart => prevCart.map(item => `${item.id}-${item.selectedOption || ''}` === `${productId}-${selectedOption || ''}` ? { ...item, quantity } : item));
    }
  };

  const handleClearCart = () => setCart([]);
  const handlePaymentSuccess = () => { setShowPaymentSuccess(true); setIsCartOpen(false); handleClearCart(); };
  const handleHidePaymentSuccess = () => setShowPaymentSuccess(false);
  const handlePaymentFailure = () => { setShowPaymentFailure(true); setIsCartOpen(false); };
  const handleHidePaymentFailure = () => setShowPaymentFailure(false);

  const cartItemCount = useMemo(() => cart.reduce((count, item) => item.comingSoon ? count : count + item.quantity, 0), [cart]);

  return (
    <div style={{ backgroundColor: '#F5F5DC', minHeight: '100vh' }}>
      <main className="container py-5" style={{ marginTop: '90px' }}>
        <div className="p-4 rounded-3 shadow-sm mb-5 d-flex justify-content-between align-items-center" style={{backgroundColor: '#E9E9D4'}}>
            <div className="d-flex align-items-center gap-3">
                <div className="bg-success-subtle p-3 rounded-circle">
                    <LeafIcon style={{ width: '2em', height: '2em', color: '#1B5E20' }}/>
                </div>
                <div>
                    <h1 className="display-5 fw-bold text-dark mb-1">Gardening Essentials</h1>
                    <p className="text-secondary mb-0">Everything for your urban gardening journey.</p>
                </div>
            </div>
            <button onClick={() => setIsCartOpen(true)} className="btn btn-link text-dark position-relative p-0">
                <ShoppingCartIcon style={{ width: '2em', height: '2em' }} />
                {cartItemCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
                    {cartItemCount}
                  </span>
                )}
            </button>
        </div>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          {products.map(product => (
            <div className="col" key={product.id}>
              <ProductCard product={product} onAddToCart={handleAddToCart} />
            </div>
          ))}
        </div>
      </main>

      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onRemoveFromCart={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateQuantity}
        onClearCart={handleClearCart}
        onPaymentSuccess={handlePaymentSuccess}
        onPaymentFailure={handlePaymentFailure}
      />

      {showToast && (
        <div className="toast show align-items-center text-white bg-success border-0 fade" role="alert" style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1050 }}>
          <div className="d-flex">
            <div className="toast-body">{toastMessage}</div>
            <button type="button" className="btn-close btn-close-white me-2 m-auto" onClick={() => setShowToast(false)}></button>
          </div>
        </div>
      )}

      {showPaymentSuccess && <PaymentSuccessAnimation onHideAnimation={handleHidePaymentSuccess} />}
      {showPaymentFailure && <PaymentFailureAnimation onHideAnimation={handleHidePaymentFailure} />}

      <style jsx="true">{`
        .card { border: none; border-radius: 1rem; transition: transform 0.2s ease, box-shadow 0.2s ease; }
        .card:hover { transform: translateY(-5px); box-shadow: 0 8px 16px rgba(0,0,0,.1); }
        .card-title { font-weight: 600; font-size: 1.25rem; }
        .product-description { font-style: italic; font-weight: 500; font-size: 17px; color: #444; }
        .best-seller { background: linear-gradient(90deg, #ff4e50, #ff0000); font-weight: bold; border-radius: 20px; }
        .main-action-button { background-color: #28a745 !important; border: none !important; padding: 12px 24px; color: white !important; font-weight: bold; border-radius: 10px; transition: transform 0.2s ease, box-shadow 0.2s ease; }
        .main-action-button:hover { transform: scale(1.03); box-shadow: 0 0 12px rgba(40, 167, 69, 0.3); }
        .coming-soon { background-color: #dc3545 !important; border: none !important; padding: 12px 24px; color: white !important; font-weight: bold; border-radius: 10px; }
        form .form-control.is-invalid { border-color: #dc3545; }
        form .invalid-feedback { display: block; color: #dc3545; }
      `}</style>
    </div>
  );
}