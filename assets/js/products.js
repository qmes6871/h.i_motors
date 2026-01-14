/**
 * Products Page - Dynamic Filtering System
 * Handles URL parameters for brand, model, and category filtering
 */

document.addEventListener('DOMContentLoaded', function() {
    initProductsPage();
});

// Product data configuration
const BRANDS = {
    'hyundai': {
        name: 'Hyundai Motors',
        models: {
            'palisade-2025': 'The All New Palisade 2025',
            'palisade-2023': 'Palisade 2023~2024',
            'palisade-2019': 'Palisade 2019~2021',
            'santafe-mx5': 'Santa Fe MX5 2024~',
            'santafe-tm': 'Santa Fe TM 2018~2023',
            'tucson-nx4': 'Tucson NX4 2021~',
            'tucson-tl': 'Tucson TL 2015~2020',
            'staria': 'Staria',
            'inster': 'The All New Inster',
            'kona-2023': 'Kona 2023~',
            'ioniq5': 'Ioniq 5',
            'ioniq6': 'Ioniq 6',
            'ioniq9': 'Ioniq 9'
        }
    },
    'genesis': {
        name: 'Genesis',
        models: {
            'gv80': 'GV80',
            'gv70': 'GV70',
            'gv60': 'GV60',
            'g90': 'G90',
            'g80': 'G80',
            'g70': 'G70',
            'g70-shooting-brake': 'G70 Shooting Brake 2022~'
        }
    },
    'kia': {
        name: 'Kia Motors',
        models: {
            'carnival-2024': 'Carnival KA4 2024~',
            'carnival-2021': 'Carnival KA4 2021~',
            'k5-2024': 'K5 Facelift 2024~',
            'k5-dl3': 'K5 DL3 2020~',
            'seltos-2023': 'The New Seltos 2023~',
            'tasman': 'Tasman',
            'sorento-2024': 'Sorento MQ4 2024~',
            'sorento-2020': 'Sorento MQ4 2020~',
            'sportage-nq5': 'Sportage NQ5 2021~',
            'ev3': 'EV3',
            'ev4': 'EV4',
            'ev6': 'EV6',
            'ev6-facelift': 'EV6 Facelift',
            'ev9': 'EV9',
            'picanto-2023': 'Picanto 2023',
            'niro-ev': 'Niro EV 2023~',
            'stinger': 'Stinger'
        }
    },
    'kgm': {
        name: 'KGM Motors',
        models: {
            'torres-2024': 'Torres Facelift 2024~',
            'torres': 'Torres',
            'torres-evx': 'Torres EVX',
            'actyon-2025': 'Actyon 2025~',
            'musso': 'Musso (Rexton Sports)',
            'musso-ev': 'Musso EV',
            'rexton-g4': 'Rexton G4',
            'tivoli-2022': 'Tivoli 2022',
            'korando-c300': 'Korando (C300) 2019~',
            'rexton': 'Rexton'
        }
    },
    'chevy': {
        name: 'Chevy Korea',
        models: {
            'trax-crossover': 'Trax Crossovers',
            'trailblazer': 'Trail Blazer',
            'trax': 'Trax'
        }
    },
    'renault': {
        name: 'Renault Korea',
        models: {
            'grand-koleos': 'Grand Koleos 2025~',
            'koleos-qm6': 'Koleos (QM6)',
            'talisman-sm6': 'Renault Talisman (SM6)',
            'qm3': 'QM3',
            'qm5': 'QM5'
        }
    }
};

const CATEGORIES = {
    'aero-parts': 'Aero Parts',
    'exterior': 'Exterior Items',
    'interior': 'Interior Items',
    'led': 'LED Products',
    'tuning': 'Tuning Parts',
    'other': 'Other'
};

