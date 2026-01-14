/* ==================== MAIN JAVASCRIPT ==================== */

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initBannerSlider();
    initProductTabs();
    initMobileMenu();
    initWishButtons();
    initCartCounter();
    initDropdownMenus();
    initProductsMore();
});

/* ==================== BANNER SLIDER ==================== */
function initBannerSlider() {
    const slides = document.querySelectorAll('.banner__slide');
    const prevBtn = document.querySelector('.banner__prev');
    const nextBtn = document.querySelector('.banner__next');
    const indicators = document.querySelectorAll('.banner__indicator');

    let currentSlide = 0;
    const totalSlides = slides.length;
    let autoplayInterval;

    // Show specific slide
    function showSlide(index) {
        // Remove active class from all slides
        slides.forEach(slide => slide.classList.remove('banner__slide--active'));
        indicators.forEach(indicator => indicator.classList.remove('banner__indicator--active'));

        // Add active class to current slide
        slides[index].classList.add('banner__slide--active');
        indicators[index].classList.add('banner__indicator--active');
    }

    // Next slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }

    // Previous slide
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(currentSlide);
    }

    // Autoplay
    function startAutoplay() {
        stopAutoplay(); // Clear any existing interval first
        autoplayInterval = setInterval(nextSlide, 8000); // 8 seconds
    }

    function stopAutoplay() {
        if (autoplayInterval) {
            clearInterval(autoplayInterval);
            autoplayInterval = null;
        }
    }

    // Event listeners
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            prevSlide();
            stopAutoplay();
            startAutoplay();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            nextSlide();
            stopAutoplay();
            startAutoplay();
        });
    }

    // Indicator clicks
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
            currentSlide = index;
            showSlide(currentSlide);
            stopAutoplay();
            startAutoplay();
        });
    });

    // Start autoplay
    startAutoplay();

    // Pause on hover
    const banner = document.querySelector('.banner');
    if (banner) {
        banner.addEventListener('mouseenter', stopAutoplay);
        banner.addEventListener('mouseleave', startAutoplay);
    }
}

/* ==================== PRODUCT TABS ==================== */
function initProductTabs() {
    const tabs = document.querySelectorAll('.products__tab');
    const contents = document.querySelectorAll('.products__content');

    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');

            // Remove active class from all tabs and contents
            tabs.forEach(t => t.classList.remove('products__tab--active'));
            contents.forEach(c => c.classList.remove('products__content--active'));

            // Add active class to clicked tab
            this.classList.add('products__tab--active');

            // Show corresponding content
            const targetContent = document.querySelector(`[data-content="${targetTab}"]`);
            if (targetContent) {
                targetContent.classList.add('products__content--active');
            }
        });
    });
}

/* ==================== MOBILE MENU ==================== */
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const mobileOverlay = document.querySelector('.mobile-menu-overlay');
    const logoSection = document.querySelector('.header__logo-section');
    const desktopNav = document.querySelector('.nav .nav__menu');
    const body = document.body;

    // Clone desktop nav menu to mobile overlay
    if (mobileOverlay && desktopNav) {
        // Clear existing content and clone desktop menu
        mobileOverlay.innerHTML = '';
        const clonedMenu = desktopNav.cloneNode(true);
        mobileOverlay.appendChild(clonedMenu);

        // Remove any inline styles from cloned dropdowns
        const clonedDropdowns = mobileOverlay.querySelectorAll('.nav__dropdown');
        clonedDropdowns.forEach(dropdown => {
            dropdown.removeAttribute('style');
        });
    }

    // Set overlay top position based on logo section position
    function setOverlayPosition() {
        if (mobileOverlay && logoSection && window.innerWidth <= 720) {
            const rect = logoSection.getBoundingClientRect();
            mobileOverlay.style.top = rect.bottom + 'px';
        }
    }

    setOverlayPosition();
    window.addEventListener('resize', setOverlayPosition);
    window.addEventListener('scroll', setOverlayPosition);

    if (mobileToggle && mobileOverlay) {
        mobileToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            mobileOverlay.classList.toggle('active');
            setOverlayPosition();

            // Prevent body scroll when menu is open
            if (mobileOverlay.classList.contains('active')) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = '';
            }
        });

        // Toggle dropdown menus in mobile overlay
        function initDropdownToggles() {
            const dropdownItems = mobileOverlay.querySelectorAll('.nav__item--dropdown');
            dropdownItems.forEach(item => {
                const link = item.querySelector('.nav__link');
                const dropdown = item.querySelector('.nav__dropdown');

                // Remove any inline display styles
                if (dropdown) {
                    dropdown.removeAttribute('style');
                }

                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();

                    // Close other dropdowns
                    dropdownItems.forEach(otherItem => {
                        if (otherItem !== item) {
                            otherItem.classList.remove('open');
                        }
                    });

                    item.classList.toggle('open');
                });
            });

            // Close menu when clicking submenu links
            const submenuLinks = mobileOverlay.querySelectorAll('.nav__submenu-list a');
            submenuLinks.forEach(link => {
                link.addEventListener('click', function() {
                    mobileToggle.classList.remove('active');
                    mobileOverlay.classList.remove('active');
                    body.style.overflow = '';
                });
            });
        }

        initDropdownToggles();
    }

    // Legacy desktop mobile toggle (keep for backward compatibility)
    const legacyToggle = document.querySelector('.nav__mobile-toggle');
    const navMenu = document.querySelector('.nav .nav__menu');

    if (legacyToggle && navMenu) {
        legacyToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
}

