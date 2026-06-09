const express = require("express");

const router = express.Router();

const protect = require(
  "../middleware/auth.middleware"
);

const authorize = require(
  "../middleware/rbac.middleware"
);

const {
  getPendingAdminRequests,
  approveRequest,
  rejectRequest
} = require(
  "../controllers/admin.controller"
);

router.get(
  "/requests",
  protect,
  authorize("ADMIN"),
  getPendingAdminRequests
);

router.put(
  "/approve/:id",
  protect,
  authorize("ADMIN"),
  approveRequest
);

router.put(
  "/reject/:id",
  protect,
  authorize("ADMIN"),
  rejectRequest
);

module.exports = router;