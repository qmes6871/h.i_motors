/**
 * H.I Motors Admin Dashboard
 * Complete Admin Management System with localStorage
 */

// ==================== DATA MANAGEMENT ====================
const DataManager = {
    // Default data structure
    defaults: {
        admin: {
            id: 'admin',
            password: 'admin123'
        },
        categories: {
            'aero-parts': 'Aero Parts',
            'exterior': 'Exterior Items',
            'interior': 'Interior Items',
            'led': 'LED Products',
            'tuning': 'Tuning Parts',
            'other': 'Other'
        },
        brands: {
            'hyundai': { name: 'Hyundai Motors', models: ['Palisade', 'Santa Fe', 'Tucson', 'Ioniq 5', 'Ioniq 6', 'Ioniq 9', 'Staria', 'Kona'] },
            'genesis': { name: 'Genesis', models: ['GV80', 'GV70', 'GV60', 'G90', 'G80', 'G70'] },
            'kia': { name: 'Kia Motors', models: ['Carnival', 'K5', 'Seltos', 'Sorento', 'Sportage', 'EV6', 'EV9', 'Niro'] },
            'kgm': { name: 'KGM Motors', models: ['Torres', 'Musso', 'Rexton', 'Tivoli', 'Korando'] },
            'chevy': { name: 'Chevy Korea', models: ['Trax', 'Trailblazer'] },
            'renault': { name: 'Renault Korea', models: ['Grand Koleos', 'Koleos', 'Talisman'] }
        },
        products: [
            { id: 1, name: 'Front Lip Spoiler - Carbon', category: 'aero-parts', brand: 'hyundai', model: 'Palisade', price: 450, originalPrice: null, badge: 'new', stock: 50, image: 'https://via.placeholder.com/100x100/f5f5f5/333?text=Spoiler', description: 'Premium carbon fiber front lip spoiler' },
            { id: 2, name: 'Side Skirt Extension Kit', category: 'aero-parts', brand: 'hyundai', model: 'Santa Fe', price: 380, originalPrice: 420, badge: null, stock: 30, image: 'https://via.placeholder.com/100x100/f5f5f5/333?text=Skirt', description: 'Aerodynamic side skirt extension' },
            { id: 3, name: 'Rear Diffuser - Matte Black', category: 'aero-parts', brand: 'genesis', model: 'GV80', price: 299, originalPrice: 350, badge: 'sale', stock: 25, image: 'https://via.placeholder.com/100x100/f5f5f5/333?text=Diffuser', description: 'Matte black rear diffuser' },
            { id: 4, name: 'Premium All Weather Floor Mat Set', category: 'interior', brand: 'kia', model: 'Carnival', price: 189, originalPrice: null, badge: null, stock: 100, image: 'https://via.placeholder.com/100x100/f5f5f5/333?text=Mat', description: 'All weather protection floor mats' },
            { id: 5, name: 'Premium LED Interior Light Kit', category: 'led', brand: '', model: '', price: 125, originalPrice: null, badge: 'hot', stock: 80, image: 'https://via.placeholder.com/100x100/f5f5f5/333?text=LED', description: 'Complete LED interior upgrade kit' },
            { id: 6, name: 'Trunk Cargo Mat - All Weather', category: 'interior', brand: 'hyundai', model: 'Tucson', price: 89, originalPrice: null, badge: null, stock: 60, image: 'https://via.placeholder.com/100x100/f5f5f5/333?text=Cargo', description: 'Weather resistant trunk cargo mat' },
            { id: 7, name: 'LED Door Sill Protector Set', category: 'led', brand: '', model: '', price: 145, originalPrice: null, badge: null, stock: 45, image: 'https://via.placeholder.com/100x100/f5f5f5/333?text=Sill', description: 'Illuminated door sill protectors' },
            { id: 8, name: 'Custom Front Grille - Gloss Black', category: 'exterior', brand: 'kia', model: 'Sportage', price: 320, originalPrice: null, badge: null, stock: 20, image: 'https://via.placeholder.com/100x100/f5f5f5/333?text=Grille', description: 'Glossy black custom front grille' },
            { id: 9, name: 'Chrome Door Handle Cover Set', category: 'exterior', brand: '', model: '', price: 85, originalPrice: null, badge: null, stock: 70, image: 'https://via.placeholder.com/100x100/f5f5f5/333?text=Handle', description: 'Chrome plated door handle covers' },
            { id: 10, name: 'LED Fog Light Kit - 6000K', category: 'led', brand: '', model: '', price: 165, originalPrice: 195, badge: 'sale', stock: 55, image: 'https://via.placeholder.com/100x100/f5f5f5/333?text=Fog', description: '6000K white LED fog light kit' },
            { id: 11, name: 'Sport Steering Wheel Cover', category: 'interior', brand: '', model: '', price: 79, originalPrice: null, badge: null, stock: 90, image: 'https://via.placeholder.com/100x100/f5f5f5/333?text=Wheel', description: 'Premium leather steering wheel cover' },
            { id: 12, name: 'Performance Air Intake System', category: 'tuning', brand: 'genesis', model: 'GV70', price: 385, originalPrice: null, badge: 'new', stock: 15, image: 'https://via.placeholder.com/100x100/f5f5f5/333?text=Intake', description: 'High flow air intake system' }
        ],
        members: [
            { id: 1, name: 'John Smith', email: 'john@example.com', phone: '010-1234-5678', address: '123 Main St, Seoul', password: 'password123', joinedDate: '2025-12-15', orders: 3 },
            { id: 2, name: 'Sarah Kim', email: 'sarah@example.com', phone: '010-2345-6789', address: '456 Oak Ave, Busan', password: 'password123', joinedDate: '2025-12-20', orders: 5 },
            { id: 3, name: 'Mike Lee', email: 'mike@example.com', phone: '010-3456-7890', address: '789 Pine Rd, Incheon', password: 'password123', joinedDate: '2026-01-05', orders: 1 }
        ],
        orders: [
            { id: 'ORD-001', memberId: 1, products: [{ productId: 1, quantity: 1, price: 450 }, { productId: 5, quantity: 2, price: 125 }], total: 700, status: 'delivered', date: '2026-01-15', shippingAddress: '123 Main St, Seoul' },
            { id: 'ORD-002', memberId: 2, products: [{ productId: 4, quantity: 1, price: 189 }], total: 189, status: 'shipped', date: '2026-01-20', shippingAddress: '456 Oak Ave, Busan' },
            { id: 'ORD-003', memberId: 2, products: [{ productId: 3, quantity: 1, price: 299 }, { productId: 8, quantity: 1, price: 320 }], total: 619, status: 'processing', date: '2026-01-25', shippingAddress: '456 Oak Ave, Busan' },
            { id: 'ORD-004', memberId: 3, products: [{ productId: 10, quantity: 1, price: 165 }], total: 165, status: 'pending', date: '2026-01-28', shippingAddress: '789 Pine Rd, Incheon' }
        ]
    },

    // Initialize data
    init() {
        if (!localStorage.getItem('hiMotors_initialized')) {
            this.resetToDefaults();
            localStorage.setItem('hiMotors_initialized', 'true');
        }
    },

    // Reset to default data
    resetToDefaults() {
        localStorage.setItem('hiMotors_admin', JSON.stringify(this.defaults.admin));
        localStorage.setItem('hiMotors_categories', JSON.stringify(this.defaults.categories));
        localStorage.setItem('hiMotors_brands', JSON.stringify(this.defaults.brands));
        localStorage.setItem('hiMotors_products', JSON.stringify(this.defaults.products));
        localStorage.setItem('hiMotors_members', JSON.stringify(this.defaults.members));
        localStorage.setItem('hiMotors_orders', JSON.stringify(this.defaults.orders));
    },

    // Get data
    get(key) {
        const data = localStorage.getItem(`hiMotors_${key}`);
        return data ? JSON.parse(data) : null;
    },

    // Set data
    set(key, data) {
        localStorage.setItem(`hiMotors_${key}`, JSON.stringify(data));
    },

    // Export all data
    exportAll() {
        return {
            admin: this.get('admin'),
            categories: this.get('categories'),
            brands: this.get('brands'),
            products: this.get('products'),
            members: this.get('members'),
            orders: this.get('orders')
        };
    },

    // Import data
    importAll(data) {
        if (data.admin) this.set('admin', data.admin);
        if (data.categories) this.set('categories', data.categories);
        if (data.brands) this.set('brands', data.brands);
        if (data.products) this.set('products', data.products);
        if (data.members) this.set('members', data.members);
        if (data.orders) this.set('orders', data.orders);
    }
};

