/**
 * Shop Page Logic
 * Handles product display, filtering, and category management
 */

// State
let allProducts = [];
let categories = [];
let currentCategory = 'all';

// DOM Elements
const productsGrid = document.getElementById('productsGrid');
const productsLoading = document.getElementById('productsLoading');
const emptyState = document.getElementById('emptyState');
const dynamicFilterTabs = document.getElementById('dynamicFilterTabs');
const categoriesGrid = document.getElementById('categoriesGrid');

// Category colors for placeholders
const categoryColors = {
    'Odzież': '#3b82f6',
    'Sport': '#10b981',
    'Akcesoria': '#f59e0b',
    'Obuwie': '#8b5cf6',
    'Spodnie': '#ec4899'
};

/**
 * Initialize the shop page
 */
async function initShop() {
    // Initialize chat
    new ChatWidget('#chatPanel');

    // Load products
    await loadProducts();

    // Bind filter events
    bindFilterEvents();
}

/**
 * Load products from API
 */
async function loadProducts() {
    showLoading(true);

    try {
        const data = await API.getProducts();
        allProducts = data.products || [];
        categories = data.categories || [];

        renderCategories();
        renderProducts(allProducts);
    } catch (error) {
        console.error('Failed to load products:', error);
        showError('Nie udało się załadować produktów. Upewnij się, że serwer n8n jest uruchomiony.');
    } finally {
        showLoading(false);
    }
}

/**
 * Render category filter tabs
 */
function renderCategories() {
    // Add dynamic filter tabs
    if (dynamicFilterTabs) {
        dynamicFilterTabs.innerHTML = categories.map(category =>
            `<button class="filter-tab" data-category="${category}">${category}</button>`
        ).join('');
    }
}

/**
 * Render products grid
 */
function renderProducts(products) {
    // Clear grid (except loading)
    const cards = productsGrid.querySelectorAll('.product-card');
    cards.forEach(card => card.remove());

    if (products.length === 0) {
        emptyState.style.display = 'block';
        return;
    }

    emptyState.style.display = 'none';

    products.forEach(product => {
        const card = createProductCard(product);
        productsGrid.appendChild(card);
    });
}

/**
 * Create a product card element
 */
function createProductCard(product) {
    const card = document.createElement('article');
    card.className = 'product-card';

    const bgColor = categoryColors[product.category] || '#6b7280';
    const initial = product.name.charAt(0).toUpperCase();

    // Get unique sizes from variants
    const sizes = getUniqueSizes(product.variants);

    // Get category emoji
    const categoryEmojis = {
        'Odzież': '👔',
        'Sport': '⚽',
        'Akcesoria': '🎒',
        'Obuwie': '👟',
        'Spodnie': '👖'
    };
    const emoji = categoryEmojis[product.category] || '📦';

    card.innerHTML = `
        <div class="product-image">
            <div class="product-placeholder" style="background: linear-gradient(135deg, ${bgColor}22 0%, ${bgColor}44 100%);">
                <span style="font-size: 3rem;">${emoji}</span>
            </div>
        </div>
        <div class="product-info">
            <span class="product-category">${product.category || 'Inne'}</span>
            <h3 class="product-name">${product.name}</h3>
            <p class="product-price">${formatPrice(product.price)} zł</p>
            <div class="product-variants">
                ${sizes.slice(0, 5).map(size => `
                    <span class="variant-badge ${size.stock === 0 ? 'out-of-stock' : ''}">${size.name}</span>
                `).join('')}
                ${sizes.length > 5 ? `<span class="variant-badge">+${sizes.length - 5}</span>` : ''}
            </div>
            <button class="add-to-cart-btn">Dodaj do koszyka</button>
        </div>
    `;

    return card;
}

/**
 * Get unique sizes with stock info from variants
 */
function getUniqueSizes(variants) {
    if (!variants || !Array.isArray(variants)) return [];

    const sizeMap = new Map();

    variants.forEach(variant => {
        const sizeName = variant.size || 'One Size';
        if (!sizeMap.has(sizeName)) {
            sizeMap.set(sizeName, { name: sizeName, stock: 0 });
        }
        sizeMap.get(sizeName).stock += variant.stock || 0;
    });

    // Sort sizes
    const sizeOrder = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45'];
    return Array.from(sizeMap.values()).sort((a, b) => {
        const indexA = sizeOrder.indexOf(a.name);
        const indexB = sizeOrder.indexOf(b.name);
        if (indexA === -1 && indexB === -1) return a.name.localeCompare(b.name);
        if (indexA === -1) return 1;
        if (indexB === -1) return -1;
        return indexA - indexB;
    });
}

/**
 * Format price with Polish locale
 */
function formatPrice(price) {
    return new Intl.NumberFormat('pl-PL', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(price);
}

/**
 * Bind category filter events
 */
function bindFilterEvents() {
    // Filter tabs
    const filterTabsContainer = document.querySelector('.filter-tabs');
    if (filterTabsContainer) {
        filterTabsContainer.addEventListener('click', (e) => {
            const tab = e.target.closest('.filter-tab');
            if (!tab) return;

            // Update active state
            filterTabsContainer.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Filter products
            currentCategory = tab.dataset.category;
            filterProducts();
        });
    }

    // Category cards click
    if (categoriesGrid) {
        categoriesGrid.addEventListener('click', (e) => {
            const card = e.target.closest('.category-card');
            if (!card) return;

            const category = card.dataset.category;
            currentCategory = category;

            // Update filter tabs
            const filterTabsContainer = document.querySelector('.filter-tabs');
            if (filterTabsContainer) {
                filterTabsContainer.querySelectorAll('.filter-tab').forEach(t => {
                    t.classList.toggle('active', t.dataset.category === category);
                });
            }

            // Scroll to products
            document.querySelector('.products-section')?.scrollIntoView({ behavior: 'smooth' });

            filterProducts();
        });
    }
}

/**
 * Filter products by current category
 */
function filterProducts() {
    let filtered = allProducts;

    if (currentCategory !== 'all') {
        filtered = allProducts.filter(p => p.category === currentCategory);
    }

    renderProducts(filtered);
}

/**
 * Show/hide loading state
 */
function showLoading(show) {
    productsLoading.style.display = show ? 'flex' : 'none';
}

/**
 * Show error message
 */
function showError(message) {
    emptyState.querySelector('.empty-state-icon').textContent = '⚠️';
    emptyState.querySelector('.empty-state-text').textContent = message;
    emptyState.style.display = 'block';
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', initShop);
