/* ==================== WISHLIST JAVASCRIPT ==================== */

document.addEventListener('DOMContentLoaded', function() {
    initWishlistRemove();
    initWishlistAddToCart();
    initAddAllToCart();
    initClearWishlist();
    updateWishlistCount();
});

/* ==================== REMOVE FROM WISHLIST ==================== */
function initWishlistRemove() {
    const removeButtons = document.querySelectorAll('.wishlist-item__remove');

    removeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const wishlistItem = this.closest('.wishlist-item');
            const itemName = wishlistItem.querySelector('.wishlist-item__name')?.textContent || 'Item';

            wishlistItem.style.animation = 'fadeOut 0.3s ease forwards';
            setTimeout(() => {
                wishlistItem.remove();
                updateWishlistCount();
                checkEmptyWishlist();
                showNotification(`"${itemName}" removed from wishlist`);
            }, 300);
        });
    });
}

/* ==================== ADD TO CART ==================== */
function initWishlistAddToCart() {
    const cartButtons = document.querySelectorAll('.wishlist-item__cart-btn:not([disabled])');

    cartButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const wishlistItem = this.closest('.wishlist-item');
            const itemName = wishlistItem.querySelector('.wishlist-item__name')?.textContent || 'Item';

            // Add animation to button
            this.classList.add('added');
            this.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                Added!
            `;

            // Update cart count
            const cartCount = document.querySelector('.cart-count');
            if (cartCount) {
                const currentCount = parseInt(cartCount.textContent) || 0;
                cartCount.textContent = currentCount + 1;
            }

            showNotification(`"${itemName}" added to cart`);

            // Reset button after delay
            setTimeout(() => {
                this.classList.remove('added');
                this.innerHTML = `
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                    Add to Cart
                `;
            }, 2000);
        });
    });
}

/* ==================== ADD ALL TO CART ==================== */
function initAddAllToCart() {
    const addAllBtn = document.querySelector('.btn-add-all-cart');

    if (addAllBtn) {
        addAllBtn.addEventListener('click', function() {
            const inStockItems = document.querySelectorAll('.wishlist-item:has(.in-stock), .wishlist-item:has(.low-stock)');

            if (inStockItems.length === 0) {
                showNotification('No items available to add to cart');
                return;
            }

            let addedCount = 0;
            inStockItems.forEach(item => {
                const btn = item.querySelector('.wishlist-item__cart-btn:not([disabled])');
                if (btn && !btn.classList.contains('added')) {
                    addedCount++;
                }
            });

            // Update cart count
            const cartCount = document.querySelector('.cart-count');
            if (cartCount) {
                const currentCount = parseInt(cartCount.textContent) || 0;
                cartCount.textContent = currentCount + addedCount;
            }

            // Update all buttons
            inStockItems.forEach(item => {
                const btn = item.querySelector('.wishlist-item__cart-btn:not([disabled])');
                if (btn) {
                    btn.classList.add('added');
                    btn.innerHTML = `
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        Added!
                    `;
                }
            });

            showNotification(`${addedCount} item(s) added to cart`);

            // Reset buttons after delay
            setTimeout(() => {
                inStockItems.forEach(item => {
                    const btn = item.querySelector('.wishlist-item__cart-btn');
                    if (btn) {
                        btn.classList.remove('added');
                        btn.innerHTML = `
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                            Add to Cart
                        `;
                    }
                });
            }, 2000);
        });
    }
}

/* ==================== CLEAR WISHLIST ==================== */
function initClearWishlist() {
    const clearBtn = document.querySelector('.btn-clear-wishlist');

    if (clearBtn) {
        clearBtn.addEventListener('click', function() {
            const wishlistItems = document.querySelectorAll('.wishlist-item');

            if (wishlistItems.length === 0) {
                showNotification('Wishlist is already empty');
                return;
            }

            if (confirm('Are you sure you want to clear your entire wishlist?')) {
                wishlistItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.animation = 'fadeOut 0.3s ease forwards';
                        setTimeout(() => {
                            item.remove();
                            if (index === wishlistItems.length - 1) {
                                updateWishlistCount();
                                checkEmptyWishlist();
                            }
                        }, 300);
                    }, index * 100);
                });

                showNotification('Wishlist cleared');
            }
        });
    }
}

/* ==================== UPDATE WISHLIST COUNT ==================== */
function updateWishlistCount() {
    const wishlistItems = document.querySelectorAll('.wishlist-item');
    const countEl = document.querySelector('.wishlist-count');

    if (countEl) {
        const count = wishlistItems.length;
        countEl.textContent = count + ' item' + (count !== 1 ? 's' : '');
    }
}

/* ==================== CHECK EMPTY WISHLIST ==================== */
function checkEmptyWishlist() {
    const wishlistItems = document.querySelectorAll('.wishlist-item');
    const wishlistGrid = document.querySelector('.wishlist-grid');
    const wishlistEmpty = document.querySelector('.wishlist-empty');
    const wishlistHeader = document.querySelector('.wishlist-header');

    if (wishlistItems.length === 0) {
        if (wishlistGrid) wishlistGrid.style.display = 'none';
        if (wishlistEmpty) wishlistEmpty.style.display = 'block';
        if (wishlistHeader) wishlistHeader.querySelector('.wishlist-header__right').style.display = 'none';
    }
}

/* ==================== PRODUCT CARD WISHLIST BUTTON ==================== */
const productWishlistBtns = document.querySelectorAll('.product-card__wishlist');
productWishlistBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        this.classList.toggle('active');

        const svg = this.querySelector('svg');
        if (this.classList.contains('active')) {
            svg.setAttribute('fill', 'currentColor');
            this.style.color = '#e74c3c';
            showNotification('Added to wishlist');
        } else {
            svg.setAttribute('fill', 'none');
            this.style.color = '';
            showNotification('Removed from wishlist');
        }
    });
});

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

/* ==================== ANIMATIONS ==================== */
const wishlistStyles = document.createElement('style');
wishlistStyles.textContent = `
    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: scale(1);
        }
        to {
            opacity: 0;
            transform: scale(0.9);
        }
    }
`;
document.head.appendChild(wishlistStyles);

console.log('Wishlist JS Loaded');
