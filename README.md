# eCommerce API

This is a professional eCommerce API built with Node.js, Express, and MongoDB. It includes user authentication, product management, and basic CRUD operations.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
- [API Endpoints](#api-endpoints)
- [Postman API Testing](#postman-api-testing)
- [Common Issues](#common-issues)
- [Contributing](#contributing)

## Overview

This eCommerce API provides a robust and scalable solution for managing users and
products. It uses JSON Web Tokens (JWT) for authentication and authorization, ensuring
secure and reliable data exchange.

## Features

- **User Registration and Authentication**

  - Register new users
  - Login with existing users
  - JWT authentication

- **Product Management**
  - Create new products
  - Read all products
  - Read a product by ID
  - Update product details
  - Delete a product

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud)
- Postman (for API testing)

## Setup Instructions

### Step 1: Clone the Repository

```bash
git clone:https://github.com/17387vishal/ecommerce-api.git
cd your-repository
```

2. **setup environment .env**
   MONGO_URI=mongodb+srv://user1:1234@cluster0.3bgi9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
   JWT_SECRET=secret1234

PORT=5000

3. **start server**
   npm start

4. **postman api test**
   Postman API Testing
   You can use Postman to test the following API endpoints:

   User Endpoints
   Register a New User

   Method: POST
   Endpoint: /api/auth/register
   Body (JSON):
   json
   Copy code
   {
   "username": "testuser",
   "email": "test@example.com",
   "password": "password123"
   }
   Login User

   Method: POST
   Endpoint: /api/auth/login
   Body (JSON):
   json

   {
   "email": "test@example.com",
   "password": "password123"
   }
   Response: { "token": "your_jwt_token_here" }
   Product Endpoints
   Create a New Product

   Method: POST
   Endpoint: /api/products
   Headers:
   Authorization: Bearer <your_jwt_token>
   Body (JSON):
   json
   {
   "name": "Product Name",
   "description": "Product Description",
   "price": 100,
   "category": "Category Name"
   }
   Get All Products

- Method: GET
- Endpoint: `/api/products`
- Headers:

  - Authorization: Bearer `<your_jwt_token>`

- **Get a Product by ID**

  - Method: GET
  - Endpoint: `/api/products/:id`
  - Headers:

    - Authorization: Bearer `<your_jwt_token>`

- **Update a Product**

  - Method: PUT
  - Endpoint: `/api/products/:id`
  - Headers:

    - Authorization: Bearer `<your_jwt_token>`

  - Body (JSON):

```bash
{
  "name": "Updated Product Name",
  "description": "Updated Product Description",
  "price": 150,
  "category": "Updated Category Name"
}
```

- **Delete a Product**

  Method: DELETE
  Endpoint: /api/products/:id
  Headers:
  Authorization: Bearer <your_jwt_token>

5. **connect the cloud data base to the mongoDBcompass **
   click on the new connection
   <<<<<<< HEAD
   and copy this adderss mongodb+srv://user1:1234@cluster0.3bgi9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0 and paste.
   //use mongodbCompass
   =======
   and copy this adderss "mongodb+srv://user1:1234@cluster0.3bgi9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0" and paste
   > > > > > > > cf888ee14b2fbe40cbbace2e2ceaab50ac59b3fb
