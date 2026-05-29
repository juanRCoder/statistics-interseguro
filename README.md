# statistics-interseguro

Aplicación web para **factorización QR de matrices**, rotación y estadísticas descriptivas.

<img src="https://raw.githubusercontent.com/juanRCoder/statistics-interseguro/main/frontend/public/capture_project.png" alt="preview" width="450" />

## ¿Qué hace?

1. El usuario ingresa una matriz numérica (de 2×2 hasta 6×6) en la interfaz web.
2. La API Go calcula la **factorización QR** (matrices Q y R), rota la matriz 90° y devuelve estadísticas (máximo, mínimo, promedio, suma, y si Q o R son diagonales).
3. Los resultados se muestran en pantalla de forma clara.

## Tecnologías

| Capa          | Tecnología                        |
| ------------- | --------------------------------- |
| Frontend      | Vue 3 + TypeScript (Vite)         |
| API principal | Go (Fiber) — puerto `8080`        |
| API auxiliar  | Node.js + Express — puerto `3005` |
| Contenedores  | Docker Compose                    |

## Estructura del proyecto

```
statistics-interseguro/
├── frontend/        # Interfaz Vue 3
├── api-go/          # API Go — factorización QR y estadísticas
├── backend/         # API Node.js
└── docker-compose.yml
```

## Levantar con Docker

```bash
docker compose up --build
```

- API Go → [http://localhost:8080](http://localhost:8080)
- API Node → [http://localhost:3005](http://localhost:3005)

## Desarrollo local

```bash
# API Go
cd api-go
go mod download
go run main.go

# API Node
cd backend
pnpm install
pnpm dev

# Frontend
cd frontend
pnpm install
pnpm dev
```
