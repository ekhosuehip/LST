# 💰 Finable Banking API

Welcome to the **Finable Banking API**, a simple, educational banking API built for learning how to handle encryption, secure user data, and basic banking logic in a Node.js/Express environment.

This project simulates user registration, account creation, data encryption/decryption, and retrieval of account details.

---

## 🚀 Features

- User signup with data
- Automatic account and card number generation
- Encrypted storage for phone numbers, dates of birth, card numbers, CVVs, and expiry dates
- Decryption endpoint for testing and development
- Easy-to-use and documented API endpoints

---

## 📚 API Documentation

View full API docs here:  
🔗 [Finable Banking API Postman Docs](https://documenter.getpostman.com/view/42833912/2sB2qcCg7s)

---

## 🛠️ Technologies Used

- **Node.js** + **Express** – API server
- **MongoDB** – Database
- **Joi** – Input validation
- **Custom encryption utility** – For secure field handling
- **Postman** – For documentation and testing

---

## 🧪 Sample Endpoints

### 🔐 Signup  
`POST /api/v1/signup`  
Registers a user and generates encrypted banking data.

### 📄 List All Accounts  
`GET /api/v2/accounts`  
Fetches all created user accounts with both encrypted and decrypted fields.

### 🔓 Decrypt Data  
`POST /api/v2/decrypt`  
Decrypts sensitive fields provided in request body.