const express = require("express");

const router = express.Router();

const protect = require(
  "../middleware/auth.middleware"
);

const authorize = require(
  "../middleware/rbac.middleware"
);

const {
  getAuditLogs
} = require(
  "../controllers/audit.controller"
);

router.get(
  "/",
  protect,
  authorize("ADMIN"),
  getAuditLogs
);

module.exports = router;