# Task Management App 

description here (todo)

# User
Description here (todo)

---

## User Register
> POST 
    localhost:3456/users/register

#### **Body** raw (json)
    {
    "firstName": "Jon",
    "lastName": "Doe",
    "email": "user1@email.com",
    "password": "Secret@123",
    "role": "Employee"
    }


## User Login
> POST 
    localhost:3456/users/login

#### **Body** raw (json)
    {
    "email" : "user1@email.com",
    "password": "Secret@123"
    }


## User Account
> GET 
    localhost:3456/users/account

#### Request Headers

    Authorization : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MmU1OTY4OWMyYzQ4NGZmZTY5Nzk1YiIsInJvbGUiOiJFbXBsb3llZSIsImlhdCI6MTcxNDM4OTcyNSwiZXhwIjoxNzE0NDMyOTI1fQ.Yo0V21PUE1WirlzwLfm1IWKKMg6-SQQjp5j9iRZtj_k


## User Update
> GET 
    localhost:3456/users/update

#### Request Headers

    Authorization : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MmU1OTY4OWMyYzQ4NGZmZTY5Nzk1YiIsInJvbGUiOiJFbXBsb3llZSIsImlhdCI6MTcxNDM4OTcyNSwiZXhwIjoxNzE0NDMyOTI1fQ.Yo0V21PUE1WirlzwLfm1IWKKMg6-SQQjp5j9iRZtj_k

#### **Body** raw (json)
    {
        "firstName": "RN",
        "lastName": "Roshan",
        "email": "user1@email.com"
    }


## User Delete
> GET 
    localhost:3456/users/delete

#### Request Headers

    Authorization : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MmU1OTY4OWMyYzQ4NGZmZTY5Nzk1YiIsInJvbGUiOiJFbXBsb3llZSIsImlhdCI6MTcxNDM4OTcyNSwiZXhwIjoxNzE0NDMyOTI1fQ.Yo0V21PUE1WirlzwLfm1IWKKMg6-SQQjp5j9iRZtj_k



