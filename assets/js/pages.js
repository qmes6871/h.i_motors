/* ==================== PAGES JAVASCRIPT ==================== */

document.addEventListener('DOMContentLoaded', function() {
    initFaqAccordion();
    initProductTabs();
    initProductGallery();
    initQuantitySelector();
    initFilterSidebar();
    initPasswordToggle();
    initFormValidation();
});

/* ==================== FAQ ACCORDION ==================== */
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    const faqCategories = document.querySelectorAll('.faq-category');

    // Toggle FAQ items
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', function() {
                const isActive = item.classList.contains('active');

                // Close all items
                faqItems.forEach(i => i.classList.remove('active'));

                // Open clicked item if it wasn't active
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });

    // Filter by category
    faqCategories.forEach(category => {
        category.addEventListener('click', function() {
            const selectedCategory = this.dataset.category;

            // Update active category
            faqCategories.forEach(c => c.classList.remove('faq-category--active'));
            this.classList.add('faq-category--active');

            // Filter items
            faqItems.forEach(item => {
                if (selectedCategory === 'all' || item.dataset.category === selectedCategory) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

/* ==================== PRODUCT DETAIL TABS ==================== */
function initProductTabs() {
    const tabs = document.querySelectorAll('.product-tab');
    const contents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.dataset.tab;

            // Update active tab
            tabs.forEach(t => t.classList.remove('product-tab--active'));
            this.classList.add('product-tab--active');

            // Show target content
            contents.forEach(content => {
                if (content.dataset.content === targetTab) {
                    content.classList.add('tab-content--active');
                } else {
                    content.classList.remove('tab-content--active');
                }
            });
        });
    });
}

/* ==================== PRODUCT GALLERY ==================== */
function initProductGallery() {
    const mainImage = document.getElementById('mainImage');
    const thumbs = document.querySelectorAll('.product-gallery__thumb');

    if (!mainImage || thumbs.length === 0) return;

    thumbs.forEach(thumb => {
        thumb.addEventListener('click', function() {
            const newImage = this.dataset.image;

            // Update main image
            mainImage.src = newImage;

            // Update active thumb
            thumbs.forEach(t => t.classList.remove('product-gallery__thumb--active'));
            this.classList.add('product-gallery__thumb--active');
        });
    });
}

/* ==================== QUANTITY SELECTOR ==================== */
function initQuantitySelector() {
    const quantitySelectors = document.querySelectorAll('.quantity-selector');

    quantitySelectors.forEach(selector => {
        const minusBtn = selector.querySelector('.quantity-btn--minus');
        const plusBtn = selector.querySelector('.quantity-btn--plus');
        const input = selector.querySelector('.quantity-input');

        if (!minusBtn || !plusBtn || !input) return;

        minusBtn.addEventListener('click', function() {
            const currentValue = parseInt(input.value) || 1;
            if (currentValue > 1) {
                input.value = currentValue - 1;
            }
        });

        plusBtn.addEventListener('click', function() {
            const currentValue = parseInt(input.value) || 1;
            const max = parseInt(input.max) || 99;
            if (currentValue < max) {
                input.value = currentValue + 1;
            }
        });

        input.addEventListener('change', function() {
            let value = parseInt(this.value) || 1;
            const min = parseInt(this.min) || 1;
            const max = parseInt(this.max) || 99;

            if (value < min) value = min;
            if (value > max) value = max;

            this.value = value;
        });
    });
}

/* ==================== FILTER SIDEBAR ==================== */
function initFilterSidebar() {
    const filterToggle = document.querySelector('.filter-toggle-btn');
    const sidebar = document.querySelector('.products-sidebar');

    if (!filterToggle || !sidebar) return;

    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'filter-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 1000;
        display: none;
    `;
    document.body.appendChild(overlay);

    filterToggle.addEventListener('click', function() {
        sidebar.classList.add('active');
        overlay.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });

    overlay.addEventListener('click', function() {
        sidebar.classList.remove('active');
        overlay.style.display = 'none';
        document.body.style.overflow = '';
    });

    // Close button for sidebar
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '&times;';
    closeBtn.style.cssText = `
        position: absolute;
        top: 15px;
        right: 15px;
        width: 30px;
        height: 30px;
        border: none;
        background: none;
        font-size: 24px;
        cursor: pointer;
        display: none;
    `;

    if (window.innerWidth <= 1024) {
        closeBtn.style.display = 'block';
    }

    sidebar.insertBefore(closeBtn, sidebar.firstChild);

    closeBtn.addEventListener('click', function() {
        sidebar.classList.remove('active');
        overlay.style.display = 'none';
        document.body.style.overflow = '';
    });

    window.addEventListener('resize', function() {
        if (window.innerWidth > 1024) {
            sidebar.classList.remove('active');
            overlay.style.display = 'none';
            document.body.style.overflow = '';
            closeBtn.style.display = 'none';
        } else {
            closeBtn.style.display = 'block';
        }
    });
}

/* ==================== PASSWORD TOGGLE ==================== */
function initPasswordToggle() {
    const toggleBtns = document.querySelectorAll('.password-toggle');

    toggleBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.parentElement.querySelector('input');
            const eyeOpen = this.querySelector('.eye-open');
            const eyeClosed = this.querySelector('.eye-closed');

            if (input.type === 'password') {
                input.type = 'text';
                if (eyeOpen) eyeOpen.style.display = 'none';
                if (eyeClosed) eyeClosed.style.display = 'block';
            } else {
                input.type = 'password';
                if (eyeOpen) eyeOpen.style.display = 'block';
                if (eyeClosed) eyeClosed.style.display = 'none';
            }
        });
    });
}

/* ==================== FORM VALIDATION ==================== */
function initFormValidation() {
    // Signup form validation
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        const password = document.getElementById('password');
        const confirmPassword = document.getElementById('confirmPassword');
        const passwordMatchError = document.getElementById('passwordMatchError');
        const strengthBar = document.querySelector('.password-strength__bar');
        const strengthText = document.querySelector('.password-strength__text');

        // Password strength checker
        if (password && strengthBar && strengthText) {
            password.addEventListener('input', function() {
                const value = this.value;
                let strength = 0;
                let text = '';
                let color = '';

                if (value.length >= 8) strength++;
                if (value.match(/[a-z]/)) strength++;
                if (value.match(/[A-Z]/)) strength++;
                if (value.match(/[0-9]/)) strength++;
                if (value.match(/[^a-zA-Z0-9]/)) strength++;

                switch (strength) {
                    case 0:
                    case 1:
                        text = 'Weak';
                        color = '#e74c3c';
                        break;
                    case 2:
                    case 3:
                        text = 'Medium';
                        color = '#f39c12';
                        break;
                    case 4:
                    case 5:
                        text = 'Strong';
                        color = '#27ae60';
                        break;
                }

                strengthBar.style.background = `linear-gradient(to right, ${color} ${strength * 20}%, #e0e0e0 ${strength * 20}%)`;
                strengthText.textContent = value.length > 0 ? text : '';
                strengthText.style.color = color;
            });
        }

        // Password match checker
        if (confirmPassword && passwordMatchError) {
            confirmPassword.addEventListener('input', function() {
                if (password.value !== this.value) {
                    passwordMatchError.textContent = 'Passwords do not match';
                } else {
                    passwordMatchError.textContent = '';
                }
            });
        }

        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();

            if (password.value !== confirmPassword.value) {
                passwordMatchError.textContent = 'Passwords do not match';
                return;
            }

            // Simulate form submission
            showNotification('Account created successfully!');
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
        });
    }

    // Login form validation
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showNotification('Login successful! Redirecting...');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        });
    }
}

