# E-commerce REST API

This is a simple E-commerce REST API built using Node.js, Express, and MongoDB. The API allows you to perform CRUD operations on products and provides a search functionality for products by name, description, or variant name.

## Table of Contents

- [Installation](#installation)
- [API Endpoints](#api-endpoints)
- [Architectural Decisions](#architectural-decisions)
- [Assumptions](#assumptions)

## Installation

1. Clone the repository:

   ```bash
   git clone [https://github.com/Sheshant-Manure/E-commerce-REST-API.git](https://github.com/Sheshant-Manure/E-commerce-REST-API.git): [https://github.com/Sheshant-Manure/E-commerce-REST-API.git](https://github.com/Sheshant-Manure/E-commerce-REST-API.git)

cd E-commerce-REST-API

### Install dependencies

npm install

### Set up your MongoDB database

1. Create a new database in MongoDB Atlas and get the connection link.
2. Add the connection link to the `MongoDB.js` file inside the `database` folder.
3. Make sure to create a .env file and update your `username` and `password` of your database. Refer to .env.example for for reference.

### Start the server

npm run dev

## API Endpoints

### Products

- **POST /products**
  - Create a new product and its variants.

**Request Body:**

        {
        "name": "Smartphone",
        "description": "High-end smartphone with advanced features",
        "price": 899.99,
        "variants": [
            {
            "name": "64GB Storage",
            "sku": "PHN-64GB",
            "additionalCost": 50.00,
            "stockCount": 100
            },
            {
            "name": "128GB Storage",
            "sku": "PHN-128GB",
            "additionalCost": 100.00,
            "stockCount": 50
            }
        ]
        }

**GET /products**

  - Get all products with their variants.

**Response Body:**

      [
        {
          "id": "1",
          "name": "Smartphone",
          "description": "High-end smartphone with advanced features",
          "price": 899.99,
          "variants": [
            {
              "id": "101",
              "name": "64GB Storage",
              "sku": "PHN-64GB",
              "additionalCost": 50.00,
              "stockCount": 100
            },
            {
              "id": "102",
              "name": "128GB Storage",
              "sku": "PHN-128GB",
              "additionalCost": 100.00,
              "stockCount": 50
            }
          ]
        },
      ]

- **PUT /products/:productId**
  - Update a product.

**Request Body:**

    {
    "name": "Updated Smartphone",
    "description": "Updated description",
    "price": 999.99,
    "variants": [
        {
        "name": "Updated Variant",
        "sku": "UPD-VAR",
        "additionalCost": 20.00,
        "stockCount": 50
        }
    ]
    }

- **DELETE /products/:productId**
  - Delete a product.

**Request:**

    DELETE /products/123

### Search

- **GET /products/search?q=search_query**
  - Search products by name, description, or variant name.

## Architectural Decisions

This project uses Node.js and Express for the server, MongoDB as the database, and Mongoose as the ODM (Object Document Mapper). The code is structured in a modular way, separating routes for product management and search functionality.

## Assumptions

- The MongoDB server is running on MongoDB Atlas server which the user has configured correctly.
- The API assumes a basic structure for products and variants.
