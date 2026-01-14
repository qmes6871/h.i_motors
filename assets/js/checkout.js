/* ==================== CHECKOUT JAVASCRIPT ==================== */

document.addEventListener('DOMContentLoaded', function() {
    initShippingMethod();
    initPaymentMethod();
    initCouponCode();
    initPlaceOrder();
    initCardFormatting();
});

/* ==================== SHIPPING METHOD ==================== */
function initShippingMethod() {
    const shippingOptions = document.querySelectorAll('input[name="shipping"]');
    const shippingCostEl = document.querySelector('.shipping-cost');
    const orderTotalEl = document.querySelector('.order-total');

    const shippingPrices = {
        'standard': 0,
        'express': 25,
        'priority': 50
    };

    shippingOptions.forEach(option => {
        option.addEventListener('change', function() {
            const shippingCost = shippingPrices[this.value];
            updateShippingCost(shippingCost);
        });
    });

    function updateShippingCost(cost) {
        if (shippingCostEl) {
            shippingCostEl.textContent = cost === 0 ? 'Free' : '$' + cost.toFixed(2);
        }
        updateOrderTotal();
    }
}

/* ==================== PAYMENT METHOD ==================== */
function initPaymentMethod() {
    const paymentOptions = document.querySelectorAll('input[name="payment"]');
    const cardDetails = document.getElementById('cardDetails');

    paymentOptions.forEach(option => {
        option.addEventListener('change', function() {
            if (cardDetails) {
                if (this.value === 'card') {
                    cardDetails.style.display = 'block';
                } else {
                    cardDetails.style.display = 'none';
                }
            }
        });
    });
}

/* ==================== COUPON CODE ==================== */
function initCouponCode() {
    const couponBtn = document.querySelector('.checkout-summary .coupon-btn');
    const couponInput = document.querySelector('.checkout-summary .coupon-input');
    const discountRow = document.querySelector('.discount-row');

    if (!couponBtn || !couponInput) return;

    const validCoupons = {
        'SAVE10': 10,
        'SAVE20': 20,
        'WELCOME15': 15,
        'HIMOTORS50': 50
    };

    couponBtn.addEventListener('click', function() {
        const code = couponInput.value.trim().toUpperCase();

        if (!code) {
            showNotification('Please enter a coupon code');
            return;
        }

        if (validCoupons[code]) {
            const discountAmount = validCoupons[code];
            const discountAmountEl = document.querySelector('.discount-amount');

            if (discountAmountEl && discountRow) {
                discountAmountEl.textContent = '-$' + discountAmount.toFixed(2);
                discountRow.style.display = 'flex';
            }

            couponInput.disabled = true;
            couponBtn.disabled = true;
            couponBtn.textContent = 'Applied';
            couponBtn.style.backgroundColor = '#27ae60';

            updateOrderTotal();
            showNotification(`Coupon applied! You saved $${discountAmount.toFixed(2)}`);
        } else {
            showNotification('Invalid coupon code');
            couponInput.style.borderColor = '#e74c3c';
            setTimeout(() => {
                couponInput.style.borderColor = '';
            }, 2000);
        }
    });

    couponInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            couponBtn.click();
        }
    });
}

/* ==================== UPDATE ORDER TOTAL ==================== */
function updateOrderTotal() {
    const subtotal = 947; // Base subtotal
    const shippingCostEl = document.querySelector('.shipping-cost');
    const discountAmountEl = document.querySelector('.discount-amount');
    const orderTotalEl = document.querySelector('.order-total');

    let shipping = 0;
    if (shippingCostEl && shippingCostEl.textContent !== 'Free') {
        shipping = parseFloat(shippingCostEl.textContent.replace('$', '')) || 0;
    }

    let discount = 0;
    if (discountAmountEl) {
        discount = parseFloat(discountAmountEl.textContent.replace('-$', '')) || 0;
    }

    const total = subtotal + shipping - discount;

    if (orderTotalEl) {
        orderTotalEl.textContent = '$' + total.toFixed(2);
    }
}

/* ==================== PLACE ORDER ==================== */
function initPlaceOrder() {
    const placeOrderBtn = document.querySelector('.btn-place-order');

    if (placeOrderBtn) {
        placeOrderBtn.addEventListener('click', function() {
            // Basic validation
            const requiredInputs = document.querySelectorAll('.checkout-form input[required], .checkout-form select[required]');
            let isValid = true;

            requiredInputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#e74c3c';
                    input.addEventListener('input', function() {
                        this.style.borderColor = '';
                    }, { once: true });
                }
            });

            if (!isValid) {
                showNotification('Please fill in all required fields');
                return;
            }

            // Check payment method
            const selectedPayment = document.querySelector('input[name="payment"]:checked');
            if (selectedPayment && selectedPayment.value === 'card') {
                const cardInputs = document.querySelectorAll('#cardDetails input');
                cardInputs.forEach(input => {
                    if (!input.value.trim()) {
                        isValid = false;
                        input.style.borderColor = '#e74c3c';
                    }
                });

                if (!isValid) {
                    showNotification('Please fill in card details');
                    return;
                }
            }

            // Simulate order placement
            placeOrderBtn.disabled = true;
            placeOrderBtn.innerHTML = '<span class="spinner"></span> Processing...';

            setTimeout(() => {
                showNotification('Order placed successfully!');
                setTimeout(() => {
                    // Redirect to order complete page
                    window.location.href = 'order-complete.html';
                }, 1500);
            }, 2000);
        });
    }
}

/* ==================== CARD FORMATTING ==================== */
function initCardFormatting() {
    // Card number formatting
    const cardNumberInput = document.querySelector('#cardDetails input[placeholder*="1234"]');
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function(e) {
            let value = this.value.replace(/\s/g, '').replace(/\D/g, '');
            let formatted = '';
            for (let i = 0; i < value.length; i++) {
                if (i > 0 && i % 4 === 0) {
                    formatted += ' ';
                }
                formatted += value[i];
            }
            this.value = formatted;
        });
    }

    // Expiry date formatting
    const expiryInput = document.querySelector('#cardDetails input[placeholder*="MM"]');
    if (expiryInput) {
        expiryInput.addEventListener('input', function(e) {
            let value = this.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.substring(0, 2) + '/' + value.substring(2, 4);
            }
            this.value = value;
        });
    }

    // CVV - numbers only
    const cvvInput = document.querySelector('#cardDetails input[placeholder*="123"]');
    if (cvvInput) {
        cvvInput.addEventListener('input', function(e) {
            this.value = this.value.replace(/\D/g, '');
        });
    }
}

/* ==================== NOTIFICATION ==================== */
if (typeof showNotification !== 'function') {
    function showNotification(message) {
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: #27ae60;
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            font-size: 14px;
            font-weight: 500;
            animation: slideInRight 0.3s ease;
            max-width: 300px;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease forwards';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

/* ==================== SPINNER STYLE ==================== */
const checkoutStyles = document.createElement('style');
checkoutStyles.textContent = `
    .spinner {
        display: inline-block;
        width: 18px;
        height: 18px;
        border: 2px solid rgba(255,255,255,0.3);
        border-top-color: white;
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
        margin-right: 8px;
        vertical-align: middle;
    }
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(checkoutStyles);

console.log('Checkout JS Loaded');
