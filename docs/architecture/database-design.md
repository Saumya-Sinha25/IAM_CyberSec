# Database Design

## Collections

### Users

| Field      | Type     |
| ---------- | -------- |
| _id        | ObjectId |
| name       | String   |
| email      | String   |
| password   | String   |
| role       | String   |
| department | String   |
| managerId  | ObjectId |

---

### Resources

| Field           | Type     |
| --------------- | -------- |
| _id             | ObjectId |
| name            | String   |
| description     | String   |
| riskLevel       | String   |
| ownerDepartment | String   |

---

### AccessRequests

| Field           | Type     |
| --------------- | -------- |
| _id             | ObjectId |
| requestedBy     | ObjectId |
| resourceId      | ObjectId |
| reason          | String   |
| status          | String   |
| managerApproval | Object   |
| adminApproval   | Object   |
| expiryDate      | Date     |

---

### AuditLogs

| Field      | Type     |
| ---------- | -------- |
| _id        | ObjectId |
| actor      | ObjectId |
| action     | String   |
| entityType | String   |
| entityId   | ObjectId |
| timestamp  | Date     |
