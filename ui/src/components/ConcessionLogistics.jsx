import React, { useState } from 'react';
import { Package, ShoppingCart, CheckCircle, MapPin, CreditCard, Banknote, X, Plus } from 'lucide-react';

const CATALOG = {
  indian: [
    { id: 'i1', name: 'Samosa', desc: 'Crispy pastry with spiced potato', price: 40, img: '🥟' },
    { id: 'i2', name: 'Vada Pav', desc: 'Spicy potato dumpling in bread', price: 50, img: '🍔' },
    { id: 'i3', name: 'Pav Bhaji', desc: 'Spiced vegetable mash with butter bread', price: 120, img: '🥘' },
    { id: 'i4', name: 'Bhel Puri', desc: 'Puffed rice mix with tangy tamarind', price: 80, img: '🥗' },
    { id: 'i5', name: 'Masala Dosa', desc: 'Crispy crepe with potato filling', price: 150, img: '🫔' },
    { id: 'i6', name: 'Pani Puri', desc: 'Hollow puri with flavored water', price: 60, img: '🥙' },
    { id: 'i7', name: 'Chole Bhature', desc: 'Spicy chickpeas with fried bread', price: 140, img: '🍛' },
    { id: 'i8', name: 'Aloo Tikki', desc: 'Fried potato patties with chutney', price: 70, img: '🥔' },
    { id: 'i9', name: 'Kachori', desc: 'Deep-fried spicy lentil pastry', price: 45, img: '🧆' },
    { id: 'i10', name: 'Dhokla', desc: 'Steamed gram flour snack', price: 90, img: '🥮' },
  ],
  western: [
    { id: 'w1', name: 'Hot Dog', desc: 'Classic stadium hot dog with mustard', price: 200, img: '🌭' },
    { id: 'w2', name: 'Cheeseburger', desc: 'Beef patty with cheddar cheese', price: 250, img: '🍔' },
    { id: 'w3', name: 'French Fries', desc: 'Crispy golden fries', price: 120, img: '🍟' },
    { id: 'w4', name: 'Nachos', desc: 'Tortilla chips with melted cheese', price: 220, img: '🌮' },
    { id: 'w5', name: 'Popcorn', desc: 'Large buttered popcorn', price: 280, img: '🍿' },
    { id: 'w6', name: 'Pizza Slice', desc: 'Pepperoni pizza slice', price: 180, img: '🍕' },
    { id: 'w7', name: 'Chicken Tenders', desc: 'Breaded chicken breast strips', price: 300, img: '🍗' },
    { id: 'w8', name: 'Onion Rings', desc: 'Battered deep-fried onion rings', price: 150, img: '🧅' },
    { id: 'w9', name: 'Pretzel', desc: 'Warm soft pretzel with salt', price: 160, img: '🥨' },
    { id: 'w10', name: 'Ice Cream', desc: 'Vanilla soft serve cone', price: 120, img: '🍦' },
  ],
  essentials: [
    { id: 'e1', name: 'Bottled Water', desc: '1L Mineral Water', price: 50, img: '💧' },
    { id: 'e2', name: 'Cola Beverage', desc: '500ml Soda', price: 80, img: '🥤' },
    { id: 'e3', name: 'Earplugs', desc: 'Foam noise reduction earplugs', price: 100, img: '🎧' },
    { id: 'e4', name: 'Rain Poncho', desc: 'Disposable waterproof poncho', price: 150, img: '🧥' },
    { id: 'e5', name: 'Team Cap', desc: 'Official stadium merchandise cap', price: 450, img: '🧢' },
    { id: 'e6', name: 'Mini Fan', desc: 'Battery operated handheld fan', price: 300, img: '🌀' },
  ]
};