/* ==================== VIEW TOGGLE ==================== */
const viewBtns = document.querySelectorAll('.view-btn');
viewBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        viewBtns.forEach(b => b.classList.remove('view-btn--active'));
        this.classList.add('view-btn--active');

        const view = this.dataset.view;
        const grid = document.querySelector('.products__grid');

        if (grid) {
            if (view === 'list') {
                grid.style.gridTemplateColumns = '1fr';
            } else {
                grid.style.gridTemplateColumns = '';
            }
        }
    });
});

/* ==================== COLOR CHOICE ==================== */
const colorChoices = document.querySelectorAll('.color-choice');
colorChoices.forEach(choice => {
    choice.addEventListener('click', function() {
        colorChoices.forEach(c => c.classList.remove('color-choice--active'));
        this.classList.add('color-choice--active');

        const selectedEl = document.querySelector('.product-option__selected');
        if (selectedEl) {
            selectedEl.textContent = this.title;
        }
    });
});

/* ==================== OPTION BUTTONS ==================== */
const optionBtns = document.querySelectorAll('.option-btn');
optionBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        const parent = this.closest('.product-option__buttons');
        if (parent) {
            parent.querySelectorAll('.option-btn').forEach(b => b.classList.remove('option-btn--active'));
        }
        this.classList.add('option-btn--active');
    });
});

/* ==================== ADD TO CART ==================== */
const addToCartBtn = document.querySelector('.product-actions__cart');
if (addToCartBtn) {
    addToCartBtn.addEventListener('click', function() {
        const quantity = document.querySelector('.quantity-input')?.value || 1;
        showNotification(`Added ${quantity} item(s) to cart!`);

        // Update cart count
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            const currentCount = parseInt(cartCount.textContent) || 0;
            cartCount.textContent = currentCount + parseInt(quantity);
        }
    });
}

/* ==================== BUY NOW ==================== */
const buyNowBtn = document.querySelector('.product-actions__buy');
if (buyNowBtn) {
    buyNowBtn.addEventListener('click', function() {
        showNotification('Proceeding to checkout...');
        // window.location.href = 'checkout.html';
    });
}

/* ==================== WISHLIST ==================== */
const wishBtn = document.querySelector('.product-actions__wish');
if (wishBtn) {
    wishBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        const svg = this.querySelector('svg');

        if (this.classList.contains('active')) {
            svg.setAttribute('fill', 'currentColor');
            this.style.color = '#e74c3c';
            this.style.borderColor = '#e74c3c';
            showNotification('Added to wishlist!');
        } else {
            svg.setAttribute('fill', 'none');
            this.style.color = '';
            this.style.borderColor = '';
            showNotification('Removed from wishlist!');
        }
    });
}

/* ==================== NOTIFICATION (if not defined in main.js) ==================== */
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

/* ==================== CLEAR HISTORY ==================== */
const clearHistoryBtn = document.querySelector('.clear-history-btn');
if (clearHistoryBtn) {
    clearHistoryBtn.addEventListener('click', function() {
        if (confirm('Are you sure you want to clear your browsing history?')) {
            const grid = document.querySelector('.products__grid');
            const emptyState = document.querySelector('.empty-state');

            if (grid) grid.style.display = 'none';
            if (emptyState) emptyState.style.display = 'block';

            showNotification('Browsing history cleared!');
        }
    });
}

console.log('Pages JS Loaded');
