const express = require("express");

const router = express.Router();
const authorize = require(
  "../middleware/rbac.middleware"
);

const {
  register,
  login,
  getProfile,
  adminDashboard
} = require(
  "../controllers/auth.controller"
);

const protect = require(
  "../middleware/auth.middleware"
);

router.post(
  "/register",
  register
);

router.post(
  "/login",
  login
);

router.get(
  "/me",
  protect,
  getProfile
);



router.get(
  "/admin",
  protect,
  authorize("ADMIN"),
  adminDashboard
);
module.exports = router;