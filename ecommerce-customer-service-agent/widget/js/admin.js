/**
 * Admin Panel Logic
 * Handles stats display, tabs, and data tables
 */

// State
let allOrders = [];
let allProducts = [];
let allReturns = [];
let categories = [];

// Current filters
let ordersFilter = { search: '', status: '' };
let productsFilter = { search: '', category: '' };
let returnsFilter = { search: '', status: '' };

// Current sort
let ordersSort = { column: 'created_at', direction: 'desc' };
let productsSort = { column: 'name', direction: 'asc' };
let returnsSort = { column: 'created_at', direction: 'desc' };

/**
 * Initialize admin panel
 */
async function initAdmin() {
    // Initialize chat
    new ChatWidget('#chatPanel');

    // Load all data
    await Promise.all([
        loadStats(),
        loadOrders(),
        loadProducts(),
        loadReturns()
    ]);

    // Bind events
    bindTabEvents();
    bindFilterEvents();
    bindSortEvents();
}

/**
 * Load dashboard statistics
 */
async function loadStats() {
    try {
        const data = await API.getStats();

        document.getElementById('stat-orders').textContent = data.orders?.total || 0;
        document.getElementById('stat-products').textContent = data.products?.total || 0;
        document.getElementById('stat-returns').textContent = data.returns?.total || 0;
        document.getElementById('stat-revenue').textContent = formatPrice(data.revenue?.total || 0);
    } catch (error) {
        console.error('Failed to load stats:', error);
    }
}

/**
 * Load orders data
 */
async function loadOrders() {
    try {
        const data = await API.getOrders();
        allOrders = data.orders || [];
        renderOrders();
    } catch (error) {
        console.error('Failed to load orders:', error);
        renderOrdersError();
    }
}

/**
 * Load products data
 */
async function loadProducts() {
    try {
        const data = await API.getProducts();
        allProducts = data.products || [];
        categories = data.categories || [];
        populateCategoryFilter();
        renderProducts();
    } catch (error) {
        console.error('Failed to load products:', error);
        renderProductsError();
    }
}

/**
 * Load returns data
 */
async function loadReturns() {
    try {
        const data = await API.getReturns();
        allReturns = data.returns || [];
        renderReturns();
    } catch (error) {
        console.error('Failed to load returns:', error);
        renderReturnsError();
    }
}

/**
 * Populate category filter dropdown
 */
function populateCategoryFilter() {
    const select = document.getElementById('productsCategoryFilter');
    categories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat;
        option.textContent = cat;
        select.appendChild(option);
    });
}

// ============================================
// Render Functions
// ============================================

function renderOrders() {
    const tbody = document.getElementById('ordersTableBody');
    let filtered = filterData(allOrders, ordersFilter, ['order_number', 'customer_name', 'email']);

    if (ordersFilter.status) {
        filtered = filtered.filter(o => o.status === ordersFilter.status);
    }

    filtered = sortData(filtered, ordersSort);

    if (filtered.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="empty-state"><p>Brak zamówień</p></td></tr>';
        return;
    }

    tbody.innerHTML = filtered.map(order => `
        <tr>
            <td><span class="font-mono">${order.order_number}</span></td>
            <td>
                <div>${order.customer_name || '-'}</div>
                <div class="text-muted text-small">${order.email}</div>
            </td>
            <td><span class="status-badge ${order.status}">${order.status_label}</span></td>
            <td>${order.items_count} szt.</td>
            <td><strong>${formatPrice(order.total)} zł</strong></td>
            <td class="text-muted">${formatDate(order.created_at)}</td>
        </tr>
    `).join('');
}

function renderProducts() {
    const tbody = document.getElementById('productsTableBody');
    let filtered = filterData(allProducts, productsFilter, ['sku', 'name']);

    if (productsFilter.category) {
        filtered = filtered.filter(p => p.category === productsFilter.category);
    }

    filtered = sortData(filtered, productsSort);

    if (filtered.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="empty-state"><p>Brak produktów</p></td></tr>';
        return;
    }

    tbody.innerHTML = filtered.map(product => {
        const totalStock = getTotalStock(product.variants);
        const variantsCount = product.variants ? product.variants.length : 0;

        return `
            <tr>
                <td><span class="font-mono">${product.sku}</span></td>
                <td><strong>${product.name}</strong></td>
                <td>${product.category || '-'}</td>
                <td>${formatPrice(product.price)} zł</td>
                <td>
                    <span class="text-muted">${variantsCount} wariantów</span>
                    <span class="text-small">(${totalStock} szt.)</span>
                </td>
            </tr>
        `;
    }).join('');
}

function renderReturns() {
    const tbody = document.getElementById('returnsTableBody');
    let filtered = filterData(allReturns, returnsFilter, ['id', 'order_number', 'customer_name', 'reason']);

    if (returnsFilter.status) {
        filtered = filtered.filter(r => r.status === returnsFilter.status);
    }

    filtered = sortData(filtered, returnsSort);

    if (filtered.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="empty-state"><p>Brak zwrotów</p></td></tr>';
        return;
    }

    tbody.innerHTML = filtered.map(ret => `
        <tr>
            <td><span class="font-mono">${ret.id}</span></td>
            <td><span class="font-mono">${ret.order_number || '-'}</span></td>
            <td>${ret.customer_name || '-'}</td>
            <td class="truncate" style="max-width: 200px;" title="${ret.reason}">${ret.reason}</td>
            <td><span class="status-badge ${ret.status}">${ret.status_label}</span></td>
            <td class="text-muted">${formatDate(ret.created_at)}</td>
        </tr>
    `).join('');
}