export default function ConcessionLogistics() {
  const [activeCategory, setActiveCategory] = useState('indian');
  const [cart, setCart] = useState([]);
  const [checkoutStep, setCheckoutStep] = useState('shop'); // 'shop', 'checkout', 'success'
  
  // Checkout form state
  const [seatNumber, setSeatNumber] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('in-app');

  const addToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const updateQty = (id, delta) => {
    setCart(prev => prev.map(i => {
      if (i.id === id) {
        const newQty = i.qty + delta;
        return newQty > 0 ? { ...i, qty: newQty } : i;
      }
      return i;
    })).filter(i => i.qty > 0); // Note: filter won't work on the setter like this, let's fix it below
  };
  
  const handleUpdateQty = (id, delta) => {
    setCart(prev => {
      const updated = prev.map(i => {
        if (i.id === id) {
          return { ...i, qty: i.qty + delta };
        }
        return i;
      });
      return updated.filter(i => i.qty > 0);
    });
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const cartItemsCount = cart.reduce((sum, item) => sum + item.qty, 0);

  const handleCheckout = () => {
    if (!seatNumber.trim()) return alert('Please enter your seat number for delivery.');
    setCheckoutStep('success');
  };

  if (checkoutStep === 'success') {
    return (
      <div className="glass-panel animate-fade-in" style={{ gridColumn: '1 / -1', gridRow: '1 / -1', padding: '3rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
        <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '2rem', borderRadius: '50%', marginBottom: '2rem' }}>
          <CheckCircle size={64} style={{ color: 'var(--accent-green)' }} />
        </div>
        <h2 className="glow-text" style={{ fontSize: '2rem', marginBottom: '1rem' }}>Order Confirmed!</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', textAlign: 'center', maxWidth: '400px', marginBottom: '2rem' }}>
          Your order of {cartItemsCount} items is being prepared and will be delivered to <strong>Seat {seatNumber}</strong> shortly.
        </p>
        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '12px', width: '100%', maxWidth: '400px', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ color: 'var(--text-secondary)' }}>Payment Method</span>
            <strong>{paymentMethod === 'in-app' ? 'In-App Payment' : 'Cash on Delivery'}</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--text-secondary)' }}>Total Amount</span>
            <strong style={{ color: 'var(--accent-blue)', fontSize: '1.2rem' }}>₹{cartTotal}</strong>
          </div>
        </div>
        <button 
          className="button-primary" 
          onClick={() => { setCart([]); setSeatNumber(''); setCheckoutStep('shop'); }}
        >
          Place Another Order
        </button>
      </div>
    );
  }

  return (
    <div className="glass-panel" style={{ gridColumn: '1 / -1', gridRow: '1 / -1', display: 'flex', height: '100%', overflow: 'hidden' }}>
      
      {/* Main Catalog Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', borderRight: '1px solid var(--border-glass)' }}>
        
        {/* Header & Tabs */}
        <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-glass)' }}>
          <h2 className="glow-text" style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Package size={24} style={{ color: 'var(--accent-purple)' }} />
            Snacks, Beverages & Essentials
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>In-seat delivery. Order from your phone, never miss a moment.</p>
          
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', overflowX: 'auto', paddingBottom: '4px' }}>
            <button 
              onClick={() => setActiveCategory('indian')}
              style={{ flexShrink: 0, padding: '8px 16px', borderRadius: '20px', border: '1px solid', borderColor: activeCategory === 'indian' ? 'var(--accent-blue)' : 'var(--border-glass)', background: activeCategory === 'indian' ? 'rgba(2, 132, 199, 0.1)' : 'transparent', color: activeCategory === 'indian' ? 'var(--accent-blue)' : 'var(--text-secondary)', cursor: 'pointer', transition: 'all 0.2s' }}
            >
              Indian Snacks
            </button>
            <button 
              onClick={() => setActiveCategory('western')}
              style={{ flexShrink: 0, padding: '8px 16px', borderRadius: '20px', border: '1px solid', borderColor: activeCategory === 'western' ? 'var(--accent-blue)' : 'var(--border-glass)', background: activeCategory === 'western' ? 'rgba(2, 132, 199, 0.1)' : 'transparent', color: activeCategory === 'western' ? 'var(--accent-blue)' : 'var(--text-secondary)', cursor: 'pointer', transition: 'all 0.2s' }}
            >
              Western Snacks
            </button>
            <button 
              onClick={() => setActiveCategory('essentials')}
              style={{ flexShrink: 0, padding: '8px 16px', borderRadius: '20px', border: '1px solid', borderColor: activeCategory === 'essentials' ? 'var(--accent-blue)' : 'var(--border-glass)', background: activeCategory === 'essentials' ? 'rgba(2, 132, 199, 0.1)' : 'transparent', color: activeCategory === 'essentials' ? 'var(--accent-blue)' : 'var(--text-secondary)', cursor: 'pointer', transition: 'all 0.2s' }}
            >
              Essentials & Drinks
            </button>
            <button 
              onClick={() => setActiveCategory('track')}
              style={{ flexShrink: 0, padding: '8px 16px', borderRadius: '20px', border: '1px solid', borderColor: activeCategory === 'track' ? 'var(--accent-green)' : 'var(--border-glass)', background: activeCategory === 'track' ? 'rgba(16, 185, 129, 0.1)' : 'transparent', color: activeCategory === 'track' ? 'var(--accent-green)' : 'var(--text-secondary)', cursor: 'pointer', transition: 'all 0.2s' }}
            >
              Track Orders
            </button>
            <button 
              onClick={() => setActiveCategory('firstaid')}
              style={{ flexShrink: 0, padding: '8px 16px', borderRadius: '20px', border: '1px solid', borderColor: activeCategory === 'firstaid' ? 'var(--accent-red)' : 'var(--border-glass)', background: activeCategory === 'firstaid' ? 'rgba(244, 63, 94, 0.1)' : 'transparent', color: activeCategory === 'firstaid' ? 'var(--accent-red)' : 'var(--text-secondary)', cursor: 'pointer', transition: 'all 0.2s' }}
            >
              First Aid Help
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
          {activeCategory === 'track' ? (
            <div className="animate-fade-in" style={{ padding: '2rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid var(--border-glass)' }}>
              <h3 style={{ color: 'var(--text-primary)', marginBottom: '1.5rem' }}>Active Orders</h3>
              <div style={{ padding: '1.5rem', background: 'rgba(16, 185, 129, 0.05)', borderRadius: '8px', border: '1px solid rgba(16, 185, 129, 0.2)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontWeight: 'bold' }}>Order #84920</div>
                  <div style={{ background: 'rgba(245, 166, 35, 0.2)', color: 'var(--accent-orange)', padding: '4px 12px', borderRadius: '20px', fontSize: '0.85rem' }}>Preparing</div>
                </div>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>2x Hot Dog, 1x Cola Beverage</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem' }}>
                  <MapPin size={14} /> Deliver to: A12
                </div>
                <div style={{ marginTop: '1rem', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: '33%', background: 'var(--accent-orange)' }}></div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                  <span>Confirmed</span>
                  <span>Preparing</span>
                  <span>Delivered</span>
                </div>
              </div>
            </div>
          ) : activeCategory === 'firstaid' ? (
            <div className="animate-fade-in" style={{ padding: '2rem', background: 'rgba(244, 63, 94, 0.05)', borderRadius: '12px', border: '1px solid rgba(244, 63, 94, 0.3)' }}>
              <h3 style={{ color: 'var(--accent-red)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Plus size={24} /> Request Emergency First Aid
              </h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                If you or someone near you requires immediate medical attention, please request first aid. A medical response team will be dispatched directly to your seat immediately. This is a free emergency service.
              </p>
              
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Your Seat Number</label>
                <input type="text" placeholder="e.g. A12" className="input-field" style={{ width: '100%', maxWidth: '300px' }} />
              </div>
              
              <div style={{ marginBottom: '2rem' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Nature of Emergency (Optional)</label>
                <textarea placeholder="Briefly describe the issue..." className="input-field" style={{ width: '100%', maxWidth: '500px', minHeight: '80px', resize: 'vertical' }}></textarea>
              </div>

              <button 
                onClick={() => alert('Medical Response Team dispatched to your seat.')}
                style={{ background: 'var(--accent-red)', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '1.1rem', boxShadow: '0 4px 12px rgba(244, 63, 94, 0.3)' }}
              >
                Dispatch Medical Team Now
              </button>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.5rem' }}>
              {CATALOG[activeCategory].map(item => (
                <div key={item.id} className="animate-slide-up" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-glass)', borderRadius: '12px', padding: '1rem', display: 'flex', flexDirection: 'column', transition: 'transform 0.2s', cursor: 'pointer' }}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <div style={{ fontSize: '3.5rem', textAlign: 'center', marginBottom: '1rem', filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))' }}>{item.img}</div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--text-primary)' }}>{item.name}</h4>
                    <p style={{ margin: '4px 0 12px', fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>{item.desc}</p>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--accent-blue)' }}>₹{item.price}</div>
                    <button 
                      onClick={() => addToCart(item)}
                      style={{ background: 'var(--accent-blue)', color: '#fff', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'transform 0.1s' }}
                      onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.9)'}
                      onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Cart & Checkout Panel */}
      <div style={{ width: '350px', background: 'rgba(0,0,0,0.2)', display: 'flex', flexDirection: 'column' }}>
        
        {checkoutStep === 'shop' ? (
          <>
            <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-glass)' }}>
              <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)' }}>
                <ShoppingCart size={20} style={{ color: 'var(--accent-purple)' }} /> Your Order
              </h3>
            </div>
            
            <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
              {cart.length === 0 ? (
                <div style={{ textAlign: 'center', color: 'var(--text-secondary)', marginTop: '4rem' }}>
                  <ShoppingCart size={48} opacity={0.2} style={{ marginBottom: '1rem', color: 'var(--text-secondary)' }} />
                  <p>Your cart is empty.</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {cart.map(item => (
                    <div key={item.id} className="animate-fade-in" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.05)', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '0.95rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>{item.name}</div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--accent-blue)' }}>₹{item.price}</div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(0,0,0,0.2)', padding: '4px', borderRadius: '20px' }}>
                        <button onClick={() => handleUpdateQty(item.id, -1)} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', borderRadius: '50%', width: '24px', height: '24px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>-</button>
                        <span style={{ fontSize: '0.9rem', width: '12px', textAlign: 'center', fontWeight: 'bold' }}>{item.qty}</span>
                        <button onClick={() => handleUpdateQty(item.id, 1)} style={{ background: 'var(--accent-blue)', border: 'none', color: '#fff', borderRadius: '50%', width: '24px', height: '24px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div style={{ padding: '1.5rem', borderTop: '1px solid var(--border-glass)', background: 'rgba(0,0,0,0.3)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Subtotal ({cartItemsCount} items)</span>
                <span style={{ fontWeight: 'bold', fontSize: '1.2rem', color: 'var(--text-primary)' }}>₹{cartTotal}</span>
              </div>
              <button 
                className="button-primary" 
                style={{ width: '100%', opacity: cart.length === 0 ? 0.5 : 1, pointerEvents: cart.length === 0 ? 'none' : 'auto' }}
                onClick={() => setCheckoutStep('checkout')}
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        ) : (
          <div className="animate-slide-up" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-glass)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <button onClick={() => setCheckoutStep('shop')} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                <X size={20} />
              </button>
              <h3 style={{ margin: 0, color: 'var(--text-primary)' }}>Checkout</h3>
            </div>
            
            <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
              <div style={{ marginBottom: '2rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px', fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 'bold' }}>
                  <MapPin size={16} /> Deliver To Seat
                </label>
                <input 
                  type="text" 
                  value={seatNumber}
                  onChange={(e) => setSeatNumber(e.target.value.toUpperCase())}
                  placeholder="e.g. A12, N-34"
                  className="input-field"
                  autoFocus
                  style={{ width: '100%' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '12px', fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 'bold' }}>Payment Method</label>
                
                <div 
                  onClick={() => setPaymentMethod('in-app')}
                  style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', border: `1px solid ${paymentMethod === 'in-app' ? 'var(--accent-blue)' : 'var(--border-glass)'}`, borderRadius: '12px', marginBottom: '12px', cursor: 'pointer', background: paymentMethod === 'in-app' ? 'rgba(2, 132, 199, 0.1)' : 'transparent', transition: 'all 0.2s' }}
                >
                  <CreditCard size={24} style={{ color: paymentMethod === 'in-app' ? 'var(--accent-blue)' : 'var(--text-secondary)' }} />
                  <div>
                    <div style={{ fontWeight: 'bold', color: paymentMethod === 'in-app' ? 'var(--accent-blue)' : 'var(--text-primary)', fontSize: '1rem' }}>In-App Payment</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '2px' }}>Pay now with saved card / UPI</div>
                  </div>
                </div>

                <div 
                  onClick={() => setPaymentMethod('cash')}
                  style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', border: `1px solid ${paymentMethod === 'cash' ? 'var(--accent-green)' : 'var(--border-glass)'}`, borderRadius: '12px', cursor: 'pointer', background: paymentMethod === 'cash' ? 'rgba(16, 185, 129, 0.1)' : 'transparent', transition: 'all 0.2s' }}
                >
                  <Banknote size={24} style={{ color: paymentMethod === 'cash' ? 'var(--accent-green)' : 'var(--text-secondary)' }} />
                  <div>
                    <div style={{ fontWeight: 'bold', color: paymentMethod === 'cash' ? 'var(--accent-green)' : 'var(--text-primary)', fontSize: '1rem' }}>Cash on Delivery</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '2px' }}>Pay delivery agent at your seat</div>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ padding: '1.5rem', borderTop: '1px solid var(--border-glass)', background: 'rgba(0,0,0,0.3)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Total to Pay</span>
                <span style={{ fontWeight: 'bold', fontSize: '1.4rem', color: 'var(--accent-blue)' }}>₹{cartTotal}</span>
              </div>
              <button 
                className="button-primary" 
                style={{ width: '100%', fontSize: '1.1rem', padding: '12px' }}
                onClick={handleCheckout}
              >
                Place Order
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
