/* ==================== CART JAVASCRIPT ==================== */

document.addEventListener('DOMContentLoaded', function() {
    initCartQuantity();
    initCartCheckbox();
    initRemoveItem();
    initCouponCode();
    initCheckout();
    updateCartSummary();
});

/* ==================== CART QUANTITY ==================== */
function initCartQuantity() {
    const cartItems = document.querySelectorAll('.cart-item');

    cartItems.forEach(item => {
        const minusBtn = item.querySelector('.quantity-btn--minus');
        const plusBtn = item.querySelector('.quantity-btn--plus');
        const input = item.querySelector('.quantity-input');
        const priceEl = item.querySelector('.price-value');
        const totalEl = item.querySelector('.total-value');

        if (!minusBtn || !plusBtn || !input || !priceEl || !totalEl) return;

        const unitPrice = parseFloat(priceEl.textContent.replace('$', '').replace(',', ''));

        function updateItemTotal() {
            const quantity = parseInt(input.value) || 1;
            const total = unitPrice * quantity;
            totalEl.textContent = '$' + total.toFixed(2);
            updateCartSummary();
        }

        minusBtn.addEventListener('click', function() {
            const currentValue = parseInt(input.value) || 1;
            if (currentValue > 1) {
                input.value = currentValue - 1;
                updateItemTotal();
            }
        });

        plusBtn.addEventListener('click', function() {
            const currentValue = parseInt(input.value) || 1;
            const max = parseInt(input.max) || 99;
            if (currentValue < max) {
                input.value = currentValue + 1;
                updateItemTotal();
            }
        });

        input.addEventListener('change', function() {
            let value = parseInt(this.value) || 1;
            const min = parseInt(this.min) || 1;
            const max = parseInt(this.max) || 99;

            if (value < min) value = min;
            if (value > max) value = max;

            this.value = value;
            updateItemTotal();
        });
    });
}

/* ==================== CART CHECKBOX ==================== */
function initCartCheckbox() {
    const selectAllCheckbox = document.getElementById('selectAll');
    const itemCheckboxes = document.querySelectorAll('.item-checkbox');

    if (selectAllCheckbox) {
        selectAllCheckbox.addEventListener('change', function() {
            itemCheckboxes.forEach(checkbox => {
                checkbox.checked = this.checked;
            });
            updateCartSummary();
        });
    }

    itemCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const allChecked = Array.from(itemCheckboxes).every(cb => cb.checked);
            const someChecked = Array.from(itemCheckboxes).some(cb => cb.checked);

            if (selectAllCheckbox) {
                selectAllCheckbox.checked = allChecked;
                selectAllCheckbox.indeterminate = someChecked && !allChecked;
            }
            updateCartSummary();
        });
    });

    // Delete selected button
    const deleteSelectedBtn = document.querySelector('.btn-delete-selected');
    if (deleteSelectedBtn) {
        deleteSelectedBtn.addEventListener('click', function() {
            const checkedItems = document.querySelectorAll('.item-checkbox:checked');
            if (checkedItems.length === 0) {
                showNotification('Please select items to delete');
                return;
            }

            if (confirm(`Are you sure you want to remove ${checkedItems.length} item(s) from your cart?`)) {
                checkedItems.forEach(checkbox => {
                    const cartItem = checkbox.closest('.cart-item');
                    if (cartItem) {
                        cartItem.style.animation = 'fadeOut 0.3s ease forwards';
                        setTimeout(() => {
                            cartItem.remove();
                            updateCartSummary();
                            checkEmptyCart();
                        }, 300);
                    }
                });
                showNotification('Selected items removed from cart');
            }
        });
    }
}

/* ==================== REMOVE ITEM ==================== */
function initRemoveItem() {
    const removeButtons = document.querySelectorAll('.cart-item__remove');

    removeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const cartItem = this.closest('.cart-item');
            const itemName = cartItem.querySelector('.cart-item__name')?.textContent || 'Item';

            if (confirm(`Remove "${itemName}" from your cart?`)) {
                cartItem.style.animation = 'fadeOut 0.3s ease forwards';
                setTimeout(() => {
                    cartItem.remove();
                    updateCartSummary();
                    checkEmptyCart();
                    showNotification('Item removed from cart');
                }, 300);
            }
        });
    });
}

