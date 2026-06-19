const AccessRequest = require("../models/AccessRequest");
const { createAuditLog } = require("../utils/auditLogger");

exports.getPendingAdminRequests = async (req, res) => {
  try {
    const requests = await AccessRequest.find({
      status: "PENDING_ADMIN",
    })
      .populate("requestedBy", "name email")
      .populate("resourceId", "name riskLevel");

    return res.json({
      success: true,
      count: requests.length,
      requests,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

exports.approveRequest = async (req, res) => {
  try {
    const request = await AccessRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Request not found",
      });
    }

    request.status = "APPROVED";

    await request.save();
    await createAuditLog({
      actor: req.user.id,
      action: "ADMIN_APPROVED",
      entityType: "AccessRequest",
      entityId: request._id,
      details: {
        status: "APPROVED",
      },
    });

    return res.json({
      success: true,
      message: "Request approved",
      request,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

exports.rejectRequest = async (req, res) => {
  try {
    const request = await AccessRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Request not found",
      });
    }
    if (request.status !== "PENDING_ADMIN") request.status = "REJECTED";

    await request.save();
    await createAuditLog({
      actor: req.user.id,
      action: "ADMIN_REJECTED",
      entityType: "AccessRequest",
      entityId: request._id,
    });

    return res.json({
      success: true,
      message: "Request rejected",
      request,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
