# Hydrogen Project

Welcome to your Hydrogen project! This repository contains a Shopify Hydrogen storefront, a framework for building custom storefronts using React and Shopify's APIs.

## Getting Started

To set up and run this project locally, follow these steps:

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 16 or higher is recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/RaphaelLima123/artic-grey-hydrogen
   cd artic-grey-hydrogen
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file:
   Copy the provided `.env.example` file and update the variables with your Shopify store's credentials:
   ```bash
   cp .env.example .env
   ```
   Fill in the `.env` file with the required information.

   Example `.env` file:
   ```env
   SESSION_SECRET="foobar"
   PUBLIC_STOREFRONT_API_TOKEN="PUBLIC_STOREFRONT_API_TOKEN"
   PRIVATE_STOREFRONT_API_TOKEN="PRIVATE_STOREFRONT_API_TOKEN"
   PUBLIC_STORE_DOMAIN="example.myshopify.com"
   PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID="PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID"
   PUBLIC_STOREFRONT_API_VERSION="2023-04"
   SHOP_ID=12345678
   ```

### Running the Development Server

Start the development server with the following command:
```bash
npm run dev
```

This will start the server, and you can access the storefront in your browser at `http://localhost:3000`.

## Project Structure

- **`/src`**: Contains the application code, including components, pages, and utilities.
- **`.env.example`**: An example environment variables file for setting up the `.env` file.

## Environment Variables

The `.env` file should include the following variables:

```env
SESSION_SECRET="foobar"
PUBLIC_STOREFRONT_API_TOKEN="PUBLIC_STOREFRONT_API_TOKEN"
PRIVATE_STOREFRONT_API_TOKEN="PRIVATE_STOREFRONT_API_TOKEN"
PUBLIC_STORE_DOMAIN="example.myshopify.com"
PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID="PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID"
PUBLIC_STOREFRONT_API_VERSION="2023-04"
SHOP_ID=12345678
```

Replace the placeholder values with your Shopify store's details.

## Additional Scripts

- **`npm run build`**: Builds the application for production.
- **`npm run start`**: Starts the production server after building.
- **`npm run lint`**: Runs linting to ensure code quality.

## Contributing

Feel free to fork the repository and submit pull requests to contribute to this project.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