// ==================== UTILITY FUNCTIONS ====================
function showNotification(message, type = '') {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = 'notification show ' + type;

    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' });
}

function formatCurrency(amount) {
    return '$' + parseFloat(amount).toFixed(2);
}

function generateId(prefix) {
    return prefix + '-' + Date.now().toString(36).toUpperCase();
}

// ==================== MODAL MANAGEMENT ====================
function openModal(modalId) {
    document.getElementById(modalId).classList.add('active');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

function closeAllModals() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.classList.remove('active');
    });
}

// ==================== CONFIRM DIALOG ====================
let confirmCallback = null;

function showConfirm(message, callback) {
    document.getElementById('confirmMessage').textContent = message;
    confirmCallback = callback;
    openModal('confirmDialog');
}

// ==================== DASHBOARD ====================
function updateDashboard() {
    const products = DataManager.get('products') || [];
    const members = DataManager.get('members') || [];
    const orders = DataManager.get('orders') || [];

    // Update stats
    document.getElementById('totalProducts').textContent = products.length;
    document.getElementById('totalMembers').textContent = members.length;
    document.getElementById('totalOrders').textContent = orders.length;

    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    document.getElementById('totalRevenue').textContent = formatCurrency(totalRevenue);

    // Recent orders
    const recentOrdersTable = document.getElementById('recentOrdersTable');
    const recentOrders = orders.slice(-5).reverse();

    if (recentOrders.length === 0) {
        recentOrdersTable.innerHTML = '<tr><td colspan="4" class="empty-message">주문이 없습니다</td></tr>';
    } else {
        recentOrdersTable.innerHTML = recentOrders.map(order => {
            const member = members.find(m => m.id === order.memberId);
            return `
                <tr>
                    <td>${order.id}</td>
                    <td>${member ? member.name : '알 수 없음'}</td>
                    <td>${formatCurrency(order.total)}</td>
                    <td><span class="status-badge ${order.status}">${order.status}</span></td>
                </tr>
            `;
        }).join('');
    }

    // Recent members
    const recentMembersTable = document.getElementById('recentMembersTable');
    const recentMembers = members.slice(-5).reverse();

    if (recentMembers.length === 0) {
        recentMembersTable.innerHTML = '<tr><td colspan="3" class="empty-message">회원이 없습니다</td></tr>';
    } else {
        recentMembersTable.innerHTML = recentMembers.map(member => `
            <tr>
                <td>${member.name}</td>
                <td>${member.email}</td>
                <td>${formatDate(member.joinedDate)}</td>
            </tr>
        `).join('');
    }
}