function renderOrdersError() {
    document.getElementById('ordersTableBody').innerHTML =
        '<tr><td colspan="6" class="empty-state"><p>Błąd ładowania zamówień</p></td></tr>';
}

function renderProductsError() {
    document.getElementById('productsTableBody').innerHTML =
        '<tr><td colspan="5" class="empty-state"><p>Błąd ładowania produktów</p></td></tr>';
}

function renderReturnsError() {
    document.getElementById('returnsTableBody').innerHTML =
        '<tr><td colspan="6" class="empty-state"><p>Błąd ładowania zwrotów</p></td></tr>';
}

// ============================================
// Event Handlers
// ============================================

function bindTabEvents() {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.dataset.tab;

            // Update buttons
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Update content
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            document.getElementById(`tab-${tabId}`).classList.add('active');
        });
    });
}

function bindFilterEvents() {
    // Orders
    document.getElementById('ordersSearch').addEventListener('input', (e) => {
        ordersFilter.search = e.target.value;
        renderOrders();
    });

    document.getElementById('ordersStatusFilter').addEventListener('change', (e) => {
        ordersFilter.status = e.target.value;
        renderOrders();
    });

    // Products
    document.getElementById('productsSearch').addEventListener('input', (e) => {
        productsFilter.search = e.target.value;
        renderProducts();
    });

    document.getElementById('productsCategoryFilter').addEventListener('change', (e) => {
        productsFilter.category = e.target.value;
        renderProducts();
    });

    // Returns
    document.getElementById('returnsSearch').addEventListener('input', (e) => {
        returnsFilter.search = e.target.value;
        renderReturns();
    });

    document.getElementById('returnsStatusFilter').addEventListener('change', (e) => {
        returnsFilter.status = e.target.value;
        renderReturns();
    });
}

function bindSortEvents() {
    // Orders table
    document.querySelectorAll('#ordersTable th[data-sort]').forEach(th => {
        th.addEventListener('click', () => {
            ordersSort = toggleSort(ordersSort, th.dataset.sort);
            updateSortIndicators('#ordersTable', ordersSort);
            renderOrders();
        });
    });

    // Products table
    document.querySelectorAll('#productsTable th[data-sort]').forEach(th => {
        th.addEventListener('click', () => {
            productsSort = toggleSort(productsSort, th.dataset.sort);
            updateSortIndicators('#productsTable', productsSort);
            renderProducts();
        });
    });

    // Returns table
    document.querySelectorAll('#returnsTable th[data-sort]').forEach(th => {
        th.addEventListener('click', () => {
            returnsSort = toggleSort(returnsSort, th.dataset.sort);
            updateSortIndicators('#returnsTable', returnsSort);
            renderReturns();
        });
    });
}

// ============================================
// Helper Functions
// ============================================

function filterData(data, filter, searchFields) {
    if (!filter.search) return data;

    const search = filter.search.toLowerCase();
    return data.filter(item =>
        searchFields.some(field => {
            const value = item[field];
            return value && value.toString().toLowerCase().includes(search);
        })
    );
}

function sortData(data, sort) {
    return [...data].sort((a, b) => {
        let aVal = a[sort.column];
        let bVal = b[sort.column];

        // Handle dates
        if (sort.column === 'created_at' || sort.column === 'updated_at') {
            aVal = new Date(aVal).getTime();
            bVal = new Date(bVal).getTime();
        }

        // Handle numbers
        if (typeof aVal === 'number' && typeof bVal === 'number') {
            return sort.direction === 'asc' ? aVal - bVal : bVal - aVal;
        }

        // Handle strings
        aVal = (aVal || '').toString().toLowerCase();
        bVal = (bVal || '').toString().toLowerCase();

        if (sort.direction === 'asc') {
            return aVal.localeCompare(bVal);
        } else {
            return bVal.localeCompare(aVal);
        }
    });
}

function toggleSort(currentSort, column) {
    if (currentSort.column === column) {
        return {
            column,
            direction: currentSort.direction === 'asc' ? 'desc' : 'asc'
        };
    }
    return { column, direction: 'asc' };
}

function updateSortIndicators(tableSelector, sort) {
    const table = document.querySelector(tableSelector);
    table.querySelectorAll('th').forEach(th => {
        th.classList.remove('sorted-asc', 'sorted-desc');
        if (th.dataset.sort === sort.column) {
            th.classList.add(`sorted-${sort.direction}`);
        }
    });
}

function getTotalStock(variants) {
    if (!variants || !Array.isArray(variants)) return 0;
    return variants.reduce((sum, v) => sum + (v.stock || 0), 0);
}

function formatPrice(price) {
    return new Intl.NumberFormat('pl-PL', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(price);
}

function formatDate(dateStr) {
    if (!dateStr) return '-';
    const date = new Date(dateStr);
    return date.toLocaleDateString('pl-PL', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', initAdmin);
