# API Specification

Base URL

/api

---

## Authentication

### Register

POST /auth/register

Request

{
"name":"John",
"email":"[john@example.com](mailto:john@example.com)",
"password":"password123"
}

Response

201 Created

---

### Login

POST /auth/login

Request

{
"email":"[john@example.com](mailto:john@example.com)",
"password":"password123"
}

Response

{
"token":"jwt_token"
}

---

## Resources

### Get Resources

GET /resources

Response

[
{
"name":"VPN"
}
]

---

### Create Resource

POST /resources

Admin Only

---

## Access Requests

### Create Request

POST /requests

Request

{
"resourceId":"123",
"reason":"Need access for deployment"
}

---

### Get My Requests

GET /requests/me

---

## Manager

### Approve Request

PUT /manager/approve/:id

---

### Reject Request

PUT /manager/reject/:id

---

## Admin

### Final Approve

PUT /admin/approve/:id

---

### Final Reject

PUT /admin/reject/:id