/* ==================== DROPDOWN MENUS ==================== */
function initDropdownMenus() {
    const nav = document.querySelector('.nav');
    if (!nav) return;

    const dropdownItems = nav.querySelectorAll('.nav__item--dropdown');

    // Desktop: position mega menu below nav
    if (window.innerWidth > 720) {
        dropdownItems.forEach(item => {
            const dropdown = item.querySelector('.nav__dropdown');

            item.addEventListener('mouseenter', function() {
                if (dropdown && nav) {
                    const navRect = nav.getBoundingClientRect();
                    dropdown.style.top = navRect.bottom + 'px';
                }
            });
        });
    }
}

/* ==================== PRODUCTS MORE BUTTON ==================== */
function initProductsMore() {
    const moreButtons = document.querySelectorAll('.products__more-btn');

    // Page state for each tab
    const pageState = {
        hot: { current: 1, total: 16 },
        new: { current: 1, total: 8 },
        promotion: { current: 1, total: 5 }
    };

    moreButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const tab = this.getAttribute('data-tab');
            const state = pageState[tab];
            const pageSpan = this.querySelector('.products__more-page');
            const grid = this.closest('.products__content').querySelector('.products__grid');

            // Increment page
            if (state.current < state.total) {
                state.current++;

                // Update page number display
                pageSpan.textContent = `(${state.current}/${state.total})`;

                // Load more products (simulation)
                loadMoreProducts(grid, tab, state.current);

                // Show notification
                showNotification(`Loading page ${state.current} of ${state.total}`);
            } else {
                // Reset to page 1
                state.current = 1;
                pageSpan.textContent = `(${state.current}/${state.total})`;
                showNotification('Back to first page');

                // Scroll to products section
                document.querySelector('.products').scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Simulate loading more products
function loadMoreProducts(grid, tab, page) {
    const productNames = {
        hot: ['Premium LED Kit', 'Carbon Spoiler', 'Interior Trim Set', 'Floor Mat Premium'],
        new: ['New Bumper Guard', 'Side Mirror Cover', 'Trunk Liner', 'Door Handle Protector'],
        promotion: ['Sale Body Kit', 'Discount Wheel Set', 'Clearance Lights', 'Special Grille']
    };

    // Create 4 new product cards
    for (let i = 0; i < 4; i++) {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.style.animation = 'fadeInUp 0.6s ease both';
        productCard.style.animationDelay = `${i * 0.1}s`;

        const randomPrice = Math.floor(Math.random() * 500) + 100;
        const randomName = productNames[tab][i % productNames[tab].length] + ` ${page}-${i + 1}`;

        productCard.innerHTML = `
            <div class="product-card__image">
                <img src="https://via.placeholder.com/300x300/f5f5f5/333333?text=${tab}+${page}-${i+1}" alt="${randomName}">
                <button class="product-card__wish">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                </button>
            </div>
            <div class="product-card__content">
                <h3 class="product-card__title">${randomName}</h3>
                <p class="product-card__price">
                    <span class="product-card__price-sale">$${randomPrice}</span>
                </p>
                <button class="btn btn--primary">ADD OPTION</button>
            </div>
        `;

        grid.appendChild(productCard);
    }

    // Re-initialize wish buttons for new cards
    initWishButtons();
}

/* ==================== WISH BUTTONS ==================== */
function initWishButtons() {
    const wishButtons = document.querySelectorAll('.product-card__wish');

    wishButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();

            // Toggle active state
            this.classList.toggle('active');

            // Change SVG fill
            const svg = this.querySelector('svg');
            if (this.classList.contains('active')) {
                svg.setAttribute('fill', 'currentColor');
                showNotification('Added to wishlist.');
            } else {
                svg.setAttribute('fill', 'none');
                showNotification('Removed from wishlist.');
            }
        });
    });
}

