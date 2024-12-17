# E-Commerce-Store Assignment

# Table of Contents

1. [Overview](#overview)
2. [Installation](#installation)
3. [Configuration](#configuration)
4. [Features](#features)
   - [User Features](#user-features)
   - [Admin Features](#admin-features)
5. [Tech Stack](#tech-stack)
6. [Error Handling](#error-handling)

# Overview:

This is the HaveBreak full-stack e-commerce store assignment built using Next.js with the 15 App Router. The project includes essential features for both users and administrators, delivering a seamless shopping experience using the latest technologies.

# Installation

To set up the project locally, follow these steps:

1. Clone the repository using SSH:
   - git clone git@github.com:TaiseerT/E-Commerce-Store.git
2. Navigate to the project directory:
   - cd E-Commerce-Store
3. Install dependencies:
   - npm install

# Configuration:

1. Create a .env file in the root of your project and add the following variables:
   - DB_URL = "mongodb://localhost:27017/your-db-name"
   - JWT_SECRET = "your-jwt-secret"
2. Prepare the project for admin seeding:
   - Go to the package.json directory and add the following after the parentheses of the dev-dependencies:
      - {
      -   type: "module",
      - }
3. Seed the admin account:
   - Navigate to the seeders directory:
     - cd app/api/seeders
   - Run the seeder script:
     - node adminSeeder.js
       **NOTE:** This should log a message in your console saying Admin user created!
4. Remove the module type setting:
   - Delete the { "type": "module" } entry from package.json after seeding.
5. Start the development server:
   - npm run dev
   - **Visit http://localhost:3000 to view the project.**

# Features:

## User Features:

1. Product Browsing
   - Browse a list of products with clean UI.
   - View products by category.
   - Search functionality to quickly find desired products.
   - Skeleton loading for improved UX while fetching data.
2. Authentication
   - Secure login and signup using JWT (JSON Web Tokens).
   - User sessions are managed effectively.
3. Cart and Checkout
   - Add products to the cart.
   - Update quantities or remove items from the cart.
   - Simulate a checkout process with a fake payment gateway.
4. Static Pages
   - About Us: Learn about the store.
   - Contact Page: Static contact page with basic store details.

## Admin Features:

1. Admin Dashboard
   - A protected dashboard for admin users.
   - Add, edit, delete, and manage products seamlessly.
2. Admin Account Seeding
   - Admin account seeding for first-time setup.

# Tech Stack

- **Framework**: Next.js 15 (App Router).
- **State Management**: Redux & Redux Toolkit.
- **Authentication**: JWT (JSON Web Tokens).
- **Styling**: Bootstrap 5.
- **Backend Simulation**: Fake payment process and admin account seeding.

# Error Handling

Error responses and field validations are implemented to guide users through correct API usage.
