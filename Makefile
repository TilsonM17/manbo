include backend/.env

.PHONY: up

up:
	docker compose -f "backend/docker-compose.yml" up -d

.PHONY: down

down:
	docker compose -f "backend/docker-compose.yml" down

.PHONY: logs

logs:
	docker compose -f "backend/docker-compose.yml" logs -f