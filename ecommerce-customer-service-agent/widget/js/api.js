/**
 * API Client for E-commerce Demo
 * Handles communication with n8n webhook endpoints
 */

const API = {
    baseUrl: 'http://localhost:5678/webhook',

    /**
     * Generic fetch wrapper with error handling
     */
    async request(endpoint, options = {}) {
        const url = `${this.baseUrl}${endpoint}`;

        try {
            const response = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers
                },
                ...options
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error(`API Error [${endpoint}]:`, error);
            throw error;
        }
    },

    /**
     * Get all products, optionally filtered by category
     * @param {string|null} category - Category to filter by
     * @returns {Promise<{products: Array, categories: Array, total: number}>}
     */
    async getProducts(category = null) {
        const params = category ? `?category=${encodeURIComponent(category)}` : '';
        return this.request(`/products${params}`);
    },

    /**
     * Get all orders for admin panel
     * @param {string|null} status - Status to filter by
     * @returns {Promise<{orders: Array, total: number}>}
     */
    async getOrders(status = null) {
        const params = status ? `?status=${encodeURIComponent(status)}` : '';
        return this.request(`/orders${params}`);
    },

    /**
     * Get all returns for admin panel
     * @param {string|null} status - Status to filter by
     * @returns {Promise<{returns: Array, total: number}>}
     */
    async getReturns(status = null) {
        const params = status ? `?status=${encodeURIComponent(status)}` : '';
        return this.request(`/returns${params}`);
    },

    /**
     * Get dashboard statistics
     * @returns {Promise<{totalOrders: number, newOrders: number, totalProducts: number, totalReturns: number, totalRevenue: number}>}
     */
    async getStats() {
        return this.request('/stats');
    },

    /**
     * Send chat message to AI agent
     * @param {string} sessionId - Chat session ID
     * @param {string} message - User message
     * @returns {Promise<{output: string}>}
     */
    async sendChatMessage(sessionId, message) {
        return this.request('/chat', {
            method: 'POST',
            body: JSON.stringify({
                sessionId,
                message
            })
        });
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = API;
}
