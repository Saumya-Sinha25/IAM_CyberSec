const AccessRequest = require(
  "../models/AccessRequest"
);

exports.getPendingRequests =
  async (req, res) => {
    try {

      const requests =
        await AccessRequest.find({
          status: "PENDING_MANAGER"
        })
          .populate(
            "requestedBy",
            "name email"
          )
          .populate(
            "resourceId",
            "name riskLevel"
          );

      return res.json({
        success: true,
        count: requests.length,
        requests
      });

    } catch (error) {

      console.error(error);

      return res.status(500).json({
        success: false,
        message: "Server Error"
      });

    }
  };

  exports.approveRequest = async (
  req,
  res
) => {

  try {

    const request =
      await AccessRequest.findById(
        req.params.id
      );

    if (!request) {
      return res.status(404).json({
        success: false,
        message:
          "Request not found"
      });
    }

    request.status =
      "PENDING_ADMIN";

    await request.save();
    await createAuditLog({
      actor: req.user.id,
      action: "MANAGER_APPROVED",
      entityType: "ACCESS_REQUEST",
      entityId: request._id
    });

    return res.json({
      success: true,
      message:
        "Request approved by manager",
      request
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message:
        "Server Error"
    });

  }
};

exports.rejectRequest = async (
  req,
  res
) => {

  try {

    const request =
      await AccessRequest.findById(
        req.params.id
      );

    if (!request) {
      return res.status(404).json({
        success: false,
        message:
          "Request not found"
      });
    }
    if (
      request.status !==
      "PENDING_MANAGER"
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Request cannot be approved"
      });
    }

    request.status =
      "REJECTED";

    await request.save();

    return res.json({
      success: true,
      message:
        "Request rejected",
      request
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message:
        "Server Error"
    });

  }
};