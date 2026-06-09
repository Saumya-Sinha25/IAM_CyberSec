const express = require("express");

const router = express.Router();

const {
  createResource,
  getResources
} = require(
  "../controllers/resource.controller"
);

const protect = require(
  "../middleware/auth.middleware"
);

const authorize = require(
  "../middleware/rbac.middleware"
);

router.get(
  "/",
  protect,
  getResources
);

router.post(
  "/",
  protect,
  authorize("ADMIN"),
  createResource
);

module.exports = router;