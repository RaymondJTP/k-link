# Ecommerce simple API Documentation

## Execute first :

 - Run npm install on terminal
 - Buat .env dengan isinya adalah JWT_AUTH=*isisendiri*
 - Atur config db di folder config/config.json
 - Run db:create
 - Run db:migrate
 - Run db:seed:all
 - Lakukan register dengan role admin untuk dapat melakukan hit add new product karena hanya role admin yang dapat melakukan add product sedangkan role user tidak dapat melakukan itu.

## Endpoints :

List of available endpoints:

- `POST /register`
- `POST /login`
- `GET /products`
- `POST /products`
- `POST /products/:id`
- `POST /products/:id/payment`
- `GET /history`


&nbsp;

## 1. POST /register

Description : Register user account
http://localhost:3000/register

_Request_

```json
{
  "name": "string",
  "email": "string",
  "password": "string",
  "role": "string",
  "address": "string"
}

```


_Response (200 - OK)_

```json
{
  "name": "string",
  "email": "string",
  "password": "string",
  "role": "string",
  "address": "string"
}

```

_Response (400 - Bad Request)_

```json
{
  "message" : "please fill email and password"
}
{
    "message": "email has been registered, please try login"
}
```

_Response (500 - Internal Server Eror)_

```json
{
  "message" : "Validation error"
}
{
  "message": "Invalid Server error"
}
```

## 2. POST /login

Description : Login user
http://localhost:3000/login

_Request_

```json
{
  "email": "string",
  "password": "string",
}

```

_Response (200 - OK)_

```json
{
    "message": "string",
    "access_token": "string",
    "user": {
        "id": "integer",
        "name": "string",
        "email": "string",
        "password": "string",
        "address": "string",
        "role": "string",
        "createdAt": "string",
        "updatedAt": "string"
    }
}

```

_Response (400 - Bad Request)_

```json
{
    "message": "Your email or password is invalid"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message" : "Validation error"
}
{
  "message": "Invalid Server error"
}
```

## 3. GET /products

Description : Get All Products from database
http://localhost:3000/products

Request:
_header_


_Response (200 - OK)_

```json
[
  {
    "id": 1,
    "name": "Baju",
    "description": "Baju ini baju murah",
    "price": 15000,
    "CategoryId": 1,
    "AuthorId": 2,
    "createdAt" : "2021-10-25 20:04:54.579 +0700",
    "updatedAt" : "2021-10-25 20:04:54.579 +0700"
  },
  {
    "id": 2,
    "name": "Celana",
    "description": "Celana ini baju murah",
    "price": 50000,
    "CategoryId": 2,
    "AuthorId": ,
    "createdAt" : "2021-10-25 20:04:54.579 +0700",
    "updatedAt" : "2021-10-25 20:04:54.579 +0700"
  }
  ...,
]

```

_Response (500 - Bad Request)_

```json
{
  "message": "Invalid"
}
```
