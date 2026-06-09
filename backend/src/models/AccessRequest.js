const mongoose = require("mongoose");

const accessRequestSchema =
  new mongoose.Schema(
    {
      requestedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
      },

      resourceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Resource",
        required: true
      },

      reason: {
        type: String,
        required: true
      },

      status: {
        type: String,
        enum: [
          "PENDING_MANAGER",
          "PENDING_ADMIN",
          "APPROVED",
          "REJECTED"
        ],
        default: "PENDING_MANAGER"
      },

      managerComment: String,

      adminComment: String
    },
    {
      timestamps: true
    }
  );

module.exports =
  mongoose.model(
    "AccessRequest",
    accessRequestSchema
  );