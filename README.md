# Project Store Inventory & Orders 🏪📦

**Demo:** [projectshopmanager.netlify.app](https://projectshopmanager.netlify.app/)

Aplicación web para la gestión de almacenes y pedidos de tiendas. Permite administrar productos, controlar inventario y gestionar pedidos según el rol del usuario (Administrador o Tienda). Desarrollada con **React**, **Bootstrap** y **Context API**, ideal para mostrar habilidades en desarrollo frontend, manejo de estados y diseño responsivo.

---

## 🔧 Tecnologías utilizadas

- **Frontend:** React, Vite  
- **Diseño:** Bootstrap  
- **Gestión de estado:** Context API  
- **HTTP Cliente:** Axios  
- **Formularios:** React Hook Form  
- **Backend:** API simulada / mock  

---

## 🏛 Arquitectura

- **Frontend:** React + Bootstrap + Context API + Axios  
- **Backend:** API simulada (mock)  
- **Roles de usuario:**
  - **Administrador:** gestión completa de productos, inventario y pedidos  
  - **Tienda:** creación de pedidos y consulta de inventario  

---

## ⚡ Funcionalidades principales

- Autenticación de usuarios  
- Roles diferenciados (Administrador / Tienda)  
- Gestión de productos (crear, editar, eliminar)  
- Creación y visualización de pedidos  
- Control de inventario por tienda  
- Visualización de información según permisos  

---

## 👤 Usuarios de prueba

| Rol           | Email            | Contraseña |
|---------------|----------------|------------|
| Administrador | admin@shop.com  | 123456     |
| Tienda        | shop1@shop.com  | 123456     |

---

## 📡 Ejemplos de endpoints (simulados)

> La API utilizada es un mock, pero estas son las rutas principales:

- `GET /products` → Listar productos  
- `POST /orders` → Crear un nuevo pedido  
- `GET /inventory` → Consultar inventario por tienda  
- `POST /auth/login` → Autenticación de usuario  

---

## 🖼 Capturas de pantalla

**Dashboard Administrador**  
![Dashboard Admin](https://via.placeholder.com/600x300.png?text=Dashboard+Admin)

**Gestión de Productos**  
![Productos](https://via.placeholder.com/600x300.png?text=Gestión+de+Productos)

**Creación de Pedidos Tienda**  
![Pedidos](https://via.placeholder.com/600x300.png?text=Creación+de+Pedidos)

---

## 🚀 Instalación y ejecución local

1. Clona el repositorio:

```bash
git clone https://github.com/rafacruiz/project-store-inventory-orders.git
cd project-store-inventory-orders
npm install
npm run dev
