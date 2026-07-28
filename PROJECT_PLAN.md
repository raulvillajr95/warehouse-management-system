# Warehouse Management System

## Project Overview

A full-stack web application that helps warehouse managers track inventory, manage orders, and monitor warehouse operations through a centralized dashboard.

---

## Problem Statement

Many warehouses rely on spreadsheets or expensive enterprise software. This project provides a streamlined warehouse management system that tracks inventory, orders, and operational metrics through a modern web application.

---

## Target Users

- Warehouse Managers
- Warehouse Supervisors
- Inventory Coordinators

---

## MVP Features

### Authentication
- User login
- Protected dashboard

### Inventory
- View inventory
- Add inventory items
- Edit inventory
- Delete inventory
- Search inventory

### Orders
- Create orders
- View orders
- Update order status

### Dashboard
- Total inventory
- Orders today
- Low stock items
- Recent activity

---

## Stretch Features

- Barcode scanner simulation
- Warehouse map
- Employee management
- Inventory forecasting
- CSV import/export
- Role-based permissions
- Real-time notifications

---

## Tech Stack

### Frontend
- React
- TypeScript
- Tailwind CSS

### Backend
- Node.js
- Express.js

### Database
- PostgreSQL
- Prisma ORM

### Authentication
- JWT

### Deployment
- Vercel
- Railway

---

## Success Criteria

A deployed application that demonstrates:

- Full CRUD operations
- Authentication
- REST APIs
- Relational database design
- Responsive frontend
- Production deployment

## User Stories

### Warehouse Manager

As a warehouse manager, I want to:

- Log in securely.
- View a dashboard with today's warehouse activity.
- Monitor inventory levels.
- Identify low-stock items.
- Search for products by SKU or name.
- Create and manage customer orders.

### Warehouse Associate

As a warehouse associate, I want to:

- View assigned orders.
- Update order status (Picking → Packed → Shipped).
- Search for inventory items.

## Dashboard Metrics

When a warehouse manager logs in, they should immediately see:

- Total Inventory Items
- Orders Today
- Low Stock Alerts
- Pending Orders
- Recently Updated Orders
