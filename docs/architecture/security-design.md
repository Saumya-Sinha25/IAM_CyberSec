# Security Design

## Authentication

Method:

JWT Authentication

Process:

1. User Login
2. Credentials Validation
3. JWT Generation
4. Token Verification

---

## Password Security

Algorithm:

bcrypt

Requirements:

* Minimum 8 characters
* Strong password policy

---

## Authorization

RBAC Model

Roles:

EMPLOYEE

MANAGER

ADMIN

---

## Audit Logging

Every sensitive action must be logged.

Examples:

LOGIN

LOGOUT

REQUEST_CREATED

REQUEST_APPROVED

REQUEST_REJECTED

USER_CREATED

RESOURCE_CREATED

---

## API Security

* Input Validation
* Rate Limiting
* Helmet Middleware
* CORS Restrictions