// ==================== PRODUCTS ====================
function renderProducts(searchTerm = '') {
    const products = DataManager.get('products') || [];
    const categories = DataManager.get('categories') || {};
    const brands = DataManager.get('brands') || {};
    const productsTable = document.getElementById('productsTable');

    let filtered = products;
    if (searchTerm) {
        const term = searchTerm.toLowerCase();
        filtered = products.filter(p =>
            p.name.toLowerCase().includes(term) ||
            (categories[p.category] || '').toLowerCase().includes(term) ||
            (brands[p.brand]?.name || '').toLowerCase().includes(term)
        );
    }

    if (filtered.length === 0) {
        productsTable.innerHTML = '<tr><td colspan="8" class="empty-message">상품이 없습니다</td></tr>';
        return;
    }

    productsTable.innerHTML = filtered.map(product => `
        <tr>
            <td>${product.id}</td>
            <td><img src="${product.image || 'https://via.placeholder.com/50x50/f5f5f5/333?text=No+Image'}" alt="${product.name}"></td>
            <td>${product.name}</td>
            <td>${categories[product.category] || product.category}</td>
            <td>${brands[product.brand]?.name || '-'}</td>
            <td>${formatCurrency(product.price)}${product.originalPrice ? '<br><s style="color:#999;font-size:11px;">' + formatCurrency(product.originalPrice) + '</s>' : ''}</td>
            <td>${product.stock}</td>
            <td>
                <div class="action-btns">
                    <button class="action-btn edit" onclick="editProduct(${product.id})" title="Edit">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                    </button>
                    <button class="action-btn delete" onclick="deleteProduct(${product.id})" title="Delete">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

function populateProductForm() {
    const categories = DataManager.get('categories') || {};
    const brands = DataManager.get('brands') || {};

    const categorySelect = document.getElementById('productCategory');
    categorySelect.innerHTML = '<option value="">카테고리 선택</option>' +
        Object.entries(categories).map(([key, name]) =>
            `<option value="${key}">${name}</option>`
        ).join('');

    const brandSelect = document.getElementById('productBrand');
    brandSelect.innerHTML = '<option value="">브랜드 선택 (선택사항)</option>' +
        Object.entries(brands).map(([key, data]) =>
            `<option value="${key}">${data.name}</option>`
        ).join('');

    // Update models when brand changes
    brandSelect.addEventListener('change', function() {
        const modelSelect = document.getElementById('productModel');
        const selectedBrand = brands[this.value];

        if (selectedBrand && selectedBrand.models) {
            modelSelect.innerHTML = '<option value="">모델 선택</option>' +
                selectedBrand.models.map(model =>
                    `<option value="${model}">${model}</option>`
                ).join('');
        } else {
            modelSelect.innerHTML = '<option value="">브랜드를 먼저 선택하세요</option>';
        }
    });
}

function openProductModal(product = null) {
    populateProductForm();

    const form = document.getElementById('productForm');
    const title = document.getElementById('productModalTitle');

    if (product) {
        title.textContent = '상품 수정';
        document.getElementById('productId').value = product.id;
        document.getElementById('productName').value = product.name;
        document.getElementById('productCategory').value = product.category;
        document.getElementById('productBrand').value = product.brand || '';

        // Trigger model update
        const brandEvent = new Event('change');
        document.getElementById('productBrand').dispatchEvent(brandEvent);

        setTimeout(() => {
            document.getElementById('productModel').value = product.model || '';
        }, 100);

        document.getElementById('productPrice').value = product.price;
        document.getElementById('productOriginalPrice').value = product.originalPrice || '';
        document.getElementById('productStock').value = product.stock;
        document.getElementById('productBadge').value = product.badge || '';
        document.getElementById('productImage').value = product.image || '';
        document.getElementById('productDescription').value = product.description || '';
    } else {
        title.textContent = '상품 추가';
        form.reset();
        document.getElementById('productId').value = '';
    }

    openModal('productModal');
}

function saveProduct(e) {
    e.preventDefault();

    const products = DataManager.get('products') || [];
    const productId = document.getElementById('productId').value;

    const productData = {
        name: document.getElementById('productName').value,
        category: document.getElementById('productCategory').value,
        brand: document.getElementById('productBrand').value,
        model: document.getElementById('productModel').value,
        price: parseFloat(document.getElementById('productPrice').value),
        originalPrice: document.getElementById('productOriginalPrice').value ? parseFloat(document.getElementById('productOriginalPrice').value) : null,
        stock: parseInt(document.getElementById('productStock').value),
        badge: document.getElementById('productBadge').value || null,
        image: document.getElementById('productImage').value || 'https://via.placeholder.com/100x100/f5f5f5/333?text=Product',
        description: document.getElementById('productDescription').value
    };

    if (productId) {
        // Update existing
        const index = products.findIndex(p => p.id === parseInt(productId));
        if (index !== -1) {
            products[index] = { ...products[index], ...productData };
        }
        showNotification('상품이 수정되었습니다', 'success');
    } else {
        // Add new
        const maxId = products.reduce((max, p) => Math.max(max, p.id), 0);
        productData.id = maxId + 1;
        products.push(productData);
        showNotification('상품이 추가되었습니다', 'success');
    }

    DataManager.set('products', products);
    closeModal('productModal');
    renderProducts();
    updateDashboard();
}

function editProduct(id) {
    const products = DataManager.get('products') || [];
    const product = products.find(p => p.id === id);
    if (product) {
        openProductModal(product);
    }
}

function deleteProduct(id) {
    showConfirm('이 상품을 삭제하시겠습니까?', () => {
        const products = DataManager.get('products') || [];
        const filtered = products.filter(p => p.id !== id);
        DataManager.set('products', filtered);
        renderProducts();
        updateDashboard();
        showNotification('상품이 삭제되었습니다', 'success');
    });
}

// ==================== MEMBERS ====================
function renderMembers(searchTerm = '') {
    const members = DataManager.get('members') || [];
    const membersTable = document.getElementById('membersTable');

    let filtered = members;
    if (searchTerm) {
        const term = searchTerm.toLowerCase();
        filtered = members.filter(m =>
            m.name.toLowerCase().includes(term) ||
            m.email.toLowerCase().includes(term) ||
            (m.phone || '').includes(term)
        );
    }

    if (filtered.length === 0) {
        membersTable.innerHTML = '<tr><td colspan="7" class="empty-message">회원이 없습니다</td></tr>';
        return;
    }

    membersTable.innerHTML = filtered.map(member => `
        <tr>
            <td>${member.id}</td>
            <td>${member.name}</td>
            <td>${member.email}</td>
            <td>${member.phone || '-'}</td>
            <td>${formatDate(member.joinedDate)}</td>
            <td>${member.orders || 0}</td>
            <td>
                <div class="action-btns">
                    <button class="action-btn edit" onclick="editMember(${member.id})" title="Edit">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                    </button>
                    <button class="action-btn delete" onclick="deleteMember(${member.id})" title="Delete">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

function openMemberModal(member = null) {
    const form = document.getElementById('memberForm');
    const title = document.getElementById('memberModalTitle');

    if (member) {
        title.textContent = '회원 수정';
        document.getElementById('memberId').value = member.id;
        document.getElementById('memberName').value = member.name;
        document.getElementById('memberEmail').value = member.email;
        document.getElementById('memberPhone').value = member.phone || '';
        document.getElementById('memberAddress').value = member.address || '';
        document.getElementById('memberPassword').value = '';
    } else {
        title.textContent = '회원 추가';
        form.reset();
        document.getElementById('memberId').value = '';
    }

    openModal('memberModal');
}

function saveMember(e) {
    e.preventDefault();

    const members = DataManager.get('members') || [];
    const memberId = document.getElementById('memberId').value;

    const memberData = {
        name: document.getElementById('memberName').value,
        email: document.getElementById('memberEmail').value,
        phone: document.getElementById('memberPhone').value,
        address: document.getElementById('memberAddress').value
    };

    const password = document.getElementById('memberPassword').value;

    if (memberId) {
        // Update existing
        const index = members.findIndex(m => m.id === parseInt(memberId));
        if (index !== -1) {
            members[index] = { ...members[index], ...memberData };
            if (password) {
                members[index].password = password;
            }
        }
        showNotification('회원 정보가 수정되었습니다', 'success');
    } else {
        // Add new
        const maxId = members.reduce((max, m) => Math.max(max, m.id), 0);
        memberData.id = maxId + 1;
        memberData.password = password || 'password123';
        memberData.joinedDate = new Date().toISOString().split('T')[0];
        memberData.orders = 0;
        members.push(memberData);
        showNotification('회원이 추가되었습니다', 'success');
    }

    DataManager.set('members', members);
    closeModal('memberModal');
    renderMembers();
    updateDashboard();
}

function editMember(id) {
    const members = DataManager.get('members') || [];
    const member = members.find(m => m.id === id);
    if (member) {
        openMemberModal(member);
    }
}

function deleteMember(id) {
    showConfirm('이 회원을 삭제하시겠습니까?', () => {
        const members = DataManager.get('members') || [];
        const filtered = members.filter(m => m.id !== id);
        DataManager.set('members', filtered);
        renderMembers();
        updateDashboard();
        showNotification('회원이 삭제되었습니다', 'success');
    });
}

// ==================== ORDERS ====================
function renderOrders(searchTerm = '', statusFilter = '') {
    const orders = DataManager.get('orders') || [];
    const members = DataManager.get('members') || [];
    const products = DataManager.get('products') || [];
    const ordersTable = document.getElementById('ordersTable');

    let filtered = orders;

    if (statusFilter) {
        filtered = filtered.filter(o => o.status === statusFilter);
    }

    if (searchTerm) {
        const term = searchTerm.toLowerCase();
        filtered = filtered.filter(o => {
            const member = members.find(m => m.id === o.memberId);
            return o.id.toLowerCase().includes(term) ||
                   (member?.name || '').toLowerCase().includes(term) ||
                   (member?.email || '').toLowerCase().includes(term);
        });
    }

    if (filtered.length === 0) {
        ordersTable.innerHTML = '<tr><td colspan="7" class="empty-message">주문이 없습니다</td></tr>';
        return;
    }

    ordersTable.innerHTML = filtered.map(order => {
        const member = members.find(m => m.id === order.memberId);
        const productNames = order.products.map(op => {
            const product = products.find(p => p.id === op.productId);
            return product ? `${product.name} x${op.quantity}` : '알 수 없는 상품';
        }).join('<br>');

        return `
            <tr>
                <td>${order.id}</td>
                <td>${member ? member.name : '알 수 없음'}<br><small style="color:#999;">${member ? member.email : ''}</small></td>
                <td style="font-size:12px;">${productNames}</td>
                <td>${formatCurrency(order.total)}</td>
                <td>${formatDate(order.date)}</td>
                <td><span class="status-badge ${order.status}">${order.status}</span></td>
                <td>
                    <div class="action-btns">
                        <button class="action-btn view" onclick="viewOrder('${order.id}')" title="View Details">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                        </button>
                        <button class="action-btn delete" onclick="deleteOrder('${order.id}')" title="Delete">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="3 6 5 6 21 6"></polyline>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            </svg>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

function viewOrder(orderId) {
    const orders = DataManager.get('orders') || [];
    const members = DataManager.get('members') || [];
    const products = DataManager.get('products') || [];

    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    const member = members.find(m => m.id === order.memberId);

    const statusLabels = {
        pending: '주문접수',
        processing: '처리중',
        shipped: '배송중',
        delivered: '배송완료',
        cancelled: '취소'
    };

    const orderDetails = document.getElementById('orderDetails');
    orderDetails.innerHTML = `
        <div class="order-info">
            <div class="order-info-card">
                <h4>주문 정보</h4>
                <p><strong>주문번호:</strong> ${order.id}</p>
                <p><strong>주문일:</strong> ${formatDate(order.date)}</p>
                <p><strong>상태:</strong> <span class="status-badge ${order.status}">${statusLabels[order.status] || order.status}</span></p>
            </div>
            <div class="order-info-card">
                <h4>고객 정보</h4>
                <p><strong>이름:</strong> ${member ? member.name : '알 수 없음'}</p>
                <p><strong>이메일:</strong> ${member ? member.email : '-'}</p>
                <p><strong>연락처:</strong> ${member ? member.phone : '-'}</p>
            </div>
            <div class="order-info-card">
                <h4>배송 주소</h4>
                <p>${order.shippingAddress || '-'}</p>
            </div>
            <div class="order-info-card">
                <h4>주문 금액</h4>
                <p style="font-size:24px;font-weight:700;color:#1a1a2e;">${formatCurrency(order.total)}</p>
            </div>
        </div>

        <div class="order-products">
            <h4>주문 상품</h4>
            <table class="data-table">
                <thead>
                    <tr>
                        <th>상품명</th>
                        <th>수량</th>
                        <th>단가</th>
                        <th>소계</th>
                    </tr>
                </thead>
                <tbody>
                    ${order.products.map(op => {
                        const product = products.find(p => p.id === op.productId);
                        return `
                            <tr>
                                <td>${product ? product.name : '알 수 없는 상품'}</td>
                                <td>${op.quantity}</td>
                                <td>${formatCurrency(op.price)}</td>
                                <td>${formatCurrency(op.price * op.quantity)}</td>
                            </tr>
                        `;
                    }).join('')}
                </tbody>
            </table>
        </div>

        <div class="order-status-select">
            <label>상태 변경:</label>
            <select id="orderStatusUpdate" onchange="updateOrderStatus('${order.id}', this.value)">
                <option value="pending" ${order.status === 'pending' ? 'selected' : ''}>주문접수</option>
                <option value="processing" ${order.status === 'processing' ? 'selected' : ''}>처리중</option>
                <option value="shipped" ${order.status === 'shipped' ? 'selected' : ''}>배송중</option>
                <option value="delivered" ${order.status === 'delivered' ? 'selected' : ''}>배송완료</option>
                <option value="cancelled" ${order.status === 'cancelled' ? 'selected' : ''}>취소</option>
            </select>
        </div>
    `;

    openModal('orderModal');
}

function updateOrderStatus(orderId, newStatus) {
    const orders = DataManager.get('orders') || [];
    const index = orders.findIndex(o => o.id === orderId);

    if (index !== -1) {
        orders[index].status = newStatus;
        DataManager.set('orders', orders);
        renderOrders();
        showNotification('주문 상태가 변경되었습니다', 'success');
    }
}

function deleteOrder(orderId) {
    showConfirm('이 주문을 삭제하시겠습니까?', () => {
        const orders = DataManager.get('orders') || [];
        const filtered = orders.filter(o => o.id !== orderId);
        DataManager.set('orders', filtered);
        renderOrders();
        updateDashboard();
        showNotification('주문이 삭제되었습니다', 'success');
    });
}

// ==================== CATEGORIES & BRANDS ====================
function renderCategories() {
    const categories = DataManager.get('categories') || {};
    const categoryList = document.getElementById('categoryList');

    categoryList.innerHTML = Object.entries(categories).map(([key, name]) => `
        <li>
            <div class="category-info">
                <span>${name}</span>
                <span class="category-key">${key}</span>
            </div>
            <div class="action-btns">
                <button class="action-btn edit" onclick="editCategory('${key}', 'category')" title="Edit">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                </button>
                <button class="action-btn delete" onclick="deleteCategory('${key}', 'category')" title="Delete">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                </button>
            </div>
        </li>
    `).join('');
}

function renderBrands() {
    const brands = DataManager.get('brands') || {};
    const brandList = document.getElementById('brandList');

    brandList.innerHTML = Object.entries(brands).map(([key, data]) => `
        <li>
            <div class="category-info">
                <span>${data.name}</span>
                <span class="category-key">${key} (${data.models?.length || 0} models)</span>
            </div>
            <div class="action-btns">
                <button class="action-btn edit" onclick="editCategory('${key}', 'brand')" title="Edit">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                </button>
                <button class="action-btn delete" onclick="deleteCategory('${key}', 'brand')" title="Delete">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                </button>
            </div>
        </li>
    `).join('');
}

function openCategoryModal(type, key = null) {
    const title = document.getElementById('categoryModalTitle');
    const form = document.getElementById('categoryForm');

    document.getElementById('categoryType').value = type;

    if (key) {
        title.textContent = type === 'category' ? '카테고리 수정' : '브랜드 수정';
        document.getElementById('categoryEditId').value = key;
        document.getElementById('categoryKey').value = key;
        document.getElementById('categoryKey').disabled = true;

        if (type === 'category') {
            const categories = DataManager.get('categories') || {};
            document.getElementById('categoryName').value = categories[key] || '';
        } else {
            const brands = DataManager.get('brands') || {};
            document.getElementById('categoryName').value = brands[key]?.name || '';
        }
    } else {
        title.textContent = type === 'category' ? '카테고리 추가' : '브랜드 추가';
        form.reset();
        document.getElementById('categoryEditId').value = '';
        document.getElementById('categoryKey').disabled = false;
    }

    openModal('categoryModal');
}

function saveCategory(e) {
    e.preventDefault();

    const type = document.getElementById('categoryType').value;
    const editId = document.getElementById('categoryEditId').value;
    const key = document.getElementById('categoryKey').value.toLowerCase().replace(/\s+/g, '-');
    const name = document.getElementById('categoryName').value;

    if (type === 'category') {
        const categories = DataManager.get('categories') || {};

        if (editId && editId !== key) {
            delete categories[editId];
        }

        categories[key] = name;
        DataManager.set('categories', categories);
        renderCategories();
    } else {
        const brands = DataManager.get('brands') || {};

        if (editId && editId !== key) {
            const oldModels = brands[editId]?.models || [];
            delete brands[editId];
            brands[key] = { name, models: oldModels };
        } else if (brands[key]) {
            brands[key].name = name;
        } else {
            brands[key] = { name, models: [] };
        }

        DataManager.set('brands', brands);
        renderBrands();
    }

    closeModal('categoryModal');
    showNotification(`${type === 'category' ? '카테고리' : '브랜드'}가 저장되었습니다`, 'success');
}

function editCategory(key, type) {
    openCategoryModal(type, key);
}

function deleteCategory(key, type) {
    showConfirm(`이 ${type === 'category' ? '카테고리' : '브랜드'}를 삭제하시겠습니까?`, () => {
        if (type === 'category') {
            const categories = DataManager.get('categories') || {};
            delete categories[key];
            DataManager.set('categories', categories);
            renderCategories();
        } else {
            const brands = DataManager.get('brands') || {};
            delete brands[key];
            DataManager.set('brands', brands);
            renderBrands();
        }
        showNotification(`${type === 'category' ? '카테고리' : '브랜드'}가 삭제되었습니다`, 'success');
    });
}

// ==================== SETTINGS ====================
function saveSettings(e) {
    e.preventDefault();

    const admin = DataManager.get('admin') || {};
    const currentPassword = document.getElementById('settingsCurrentPassword').value;
    const newId = document.getElementById('settingsAdminId').value;
    const newPassword = document.getElementById('settingsNewPassword').value;
    const confirmPassword = document.getElementById('settingsConfirmPassword').value;

    if (currentPassword !== admin.password) {
        showNotification('현재 비밀번호가 올바르지 않습니다', 'error');
        return;
    }

    if (newPassword && newPassword !== confirmPassword) {
        showNotification('새 비밀번호가 일치하지 않습니다', 'error');
        return;
    }

    if (newId) {
        admin.id = newId;
    }

    if (newPassword) {
        admin.password = newPassword;
    }

    DataManager.set('admin', admin);
    document.getElementById('settingsForm').reset();
    showNotification('설정이 저장되었습니다', 'success');
}

function exportData() {
    const data = DataManager.exportAll();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `hiMotors_backup_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showNotification('데이터가 내보내기되었습니다', 'success');
}

function importData(file) {
    const reader = new FileReader();

    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            DataManager.importAll(data);

            // Refresh all views
            updateDashboard();
            renderProducts();
            renderMembers();
            renderOrders();
            renderCategories();
            renderBrands();

            showNotification('데이터를 가져왔습니다', 'success');
        } catch (error) {
            showNotification('잘못된 파일 형식입니다', 'error');
        }
    };

    reader.readAsText(file);
}

function resetAllData() {
    showConfirm('모든 데이터가 초기화됩니다. 계속하시겠습니까?', () => {
        DataManager.resetToDefaults();

        // Refresh all views
        updateDashboard();
        renderProducts();
        renderMembers();
        renderOrders();
        renderCategories();
        renderBrands();

        showNotification('모든 데이터가 초기화되었습니다', 'success');
    });
}

// ==================== AUTHENTICATION ====================
function checkAuth() {
    const isLoggedIn = sessionStorage.getItem('hiMotors_adminLoggedIn');

    if (isLoggedIn) {
        document.getElementById('loginScreen').style.display = 'none';
        document.getElementById('adminDashboard').style.display = 'flex';
        initDashboard();
    }
}

function login(e) {
    e.preventDefault();

    const admin = DataManager.get('admin') || DataManager.defaults.admin;
    const inputId = document.getElementById('adminId').value;
    const inputPassword = document.getElementById('adminPassword').value;

    if (inputId === admin.id && inputPassword === admin.password) {
        sessionStorage.setItem('hiMotors_adminLoggedIn', 'true');
        document.getElementById('loginScreen').style.display = 'none';
        document.getElementById('adminDashboard').style.display = 'flex';
        initDashboard();
        showNotification('관리자 페이지에 오신 것을 환영합니다', 'success');
    } else {
        showNotification('ID 또는 비밀번호가 올바르지 않습니다', 'error');
    }
}

function logout() {
    sessionStorage.removeItem('hiMotors_adminLoggedIn');
    document.getElementById('adminDashboard').style.display = 'none';
    document.getElementById('loginScreen').style.display = 'flex';
    document.getElementById('adminLoginForm').reset();
    showNotification('로그아웃되었습니다');
}

// ==================== NAVIGATION ====================
function switchSection(sectionId) {
    // Update nav items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelector(`.nav-item[data-section="${sectionId}"]`)?.classList.add('active');

    // Update sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(`${sectionId}Section`)?.classList.add('active');

    // Update title
    const titles = {
        dashboard: '대시보드',
        products: '상품 관리',
        members: '회원 관리',
        orders: '주문 관리',
        categories: '카테고리/브랜드',
        settings: '설정'
    };
    document.getElementById('sectionTitle').textContent = titles[sectionId] || sectionId;

    // Close mobile sidebar
    document.querySelector('.sidebar')?.classList.remove('active');
    document.querySelector('.sidebar-overlay')?.classList.remove('active');
}

// ==================== INITIALIZATION ====================
function initDashboard() {
    updateDashboard();
    renderProducts();
    renderMembers();
    renderOrders();
    renderCategories();
    renderBrands();
}

document.addEventListener('DOMContentLoaded', function() {
    // Initialize data
    DataManager.init();

    // Check authentication
    checkAuth();

    // Login form
    document.getElementById('adminLoginForm').addEventListener('submit', login);

    // Logout
    document.getElementById('logoutBtn').addEventListener('click', logout);

    // Navigation
    document.querySelectorAll('.nav-item[data-section]').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            switchSection(this.dataset.section);
        });
    });

    // Sidebar toggle (mobile)
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');

    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');

            // Create/toggle overlay
            let overlay = document.querySelector('.sidebar-overlay');
            if (!overlay) {
                overlay = document.createElement('div');
                overlay.className = 'sidebar-overlay';
                document.body.appendChild(overlay);
                overlay.addEventListener('click', function() {
                    sidebar.classList.remove('active');
                    overlay.classList.remove('active');
                });
            }
            overlay.classList.toggle('active');
        });
    }

    // Product form
    document.getElementById('addProductBtn').addEventListener('click', () => openProductModal());
    document.getElementById('productForm').addEventListener('submit', saveProduct);

    // Member form
    document.getElementById('addMemberBtn').addEventListener('click', () => openMemberModal());
    document.getElementById('memberForm').addEventListener('submit', saveMember);

    // Category form
    document.getElementById('addCategoryBtn').addEventListener('click', () => openCategoryModal('category'));
    document.getElementById('addBrandBtn').addEventListener('click', () => openCategoryModal('brand'));
    document.getElementById('categoryForm').addEventListener('submit', saveCategory);

    // Settings form
    document.getElementById('settingsForm').addEventListener('submit', saveSettings);

    // Data management
    document.getElementById('exportDataBtn').addEventListener('click', exportData);
    document.getElementById('importDataBtn').addEventListener('click', () => {
        document.getElementById('importFileInput').click();
    });
    document.getElementById('importFileInput').addEventListener('change', function() {
        if (this.files[0]) {
            importData(this.files[0]);
        }
    });
    document.getElementById('resetDataBtn').addEventListener('click', resetAllData);

    // Search functionality
    document.getElementById('productSearch').addEventListener('input', function() {
        renderProducts(this.value);
    });

    document.getElementById('memberSearch').addEventListener('input', function() {
        renderMembers(this.value);
    });

    document.getElementById('orderSearch').addEventListener('input', function() {
        const statusFilter = document.getElementById('orderStatusFilter').value;
        renderOrders(this.value, statusFilter);
    });

    document.getElementById('orderStatusFilter').addEventListener('change', function() {
        const searchTerm = document.getElementById('orderSearch').value;
        renderOrders(searchTerm, this.value);
    });

    // Modal close buttons
    document.querySelectorAll('.modal-close, .modal-cancel').forEach(btn => {
        btn.addEventListener('click', closeAllModals);
    });

    // Close modal on outside click
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeAllModals();
            }
        });
    });

    // Confirm dialog
    document.getElementById('confirmCancel').addEventListener('click', closeAllModals);
    document.getElementById('confirmOk').addEventListener('click', function() {
        if (confirmCallback) {
            confirmCallback();
            confirmCallback = null;
        }
        closeAllModals();
    });
});
