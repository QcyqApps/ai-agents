/**
 * Chat Widget Module for E-commerce Demo
 * Reusable chat component that integrates with n8n AI agent
 */

class ChatWidget {
    constructor(containerSelector, options = {}) {
        this.container = document.querySelector(containerSelector);
        // Default to production URL, can be overridden via options
        const defaultWebhookUrl = window.location.hostname === 'localhost'
            ? 'http://localhost:5678/webhook/chat'
            : 'https://sliwka.studio/webhook/chat';
        this.webhookUrl = options.webhookUrl || defaultWebhookUrl;
        this.sessionId = this.getOrCreateSessionId();
        this.isLoading = false;

        if (!this.container) {
            console.error('Chat container not found:', containerSelector);
            return;
        }

        this.init();
    }

    /**
     * Get or create a unique session ID
     */
    getOrCreateSessionId() {
        let sessionId = sessionStorage.getItem('chat_session_id');
        if (!sessionId) {
            sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            sessionStorage.setItem('chat_session_id', sessionId);
        }
        return sessionId;
    }

    /**
     * Initialize the chat widget
     */
    init() {
        this.render();
        this.bindEvents();
    }

    /**
     * Render the chat HTML structure
     */
    render() {
        this.container.innerHTML = `
            <div class="chat-header">
                <div class="chat-header-left">
                    <h2>Asystent AI</h2>
                    <div class="chat-status">
                        <span class="chat-status-dot"></span>
                        <span>Online 24/7</span>
                    </div>
                </div>
                <button class="chat-reset-btn" id="chatReset" title="Nowa rozmowa">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                        <path d="M3 3v5h5"/>
                    </svg>
                    <span>Nowa rozmowa</span>
                </button>
            </div>
            <div class="chat-messages" id="chatMessages">
                <div class="message assistant">
                    Witaj! Jestem asystentem Demo Sklepu. Mogę pomóc Ci sprawdzić status zamówienia, dostępność produktów lub zgłosić zwrot. Jak mogę Ci pomóc?
                </div>
            </div>
            <div class="chat-suggestions" id="chatSuggestions">
                <div class="suggestions-label">Przykładowe pytania:</div>
                <div class="suggestions-list">
                    <button class="suggestion-chip" data-message="Gdzie jest moja paczka? Zamówienie ZAM-2026-0006">📦 Gdzie jest moja paczka?</button>
                    <button class="suggestion-chip" data-message="Czy macie koszulkę basic w rozmiarze XL?">🔍 Dostępność produktu</button>
                    <button class="suggestion-chip" data-message="Chcę zwrócić produkt z zamówienia ZAM-2026-0001">↩️ Zgłoś zwrot</button>
                    <button class="suggestion-chip" data-message="Jaka jest polityka zwrotów?">📋 Polityka zwrotów</button>
                    <button class="suggestion-chip" data-message="Chcę rozmawiać z człowiekiem">👤 Kontakt z konsultantem</button>
                </div>
            </div>
            <div class="chat-input-area">
                <input
                    type="text"
                    class="chat-input"
                    id="chatInput"
                    placeholder="Napisz wiadomość..."
                    autocomplete="off"
                >
                <button class="chat-send" id="chatSend" aria-label="Wyślij">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                    </svg>
                </button>
            </div>
        `;

        // Cache DOM elements
        this.messagesContainer = this.container.querySelector('#chatMessages');
        this.input = this.container.querySelector('#chatInput');
        this.sendButton = this.container.querySelector('#chatSend');
        this.suggestionsContainer = this.container.querySelector('#chatSuggestions');
        this.resetButton = this.container.querySelector('#chatReset');
    }

    /**
     * Bind event listeners
     */
    bindEvents() {
        // Send button click
        this.sendButton.addEventListener('click', () => this.handleSend());

        // Enter key press
        this.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.handleSend();
            }
        });

        // Suggestion chips click
        this.suggestionsContainer.addEventListener('click', (e) => {
            const chip = e.target.closest('.suggestion-chip');
            if (chip && !this.isLoading) {
                const message = chip.dataset.message;
                this.hideSuggestions();
                this.sendMessage(message);
            }
        });

        // Reset button click
        this.resetButton.addEventListener('click', () => this.resetChat());
    }

    /**
     * Hide suggestions after first use
     */
    hideSuggestions() {
        if (this.suggestionsContainer) {
            this.suggestionsContainer.style.display = 'none';
        }
    }

    /**
     * Show suggestions
     */
    showSuggestions() {
        if (this.suggestionsContainer) {
            this.suggestionsContainer.style.display = 'block';
        }
    }

    /**
     * Reset chat - clear messages, generate new session, show suggestions
     */
    resetChat() {
        // Generate new session ID
        this.sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        sessionStorage.setItem('chat_session_id', this.sessionId);

        // Clear messages and add welcome message
        this.messagesContainer.innerHTML = `
            <div class="message assistant">
                Witaj! Jestem asystentem Demo Sklepu. Mogę pomóc Ci sprawdzić status zamówienia, dostępność produktów lub zgłosić zwrot. Jak mogę Ci pomóc?
            </div>
        `;

        // Show suggestions again
        this.showSuggestions();

        // Focus input
        this.input.focus();
    }

    /**
     * Handle sending a message
     */
    async handleSend() {
        const message = this.input.value.trim();
        if (!message || this.isLoading) return;

        this.input.value = '';
        await this.sendMessage(message);
    }

    /**
     * Send message to the AI agent
     */
    async sendMessage(message) {
        this.setLoading(true);
        this.addMessage(message, 'user');
        this.showTyping();

        try {
            const response = await fetch(this.webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    sessionId: this.sessionId,
                    message: message
                })
            });

            this.hideTyping();

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const data = await response.json();
            const reply = data.output || data.response || data.message || 'Przepraszam, wystąpił błąd.';
            this.addMessage(reply, 'assistant');

        } catch (error) {
            this.hideTyping();
            console.error('Chat error:', error);
            this.addMessage('Przepraszam, wystąpił błąd połączenia. Spróbuj ponownie.', 'error');
        } finally {
            this.setLoading(false);
        }
    }

    /**
     * Add a message to the chat
     */
    addMessage(content, type = 'assistant') {
        const messageEl = document.createElement('div');
        messageEl.className = `message ${type}`;
        messageEl.textContent = content;
        this.messagesContainer.appendChild(messageEl);
        this.scrollToBottom();
        return messageEl;
    }

    /**
     * Show typing indicator
     */
    showTyping() {
        const typingEl = document.createElement('div');
        typingEl.className = 'message typing';
        typingEl.id = 'typingIndicator';
        typingEl.innerHTML = '<div class="typing-dots"><span></span><span></span><span></span></div>';
        this.messagesContainer.appendChild(typingEl);
        this.scrollToBottom();
    }

    /**
     * Hide typing indicator
     */
    hideTyping() {
        const typingEl = document.getElementById('typingIndicator');
        if (typingEl) typingEl.remove();
    }

    /**
     * Scroll messages to bottom
     */
    scrollToBottom() {
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }

    /**
     * Set loading state
     */
    setLoading(loading) {
        this.isLoading = loading;
        this.input.disabled = loading;
        this.sendButton.disabled = loading;

        if (!loading) {
            this.input.focus();
        }
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ChatWidget;
}