// Sample products data (for demo purposes)
const SAMPLE_PRODUCTS = [
    { id: 1, name: 'Front Lip Spoiler - Carbon', category: 'aero-parts', price: 450, originalPrice: null, badge: 'new', rating: 5, reviews: 24, image: 'Front+Lip' },
    { id: 2, name: 'Side Skirt Extension Kit', category: 'aero-parts', price: 380, originalPrice: 420, badge: null, rating: 4, reviews: 18, image: 'Side+Skirt' },
    { id: 3, name: 'Rear Diffuser - Matte Black', category: 'aero-parts', price: 299, originalPrice: 350, badge: 'sale', rating: 5, reviews: 31, image: 'Rear+Diffuser' },
    { id: 4, name: 'Premium All Weather Floor Mat Set', category: 'interior', price: 189, originalPrice: null, badge: null, rating: 5, reviews: 56, image: 'Floor+Mat' },
    { id: 5, name: 'Premium LED Interior Light Kit', category: 'led', price: 125, originalPrice: null, badge: 'hot', rating: 5, reviews: 42, image: 'LED+Kit' },
    { id: 6, name: 'Trunk Cargo Mat - All Weather', category: 'interior', price: 89, originalPrice: null, badge: null, rating: 4, reviews: 15, image: 'Trunk+Mat' },
    { id: 7, name: 'LED Door Sill Protector Set', category: 'led', price: 145, originalPrice: null, badge: null, rating: 5, reviews: 28, image: 'Door+Sill' },
    { id: 8, name: 'Custom Front Grille - Gloss Black', category: 'exterior', price: 320, originalPrice: null, badge: null, rating: 4, reviews: 12, image: 'Grille' },
    { id: 9, name: 'Chrome Door Handle Cover Set', category: 'exterior', price: 85, originalPrice: null, badge: null, rating: 4, reviews: 33, image: 'Handle' },
    { id: 10, name: 'LED Fog Light Kit - 6000K', category: 'led', price: 165, originalPrice: 195, badge: 'sale', rating: 5, reviews: 47, image: 'Fog+Light' },
    { id: 11, name: 'Sport Steering Wheel Cover', category: 'interior', price: 79, originalPrice: null, badge: null, rating: 4, reviews: 21, image: 'Steering' },
    { id: 12, name: 'Performance Air Intake System', category: 'tuning', price: 385, originalPrice: null, badge: 'new', rating: 5, reviews: 8, image: 'Air+Intake' }
];

function initProductsPage() {
    // Parse URL parameters
    const params = getURLParams();

    // Update page based on parameters
    updatePageContent(params);

    // Initialize filters
    initFilters();

    // Initialize view toggle
    initViewToggle();

    // Initialize sorting
    initSorting();

    // Initialize pagination
    initPagination();

    // Initialize mobile filter toggle
    initMobileFilter();
}

function getURLParams() {
    const urlParams = new URLSearchParams(window.location.search);
    return {
        brand: urlParams.get('brand'),
        model: urlParams.get('model'),
        category: urlParams.get('category')
    };
}

function updatePageContent(params) {
    let pageTitle = 'All Products';
    let breadcrumbItems = [{ text: 'Home', link: 'index.html' }];
    let productCount = Math.floor(Math.random() * 100) + 50; // Random count for demo

    // Determine page title and breadcrumb based on params
    if (params.model) {
        // Find brand for this model
        for (const [brandKey, brandData] of Object.entries(BRANDS)) {
            if (brandData.models[params.model]) {
                pageTitle = brandData.models[params.model];
                breadcrumbItems.push({ text: brandData.name, link: `products.html?brand=${brandKey}` });
                breadcrumbItems.push({ text: pageTitle, link: null });
                break;
            }
        }
    } else if (params.brand && BRANDS[params.brand]) {
        pageTitle = BRANDS[params.brand].name;
        breadcrumbItems.push({ text: pageTitle, link: null });
    } else if (params.category && CATEGORIES[params.category]) {
        pageTitle = CATEGORIES[params.category];
        breadcrumbItems.push({ text: pageTitle, link: null });
    } else {
        breadcrumbItems.push({ text: 'All Products', link: null });
    }

    // Update document title
    document.title = `${pageTitle} - Korea Car Accessory`;

    // Update page title
    const titleElement = document.querySelector('.products-header__title');
    if (titleElement) {
        titleElement.textContent = pageTitle;
    }

    // Update product count
    const countElement = document.querySelector('.products-header__count strong');
    if (countElement) {
        countElement.textContent = productCount;
    }

    // Update breadcrumb
    updateBreadcrumb(breadcrumbItems);

    // Generate products
    generateProducts(params, pageTitle);
}

