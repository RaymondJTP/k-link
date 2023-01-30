# Ecommerce simple API Documentation

## Execute first :

 - Run npm install on terminal
 - Buat .env dengan isinya adalah JWT_AUTH=*isisendiri*
 - Atur config db di folder config/config.json
 - Run db:create
 - Run db:migrate
 - Run db:seed:all
 - Lakukan register dengan role *admin* untuk dapat melakukan hit add new product karena hanya role admin yang dapat melakukan add product sedangkan role *user* tidak dapat melakukan itu.

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

_body_

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
```json
{
  "access_token" : "fill access token that you get from login session"
}
```


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

_Response (401 - Unauthorized)_

```json
{
    "message": "Please login first to access"
}
```

_Response (500 - Bad Request)_

```json
{
  "message": "Invalid"
}
```


## 4. POST /products

Description : Add new product to database
http://localhost:3000/products

Request:
_header_
```json
{
  "access_token" : "fill access token that you get from login session" //sring
}
```

_body_
```json
{
  "productName" : "Baju murah", //string
  "quantity" : 20, //integer
  "price" : 100000, //integer
  "description" : "Baju bagus dan murah" //string
}
```



_Response (200 - OK)_

```json
{
    "id": 11, //integer
    "productName": "baju mahal", //string
    "quantity": 20, //integer
    "price": 20000, //integer
    "description": "baju jelek tapi mahal", //string
    "updatedAt": "2023-01-30T12:54:51.379Z", //string date
    "createdAt": "2023-01-30T12:54:51.379Z" //string date
}

```

_Response (400 - Bad Request)_

```json
{
    "message": "Please input the form correctly"
}
```
_Response (401 - Unauthorized)_

```json
{
    "message": "Please login first to access"
}
```

_Response (403 - Forbidden)_

```json
{
    "message": "Only admin can access this feature"
}
```

_Response (500 - Bad Request)_

```json
{
  "message": "Invalid"
}
```

## 5. POST /products/:id

Description : Menambahkan data ke dalam cart
http://localhost:3000/products/:id

Request:
_params_
```json
{
  "id" : 9 //integer (id dari product)
}
```

_header_
```json
{
  "access_token" : "fill access token that you get from login session" //string
}
```

_body_
```json
{
  "quantity" : 5, //integer
}
```

_Response (200 - OK)_

```json
{
    "message": "Product with id 5 hse been added to your cart"
}
```

_Response (400 - Bad Request)_

```json
{
    "message": "Please input the form correctly"
}
```

_Response (401 - Unauthorized)_

```json
{
    "message": "Please login first to access"
}
```

_Response (404 - Not Found)_

```json
{
    "message": "Stock empty, stay tune for more updated stock!"
}
OR
{
    "message": "Product with id 9 is not found"
}

```

_Response (500 - Bad Request)_

```json
{
  "message": "Invalid"
}
```
## 6. POST /products/:id/payment

Description : Pay the product that already in your chart
http://localhost:3000/products/:id/payment

Request:
_params_
```json
{
  "id" : 9 //integer (id dari product)
}
```

_header_
```json
{
  "access_token" : "fill access token that you get from login session" //string
}
```

_body_
```json
{
  "payment" : 30000, //integer
}
```

_Response (200 - OK)_

```json
{
    "message": "Succes payment item with product id 9"
}
```

_Response (400 - Bad Request)_

```json
{
    "message": "Please input the form correctly"
}

OR

{
    "message": "Please compelete the payment with the exact amount"
}
```

_Response (401 - Unauthorized)_

```json
{
    "message": "Please login first to access"
}
```

_Response (404 - Not Found)_

```json
{
    "message": "There is no transaction with product number 9"
}

```

_Response (500 - Bad Request)_

```json
{
  "message": "Invalid"
}
```


## 6. GET /history

Description : Showing your transaction history
http://localhost:3000/history

Request:
_header_
```json
{
  "access_token" : "fill access token that you get from login session" //string
}
```

_body_
```json
{
  "payment" : 30000, //integer
}
```

_Response (200 - OK)_

```json
[
    {
        "id": 3,
        "userId": 5,
        "productId": 4,
        "quantity": 2,
        "totalAmount": 20000,
        "createdAt": "2023-01-29T17:46:45.126Z",
        "updatedAt": "2023-01-29T17:46:45.126Z",
        "Product": {
            "id": 4,
            "productName": "tes4",
            "quantity": 2,
            "price": 10000,
            "description": "tes data",
            "createdAt": "2023-01-29T09:24:55.330Z",
            "updatedAt": "2023-01-29T17:46:44.836Z"
        },
        "User": {
            "id": 5,
            "name": "Arfan",
            "email": "arfan@mail.com",
            "password": "$2a$10$d1v1fTqidL4WioxQ1feF6.zUoSoyWrcyuH6ILkAF2ZdpZQPlPDwGC",
            "address": "Bandung",
            "role": "user",
            "createdAt": "2023-01-29T17:42:23.424Z",
            "updatedAt": "2023-01-29T17:42:23.424Z"
        }
    }
]
```

_Response (401 - Unauthorized)_

```json
{
    "message": "Please login first to access"
}
```

_Response (404 - Not Found)_

```json
{
    "message": "You have not history payment yet"
}

```

_Response (500 - Bad Request)_

```json
{
  "message": "Invalid"
}
```