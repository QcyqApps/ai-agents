#!/bin/bash

# E-commerce Customer Service Agent - Setup Script
# This script initializes the development environment

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

echo "=========================================="
echo "E-commerce Customer Service Agent Setup"
echo "=========================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo -e "${RED}Error: Docker is not installed. Please install Docker first.${NC}"
    exit 1
fi

# Check if Docker Compose is available
if ! docker compose version &> /dev/null; then
    echo -e "${RED}Error: Docker Compose is not available. Please install Docker Compose.${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Docker and Docker Compose are installed${NC}"
echo ""

# Check for .env file
if [ ! -f "$PROJECT_DIR/.env" ]; then
    echo -e "${YELLOW}Creating .env file from .env.example...${NC}"

    if [ -f "$PROJECT_DIR/.env.example" ]; then
        cp "$PROJECT_DIR/.env.example" "$PROJECT_DIR/.env"

        # Generate random encryption key
        ENCRYPTION_KEY=$(openssl rand -hex 16)
        sed -i.bak "s/your_32_character_encryption_key_here/$ENCRYPTION_KEY/" "$PROJECT_DIR/.env"
        rm -f "$PROJECT_DIR/.env.bak"

        # Generate random password
        DB_PASSWORD=$(openssl rand -base64 12 | tr -dc 'a-zA-Z0-9')
        sed -i.bak "s/your_secure_password_here/$DB_PASSWORD/" "$PROJECT_DIR/.env"
        rm -f "$PROJECT_DIR/.env.bak"

        echo -e "${GREEN}✓ .env file created${NC}"
        echo -e "${YELLOW}⚠ Please edit .env and add your ANTHROPIC_API_KEY${NC}"
    else
        echo -e "${RED}Error: .env.example not found${NC}"
        exit 1
    fi
else
    echo -e "${GREEN}✓ .env file exists${NC}"
fi

echo ""

# Check for Anthropic API key
if grep -q "your_anthropic_api_key_here" "$PROJECT_DIR/.env" 2>/dev/null; then
    echo -e "${YELLOW}⚠ Warning: ANTHROPIC_API_KEY is not set in .env${NC}"
    echo "  Please add your API key from https://console.anthropic.com/"
    echo ""
fi

# Start Docker containers
echo "Starting Docker containers..."
cd "$PROJECT_DIR"
docker compose up -d

echo ""
echo "Waiting for services to be ready..."

# Wait for PostgreSQL
echo -n "  PostgreSQL: "
for i in {1..30}; do
    if docker compose exec -T postgres pg_isready -U n8n_user -d n8n &> /dev/null; then
        echo -e "${GREEN}ready${NC}"
        break
    fi
    sleep 1
    echo -n "."
done

# Wait for n8n
echo -n "  n8n: "
for i in {1..60}; do
    if curl -s http://localhost:5678/healthz &> /dev/null; then
        echo -e "${GREEN}ready${NC}"
        break
    fi
    sleep 1
    echo -n "."
done

echo ""
echo "=========================================="
echo -e "${GREEN}Setup complete!${NC}"
echo "=========================================="
echo ""
echo "Next steps:"
echo ""
echo "1. Open n8n: http://localhost:5678"
echo "   - Create an account on first visit"
echo "   - Go to Settings > Credentials"
echo ""
echo "2. Add PostgreSQL credential:"
echo "   - Host: postgres"
echo "   - Port: 5432"
echo "   - Database: ecommerce_db"
echo "   - User: n8n_user"
echo "   - Password: (from .env file)"
echo ""
echo "3. Add Anthropic credential:"
echo "   - API Key: (from console.anthropic.com)"
echo ""
echo "4. Import workflows from n8n/workflows/ directory"
echo ""
echo "5. Open demo widget: widget/index.html"
echo ""
echo "To stop: docker compose down"
echo "To view logs: docker compose logs -f"
echo ""
