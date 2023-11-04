# eCommerce Project

This eCommerce project is built using Node.js, Express, EJS, and MongoDB. It provides a platform for users to shop for products, manage their orders, and leave reviews. Administrators can manage products, categories, and users.

## Table of Contents

- [eCommerce Project](#ecommerce-project)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Project Structure](#project-structure)
  - [Technologies](#technologies)

## Features

- User registration and authentication
- Product catalog and listings
- Shopping cart functionality
- Order history and management
- Product search and filtering
- User reviews and ratings
- Payment gateway integration
- Admin dashboard for managing products and categories
- User management with access control

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed
- MongoDB database set up
- Clone this repository

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/ecommerce-project.git
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up your MongoDB connection in `.env`:

   ```env
   MONGODB_URI=your-mongodb-uri
   ```

4. Start the server:

   ```bash
   npm start
   ```

## Usage

- Access the application by opening your browser and navigating to `http://localhost:3000`.

## Project Structure

The project structure is organized as follows:

```bash
ecommerce-project/
├── public/             # Static assets
├── src/                # Source Folder
  ├── config/             # Configuration files
  ├── controllers/        # Request handlers
  ├── routes/             # Express routes
  ├── models/             # MongoDB models
  ├── middleware/         # Middleware functions
├── views/              # EJS views
├── .env                # Environment variables
├── app.js              # Express application setup
```

## Technologies

- Node.js
- Express
- EJS (Embedded JavaScript)
- MongoDB
- HTML, CSS, Bootstrap, JavaScript
