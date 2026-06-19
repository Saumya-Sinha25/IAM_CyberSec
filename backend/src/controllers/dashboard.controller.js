const Resource = require("../models/Resource");
const AccessRequest = require("../models/AccessRequest");

exports.getStats = async (req, res) => {
  try {
    const resources =
      await Resource.countDocuments();

    const myRequests =
      await AccessRequest.countDocuments({
        requestedBy: req.user.id,
      });

    const pendingManager =
      await AccessRequest.countDocuments({
        status: "PENDING_MANAGER",
      });

    const pendingAdmin =
      await AccessRequest.countDocuments({
        status: "PENDING_ADMIN",
      });

    const approved =
      await AccessRequest.countDocuments({
        status: "APPROVED",
      });

    const rejected =
      await AccessRequest.countDocuments({
        status: "REJECTED",
      });

    return res.json({
      success: true,
      stats: {
        resources,
        myRequests,
        pendingManager,
        pendingAdmin,
        approved,
        rejected,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};