/* ==================== UPDATE CART SUMMARY ==================== */
function updateCartSummary() {
    const cartItems = document.querySelectorAll('.cart-item');
    let subtotal = 0;
    let itemCount = 0;

    cartItems.forEach(item => {
        const checkbox = item.querySelector('.item-checkbox');
        if (checkbox && checkbox.checked) {
            const totalEl = item.querySelector('.total-value');
            if (totalEl) {
                const total = parseFloat(totalEl.textContent.replace('$', '').replace(',', ''));
                subtotal += total;
                const quantity = parseInt(item.querySelector('.quantity-input')?.value) || 1;
                itemCount += quantity;
            }
        }
    });

    // Update subtotal
    const subtotalEl = document.querySelector('.summary-subtotal');
    if (subtotalEl) {
        subtotalEl.textContent = '$' + subtotal.toFixed(2);
    }

    // Update item count text
    const summaryRow = document.querySelector('.summary-details .summary-row:first-child span:first-child');
    if (summaryRow) {
        summaryRow.textContent = `Subtotal (${itemCount} item${itemCount !== 1 ? 's' : ''})`;
    }

    // Calculate shipping (free over $100)
    const shippingEl = document.querySelector('.summary-shipping');
    let shippingCost = 0;
    if (subtotal > 0 && subtotal < 100) {
        shippingCost = 15;
        if (shippingEl) shippingEl.textContent = '$15.00';
    } else {
        if (shippingEl) shippingEl.textContent = 'Free';
    }

    // Update total
    const discount = parseFloat(document.querySelector('.summary-discount')?.textContent.replace('-$', '').replace(',', '')) || 0;
    const total = subtotal + shippingCost - discount;

    const totalEl = document.querySelector('.summary-total');
    if (totalEl) {
        totalEl.textContent = '$' + total.toFixed(2);
    }

    // Update cart count in header
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        cartCount.textContent = itemCount;
    }
}

/* ==================== COUPON CODE ==================== */
function initCouponCode() {
    const couponBtn = document.querySelector('.coupon-btn');
    const couponInput = document.querySelector('.coupon-input');
    const discountRow = document.querySelector('.discount-row');

    if (!couponBtn || !couponInput) return;

    // Sample coupon codes
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
            const discountEl = document.querySelector('.summary-discount');

            if (discountEl && discountRow) {
                discountEl.textContent = '-$' + discountAmount.toFixed(2);
                discountRow.style.display = 'flex';
            }

            couponInput.disabled = true;
            couponBtn.disabled = true;
            couponBtn.textContent = 'Applied';
            couponBtn.style.backgroundColor = '#27ae60';

            updateCartSummary();
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

/* ==================== CHECKOUT ==================== */
function initCheckout() {
    const checkoutBtn = document.querySelector('.btn-checkout');

    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            const checkedItems = document.querySelectorAll('.item-checkbox:checked');

            if (checkedItems.length === 0) {
                showNotification('Please select items to checkout');
                return;
            }

            showNotification('Proceeding to checkout...');
            setTimeout(() => {
                window.location.href = 'checkout.html';
            }, 500);
        });
    }
}

/* ==================== CHECK EMPTY CART ==================== */
function checkEmptyCart() {
    const cartItems = document.querySelectorAll('.cart-item');
    const cartLayout = document.querySelector('.cart-layout');
    const emptyCart = document.querySelector('.empty-cart');
    const cartActions = document.querySelector('.cart-actions');

    if (cartItems.length === 0) {
        if (cartLayout) cartLayout.style.display = 'none';
        if (cartActions) cartActions.style.display = 'none';
        if (emptyCart) emptyCart.style.display = 'block';
    }
}

/* ==================== FADE OUT ANIMATION ==================== */
const cartStyles = document.createElement('style');
cartStyles.textContent = `
    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(-20px);
        }
    }
`;
document.head.appendChild(cartStyles);

console.log('Cart JS Loaded');
