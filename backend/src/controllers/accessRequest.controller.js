const AccessRequest = require(
  "../models/AccessRequest"
);

const Resource = require(
  "../models/Resource"
);

exports.createRequest =
  async (req, res) => {
    try {

      const {
        resourceId,
        reason
      } = req.body;

      const resource =
        await Resource.findById(
          resourceId
        );

      if (!resource) {
        return res.status(404).json({
          success: false,
          message:
            "Resource not found"
        });
      }

      const request =
        await AccessRequest.create({
          requestedBy:
            req.user.id,

          resourceId,

          reason
        });
        // await createAuditLog({
        //   actor: req.user.id,
        //   action: "ACCESS_REQUEST_CREATED",
        //   entityType: "ACCESS_REQUEST",
        //   entityId: request._id
        // });

      return res.status(201).json({
        success: true,
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
  
    exports.getMyRequests = async (req, res) => {

    try {

      const requests =
        await AccessRequest.find({
          requestedBy:
            req.user.id
        })
          .populate("resourceId");

      return res.json({
        success: true,
        count:
          requests.length,
        requests
      });

    } catch (error) {

      return res.status(500).json({
        success: false
      });

    }

    };
  
    exports.getRequestById = async (
  req,
  res
) => {
  try {

    const request =
      await AccessRequest.findById(
        req.params.id
      )
      .populate(
        "requestedBy",
        "name email"
      )
      .populate(
        "resourceId"
      );

    return res.json({
      success: true,
      request
    });

  } catch (error) {

    return res.status(500).json({
      success: false
    });

  }
};