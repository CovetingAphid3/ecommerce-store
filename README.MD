
This application is a full-stack eCommerce solution designed to provide a seamless shopping experience. The backend is built using Go and PostgreSQL, while the frontend utilizes React with Tailwind CSS for styling.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication (login and registration)
- Product browsing with search and filtering capabilities
- Shopping cart functionality
- Responsive design with Tailwind CSS
- Dynamic routing with React Router

## Technologies Used

- **Backend**: 
  - Go (Golang)
  - PostgreSQL
  - Gin 
  
- **Frontend**: 
  - React
  - Tailwind CSS
  - React Router
  
## Getting Started

To get a local copy up and running, follow these steps:

### Backend Setup

1. Clone the backend repository:

   ```bash
   git clone https://github.com/CovetingAphid3/ecommerce-shop-backend.git
   ```

2. Navigate to the backend directory:

   ```bash
   cd ecommerce-shop-backend
   ```

3. Install dependencies:

   ```bash
   go mod tidy
   ```

4. Create a `.env` file to store your database connection string and other environment variables.

5. Run the database migrations to set up your PostgreSQL database.

6. Start the Go server:

   ```bash
   go run main.go
   ```

### Frontend Setup

1. Clone the frontend repository:

   ```bash
   git clone https://github.com/CovetingAphid3/ecommerce-shop.git
   ```

2. Navigate to the frontend directory:

   ```bash
   cd ecommerce-shop
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173` to view the application.

## Usage

- Use the **Shop** section to browse products.
- Add items to your cart and proceed to checkout.
- Explore various categories and discover new products.
- Contact us through the **Contact** page for any inquiries.

## Contributing

Contributions are welcome! If you have suggestions or improvements, please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


