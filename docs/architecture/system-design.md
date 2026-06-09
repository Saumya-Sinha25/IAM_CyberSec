# AccessFlow System Design

## High-Level Architecture

```text
Client (Next.js)
        │
        ▼
REST API (Express.js)
        │
 ┌──────┼──────┐
 ▼      ▼      ▼
Auth  Workflow Audit
Svc    Svc     Svc
        │
        ▼
Notification Service
        │
        ▼
MongoDB
```

---

## Components

### Frontend

Responsibilities:

* Authentication
* Dashboard Rendering
* Request Management
* Approval Screens
* Reporting

Technology:

* Next.js
* TypeScript
* Tailwind CSS

---

### Backend API

Responsibilities:

* Authentication
* Authorization
* Validation
* Business Logic

Technology:

* Node.js
* Express.js

---

### Database

Responsibilities:

* User Data
* Access Requests
* Resources
* Audit Logs

Technology:

* MongoDB

---

### Notification Service

Responsibilities:

* Approval Notifications
* Rejection Notifications
* Expiry Alerts

Technology:

* Nodemailer

---

## Request Workflow

Employee
↓
Submit Request
↓
Manager Review
↓
Admin Review
↓
Approval/Rejection
↓
Audit Log Creation
↓
Notification Sent