function updateBreadcrumb(items) {
    const breadcrumbList = document.querySelector('.breadcrumb__list');
    if (!breadcrumbList) return;

    breadcrumbList.innerHTML = items.map((item, index) => {
        if (item.link) {
            return `<li><a href="${item.link}">${item.text}</a></li>`;
        }
        return `<li>${item.text}</li>`;
    }).join('');
}

function generateProducts(params, modelName) {
    const productsGrid = document.querySelector('.products__grid');
    if (!productsGrid) return;

    // Filter products by category if specified
    let products = [...SAMPLE_PRODUCTS];
    if (params.category) {
        products = products.filter(p => p.category === params.category);
    }

    // Generate product cards with dynamic model name
    productsGrid.innerHTML = products.map(product => {
        const productName = modelName !== 'All Products' ? `${modelName} ${product.name}` : product.name;
        const badgeHtml = product.badge ? `<span class="product-card__badge product-card__badge--${product.badge}">${product.badge.toUpperCase()}</span>` : '';
        const priceHtml = product.originalPrice
            ? `<span class="product-card__price-original">$${product.originalPrice.toFixed(2)}</span><span class="product-card__price-sale">$${product.price.toFixed(2)}</span>`
            : `<span class="product-card__price-sale">$${product.price.toFixed(2)}</span>`;
        const stars = '★'.repeat(product.rating) + '☆'.repeat(5 - product.rating);

        return `
            <div class="product-card" data-category="${product.category}">
                <div class="product-card__image">
                    <a href="product-detail.html?id=${product.id}"><img src="https://via.placeholder.com/300x225/f5f5f5/333?text=${product.image}" alt="${productName}"></a>
                    ${badgeHtml}
                    <button class="product-card__wish"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg></button>
                    <div class="product-card__overlay"><button class="btn btn--primary">ADD OPTION</button></div>
                </div>
                <div class="product-card__content">
                    <h3 class="product-card__title"><a href="product-detail.html?id=${product.id}">${productName}</a></h3>
                    <p class="product-card__price">${priceHtml}</p>
                    <div class="product-card__rating"><span class="stars">${stars}</span><span class="count">(${product.reviews})</span></div>
                </div>
            </div>
        `;
    }).join('');
}

function initFilters() {
    const filterCheckboxes = document.querySelectorAll('.filter-checkbox input');
    const applyBtn = document.querySelector('.filter-apply');
    const resetBtn = document.querySelector('.filter-reset');

    // Category filter
    filterCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            // If "All Categories" is checked, uncheck others
            if (this.closest('.filter-checkbox').querySelector('span').textContent.includes('All')) {
                if (this.checked) {
                    filterCheckboxes.forEach(cb => {
                        if (cb !== this) cb.checked = false;
                    });
                }
            } else {
                // Uncheck "All Categories" when specific category is selected
                const allCheckbox = document.querySelector('.filter-checkbox input:first-of-type');
                if (allCheckbox) {
                    const parent = allCheckbox.closest('li');
                    if (parent && parent.querySelector('span').textContent.includes('All')) {
                        allCheckbox.checked = false;
                    }
                }
            }
        });
    });

    // Apply filters
    if (applyBtn) {
        applyBtn.addEventListener('click', function() {
            const selectedCategories = [];
            filterCheckboxes.forEach(checkbox => {
                if (checkbox.checked) {
                    const label = checkbox.closest('.filter-checkbox').querySelector('span').textContent;
                    if (!label.includes('All')) {
                        selectedCategories.push(label.toLowerCase().replace(' ', '-'));
                    }
                }
            });

            // Apply filter to products
            const products = document.querySelectorAll('.product-card');
            products.forEach(product => {
                if (selectedCategories.length === 0) {
                    product.style.display = '';
                } else {
                    const category = product.dataset.category;
                    product.style.display = selectedCategories.some(c => category.includes(c)) ? '' : 'none';
                }
            });

            showNotification('Filters applied');
        });
    }

    // Reset filters
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            filterCheckboxes.forEach((checkbox, index) => {
                checkbox.checked = index === 0; // Only check first (All Categories)
            });

            // Show all products
            document.querySelectorAll('.product-card').forEach(product => {
                product.style.display = '';
            });

            // Reset price inputs
            const priceInputs = document.querySelectorAll('.price-inputs input');
            if (priceInputs.length >= 2) {
                priceInputs[0].value = 0;
                priceInputs[1].value = 1000;
            }

            showNotification('Filters reset');
        });
    }
}

