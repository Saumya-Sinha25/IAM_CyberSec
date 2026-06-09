const express = require("express");

const router = express.Router();

const protect = require(
  "../middleware/auth.middleware"
);

const {
  createRequest,
  getMyRequests,
  getRequestById
} = require(
  "../controllers/accessRequest.controller"
);

router.post(
  "/",
  protect,
  createRequest
);

router.get(
  "/my",
  protect,
  getMyRequests
);
router.get(
  "/:id",
  protect,
  getRequestById
);

module.exports = router;