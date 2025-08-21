# dailyfind-frontend

## Introduction

DailyFind is an e-commerce application that allows users to buy and sell shopping items.
This is the back-end side of this application.

## Technologies

* Node.js
* bcrypt.js
* Express.js
* morgan
* dotenv
* MongoDB
* mongoose
* cloudinary
* jwt

## Getting Started

Fork this repository and follow these steps to run the site:

* install the packages: npm install
* add the .env file and write this with your details:

```
DB_URI= MongoDB url
SECRET= a random secret keyword
CLOUDNAME= cloudinary cloudname
APIKEY= cloudinary api key
APISECRET= cloudinary api secret
```
* then run it ```npm run dev```

## API Routes

### baseUrl: "http://localhost:3000"

### /auth

| Method | Path          | Description            |
|--------|---------------|------------------------|
| POST   | `/signup`        | Create new user        |
| POST   | `/login`        | login user        |
| GET    | `/user/:userId`      | get user information      |
| POST    | `/user/:userId`  | set user information  |
| GET    | `/addmoney/:userId`  |  add money to user balance    |
| POST    | `/shoppingcart`  |  update shopping cart for user   |
| GET    | `/shoppingcart`  |  get shopping cart for user    |

### /shoppingItems

| Method | Path          | Description            |
|--------|---------------|------------------------|
| POST   | `/`        | create a shopping item        |
| GET    | `/`      |   get all shopping items      |
| GET   | `/:ShoppingItemId`        | get shopping item by id        |
| PUT    | `/:ShoppingItemId`  | update shopping item  |
| DELETE    | `/:ShoppingItemId`  | delete shopping item  |
| POST    | `/uploadImage`  |  uploads a list of images to cloudinary, and returns the images links  |
| POST    | `/addReview/:ShoppingItemId`  |  uploads a list of images to cloudinary, and returns the images links  |
