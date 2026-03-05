#!/bin/bash

# ===========================================
# SSL Certificate Initialization Script
# ===========================================
# This script initializes SSL certificates for sliwka.studio
# Run this script once before starting the docker-compose stack
# ===========================================

set -e

DOMAIN="sliwka.studio"
EMAIL="a.sliwka92@gmail.com"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

echo "=== SSL Certificate Initialization for $DOMAIN ==="

# Check if running with appropriate permissions
if [ ! -w "$PROJECT_DIR/nginx/ssl" ]; then
    echo "Error: Cannot write to $PROJECT_DIR/nginx/ssl"
    echo "Please run with appropriate permissions or create the directory first."
    exit 1
fi

# Option 1: Generate self-signed certificate for development
generate_self_signed() {
    echo "Generating self-signed certificate for development..."

    openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
        -keyout "$PROJECT_DIR/nginx/ssl/privkey.pem" \
        -out "$PROJECT_DIR/nginx/ssl/fullchain.pem" \
        -subj "/CN=$DOMAIN/O=sliwka.studio/C=PL"

    echo "Self-signed certificate generated successfully!"
    echo "Note: This is for development only. Use Let's Encrypt for production."
}

# Option 2: Get Let's Encrypt certificate using certbot standalone
get_letsencrypt_standalone() {
    echo "Getting Let's Encrypt certificate using standalone mode..."
    echo "Note: Port 80 must be available and domain must point to this server."

    docker run --rm \
        -v "$PROJECT_DIR/nginx/ssl:/etc/letsencrypt/live/$DOMAIN" \
        -v certbot_conf:/etc/letsencrypt \
        -v certbot_www:/var/www/certbot \
        -p 80:80 \
        certbot/certbot certonly \
        --standalone \
        --email "$EMAIL" \
        --agree-tos \
        --no-eff-email \
        -d "$DOMAIN" \
        -d "www.$DOMAIN"

    # Copy certificates to nginx ssl directory
    docker run --rm \
        -v certbot_conf:/etc/letsencrypt:ro \
        -v "$PROJECT_DIR/nginx/ssl:/output" \
        alpine sh -c "cp /etc/letsencrypt/live/$DOMAIN/fullchain.pem /output/ && cp /etc/letsencrypt/live/$DOMAIN/privkey.pem /output/"

    echo "Let's Encrypt certificate obtained successfully!"
}

# Option 3: Get Let's Encrypt certificate with webroot (when nginx is running)
get_letsencrypt_webroot() {
    echo "Getting Let's Encrypt certificate using webroot mode..."
    echo "Note: Nginx must be running with HTTP-only config first."

    docker compose run --rm certbot certonly \
        --webroot \
        --webroot-path=/var/www/certbot \
        --email "$EMAIL" \
        --agree-tos \
        --no-eff-email \
        -d "$DOMAIN" \
        -d "www.$DOMAIN"

    # Copy certificates to nginx ssl directory
    docker run --rm \
        -v certbot_conf:/etc/letsencrypt:ro \
        -v "$PROJECT_DIR/nginx/ssl:/output" \
        alpine sh -c "cp /etc/letsencrypt/live/$DOMAIN/fullchain.pem /output/ && cp /etc/letsencrypt/live/$DOMAIN/privkey.pem /output/"

    echo "Let's Encrypt certificate obtained successfully!"
    echo "Restart nginx to apply: docker compose restart nginx"
}

# Main menu
echo ""
echo "Choose an option:"
echo "1) Generate self-signed certificate (development)"
echo "2) Get Let's Encrypt certificate - standalone mode"
echo "3) Get Let's Encrypt certificate - webroot mode (nginx running)"
echo ""
read -p "Enter option (1-3): " option

case $option in
    1)
        generate_self_signed
        ;;
    2)
        get_letsencrypt_standalone
        ;;
    3)
        get_letsencrypt_webroot
        ;;
    *)
        echo "Invalid option. Generating self-signed certificate..."
        generate_self_signed
        ;;
esac

echo ""
echo "=== SSL Setup Complete ==="
echo "You can now start the stack with: docker compose up -d"