/* ==================== CART COUNTER ==================== */
function initCartCounter() {
    const addButtons = document.querySelectorAll('.btn--primary');
    const cartCount = document.querySelector('.cart-count');
    let count = 0;

    addButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();

            // Increment cart count
            count++;
            if (cartCount) {
                cartCount.textContent = count;
            }

            // Show notification
            const productCard = this.closest('.product-card');
            const productTitle = productCard.querySelector('.product-card__title').textContent;
            showNotification(`"${productTitle}" has been added to cart.`);

            // Animate cart icon
            const cartIcon = document.querySelector('.cart-icon');
            if (cartIcon) {
                cartIcon.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    cartIcon.style.transform = '';
                }, 300);
            }
        });
    });
}

/* ==================== NOTIFICATION SYSTEM ==================== */
function showNotification(message) {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;

    // Add styles
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

    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Append to body
    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

/* ==================== SEARCH FUNCTIONALITY ==================== */
const searchInput = document.querySelector('.nav__search-input');
const searchBtn = document.querySelector('.nav__search-btn');

if (searchBtn && searchInput) {
    searchBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const query = searchInput.value.trim();
        if (query) {
            showNotification(`Showing search results for "${query}".`);
            // Here you would normally redirect to search results page
            // window.location.href = `/search?q=${encodeURIComponent(query)}`;
        }
    });

    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            searchBtn.click();
        }
    });
}

/* ==================== SMOOTH SCROLL ==================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

/* ==================== LAZY LOADING IMAGES ==================== */
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading if supported
if ('IntersectionObserver' in window) {
    initLazyLoading();
}

/* ==================== WINDOW RESIZE HANDLER ==================== */
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        // Re-initialize dropdown menus on resize
        initDropdownMenus();

        // Close mobile menu if window is resized to desktop
        if (window.innerWidth > 720) {
            const navMenu = document.querySelector('.nav__menu');
            const mobileToggle = document.querySelector('.nav__mobile-toggle');
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                const spans = mobileToggle.querySelectorAll('span');
                spans[0].style.transform = '';
                spans[1].style.opacity = '1';
                spans[2].style.transform = '';
            }
        }
    }, 250);
});

/* ==================== SCROLL TO TOP BUTTON ==================== */
// Create scroll to top button
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M18 15l-6-6-6 6"></path>
    </svg>
`;
scrollTopBtn.className = 'scroll-to-top';
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    background-color: #1a1a1a;
    color: white;
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    display: none;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
    transition: all 0.3s ease;
    z-index: 1000;
`;

document.body.appendChild(scrollTopBtn);

// Show/hide scroll to top button
window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        scrollTopBtn.style.display = 'flex';
    } else {
        scrollTopBtn.style.display = 'none';
    }
});

// Scroll to top on click
scrollTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollTopBtn.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.1)';
});

scrollTopBtn.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1)';
});

/* ==================== CONSOLE LOG ==================== */
console.log('H.I MOTORS - Website Loaded Successfully');
console.log('Version: 1.0.0');
console.log('Built with: HTML, CSS, Vanilla JavaScript');