function initViewToggle() {
    const viewBtns = document.querySelectorAll('.view-btn');
    const productsGrid = document.querySelector('.products__grid');

    viewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            viewBtns.forEach(b => b.classList.remove('view-btn--active'));
            this.classList.add('view-btn--active');

            const view = this.dataset.view;
            if (productsGrid) {
                if (view === 'list') {
                    productsGrid.classList.remove('products__grid--4col');
                    productsGrid.classList.add('products__grid--list');
                } else {
                    productsGrid.classList.remove('products__grid--list');
                    productsGrid.classList.add('products__grid--4col');
                }
            }
        });
    });
}

function initSorting() {
    const sortSelect = document.querySelector('.products-sort');

    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            const sortBy = this.value;
            const productsGrid = document.querySelector('.products__grid');
            const products = Array.from(productsGrid.querySelectorAll('.product-card'));

            products.sort((a, b) => {
                const priceA = parseFloat(a.querySelector('.product-card__price-sale').textContent.replace('$', ''));
                const priceB = parseFloat(b.querySelector('.product-card__price-sale').textContent.replace('$', ''));

                switch (sortBy) {
                    case 'price-low':
                        return priceA - priceB;
                    case 'price-high':
                        return priceB - priceA;
                    case 'rating':
                        const ratingA = a.querySelector('.stars').textContent.split('★').length - 1;
                        const ratingB = b.querySelector('.stars').textContent.split('★').length - 1;
                        return ratingB - ratingA;
                    default:
                        return 0;
                }
            });

            products.forEach(product => productsGrid.appendChild(product));
            showNotification(`Sorted by ${sortSelect.options[sortSelect.selectedIndex].text}`);
        });
    }
}

function initPagination() {
    const paginationBtns = document.querySelectorAll('.pagination__num');
    const prevBtn = document.querySelector('.pagination__btn--prev');
    const nextBtn = document.querySelector('.pagination__btn--next');

    paginationBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            paginationBtns.forEach(b => b.classList.remove('pagination__num--active'));
            this.classList.add('pagination__num--active');

            // Scroll to top of products
            document.querySelector('.products-main')?.scrollIntoView({ behavior: 'smooth' });
        });
    });

    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            const activeBtn = document.querySelector('.pagination__num--active');
            const nextSibling = activeBtn?.nextElementSibling;
            if (nextSibling && nextSibling.classList.contains('pagination__num')) {
                activeBtn.classList.remove('pagination__num--active');
                nextSibling.classList.add('pagination__num--active');
            }
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            const activeBtn = document.querySelector('.pagination__num--active');
            const prevSibling = activeBtn?.previousElementSibling;
            if (prevSibling && prevSibling.classList.contains('pagination__num')) {
                activeBtn.classList.remove('pagination__num--active');
                prevSibling.classList.add('pagination__num--active');
            }
        });
    }
}

function initMobileFilter() {
    const filterToggleBtn = document.querySelector('.filter-toggle-btn');
    const sidebar = document.querySelector('.products-sidebar');

    if (filterToggleBtn && sidebar) {
        filterToggleBtn.addEventListener('click', function() {
            sidebar.classList.toggle('products-sidebar--active');
            document.body.classList.toggle('filter-open');
        });

        // Close filter when clicking outside
        document.addEventListener('click', function(e) {
            if (sidebar.classList.contains('products-sidebar--active') &&
                !sidebar.contains(e.target) &&
                !filterToggleBtn.contains(e.target)) {
                sidebar.classList.remove('products-sidebar--active');
                document.body.classList.remove('filter-open');
            }
        });
    }
}

function showNotification(message) {
    // Check if notification function exists from main.js
    if (typeof window.showNotification === 'function') {
        window.showNotification(message);
    } else {
        // Create simple notification
        const existing = document.querySelector('.notification');
        if (existing) existing.remove();

        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: #333;
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        `;
        document.body.appendChild(notification);

        setTimeout(() => notification.remove(), 3000);
    }
}
