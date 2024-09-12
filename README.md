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
- **Sorting Products**: Retrieve products with optional sorting.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud)
- Postman (for API testing)

## Setup Instructions

### Step 1: Clone the Repository

```bash
 git clone https://github.com/17387vishal/ecommerce-api.git
 cd ecommerce-api
```

### Step 2: Set up Environment Variables

In this step, you need to create a .env file in the root directory of your project and add
the following environment variables:

### Step 3: Start the Server

```bash
npm start
```

### Step 4: Connect to MongoDB Compass

Open MongoDB Compass and click on "New Connection".
Copy the following address and paste it into the connection string field:

```bash
mongodb+srv://your-username:your-password@your-server-address:27017/?retryWrites=true&w=majority&appName=YourAppName
```

## API Endpoints

### User Endpoints

- **Register a New User**
  - Method: POST
  - Endpoint: `/api/auth/register`
  - Body (JSON):

```bash
{
  "username": "testuser",
  "email": "test@example.com",
  "password": "password123"
}
```

- **Login User**
  - Method: POST
  - Endpoint: `/api/auth/login`
  - Body (JSON):

```bash
{
  "email": "test@example.com",
  "password": "password123"
}
```

Response:

```bash
{
  "token": "your_jwt_token_here"
}
```

## Product Endpoints

- **Create a New Product**
  - Method: POST
  - Endpoint: `/api/products`
  - Headers:
    - Authorization: Bearer `<your_jwt_token>`
  - Body (JSON):

```bash
{
  "name": "Product Name",
  "description": "Product Description",
  "price": 100,
  "category": "Category Name"
}
```

- **Get All Products**

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

  - Method: DELETE
  - Endpoint: `/api/products/:id`
  - Headers:

    - Authorization: Bearer `<your_jwt_token>`

- **Sorting Products**

  - Retrieve a list of products with optional sorting.

## Query Parameters

- `sort_by` (optional): A comma-separated list of fields to sort by. For example, `name,price`. Sorting will be applied to these fields in the order they are specified.
- `order` (optional): Defines the sorting order. Can be `asc` for ascending (default) or `desc` for descending.

#### Response

- Returns a JSON array of products.

#### Sorting Behavior

- **Default Behavior**: If no `sort_by` parameter is provided, products are returned in their natural order based on the `_id` field (insertion order).
- **Custom Sorting**:
  - If `sort_by` is provided, products are sorted based on the specified fields and order.
  - Example: `GET /api/products?sort_by=name&order=asc` will sort products alphabetically by `name` in ascending order.
  - Example: `GET /api/products?sort_by=price&order=desc` will sort products by `price` in descending order.

#### Examples

1. **Get Products in Natural Order (No Sorting)**:
   ```bash
   GET /api/products
2. **Get Products in ascending order** : Sort products alphabetically by `name` in ascending order
   ```bash
   GET /api/products?sort_by=name&order=asc
   ```
3. **Get Products in descending** : Sort products by `Price` in descending order

      ``` bash
   GET /api/products?sort_by=price&order=desc
      ```

# Postman API Testing

You can use Postman to test the API endpoints. Make sure to replace `<your_jwt_token>`
with the actual token received during login.

# Common Issues

- Make sure to install all dependencies using `npm install`.
- Check the MongoDB connection string and credentials.
- Verify the JWT secret key.
