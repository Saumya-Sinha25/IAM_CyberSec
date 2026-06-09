const express = require("express");

const router = express.Router();

const protect = require(
  "../middleware/auth.middleware"
);

const authorize = require(
  "../middleware/rbac.middleware"
);

const {
  getPendingRequests,
  approveRequest,
  rejectRequest
} = require(
  "../controllers/manager.controller"
);

router.get(
  "/requests",
  protect,
  authorize("MANAGER", "ADMIN"),
  getPendingRequests
);
router.put(
  "/approve/:id",
  protect,
  authorize("MANAGER", "ADMIN"),
  approveRequest
);

router.put(
  "/reject/:id",
  protect,
  authorize("MANAGER", "ADMIN"),
  rejectRequest
);

module.exports = router;