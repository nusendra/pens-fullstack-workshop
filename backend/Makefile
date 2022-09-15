all: prisma-migrate

PRIMA_SCHEMA ?= ./src/db/schema.prisma

.PHONY: prisma-generate
prisma-generate:
	pnpm prisma generate --schema=$(PRISMA_SCHEMA)

.PHONY: prisma-migrate
prisma-migrate:
	pnpm prisma migrate dev --schema=$(PRIMA_SCHEMA) --name init