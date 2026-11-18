
# Goodpaws – Pet Store

Goodpaws is a full-stack pet store web application built with Next.js. It allows users to browse pet products, manage their shopping cart, authenticate their accounts, and complete checkout using Razorpay Test Mode.

## Features

- User registration and login
- Credentials-based authentication
- Browse and view pet products
- Product categories and filtering
- Add, update, and remove cart items
- Database-backed shopping cart
- Checkout with customer and delivery details
- Razorpay payment gateway integration (Test Mode)
- Server-side payment verification
- Order creation and payment status management
- Responsive user interface

## Tech Stack

- **Next.js** – Full-stack React framework
- **React** – User interface
- **NextAuth.js** – User authentication
- **Prisma ORM** – Database access and management
- **Neon PostgreSQL** – Cloud-hosted relational database
- **Razorpay** – Payment gateway integration (Test Mode)
- **Tailwind CSS** – Styling and responsive design
- **Typescript** – Application logic

## Database

Uses Neon PostgreSQL with Prisma ORM for database operations.

Main database models:

- User
- Product
- Cart
- CartItem
- Order
- OrderItem

## Authentication

Implemented credentials-based authentication using NextAuth.js. User passwords are hashed using bcrypt before being stored in the database.

## Payment Integration

Integrated Razorpay in Test Mode for checkout and payment processing.

Payment flow:
1. Create an order on the server.
2. Open Razorpay Checkout.
3. Verify the payment signature on the server.
4. Update the order and payment status.
5. Clear the user's cart after successful payment verification.

**Note:** Payment integration uses Razorpay Test Mode. No real transactions are processed.

## Project Overview

A full-stack e-commerce application demonstrating authentication, relational database management, shopping cart functionality, order processing, and payment gateway integration.
