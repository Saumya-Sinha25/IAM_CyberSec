const Resource = require(
  "../models/Resource"
);
const {
  createAuditLog
} = require(
  "../services/audit.service"
);

exports.createResource = async (
  req,
  res
) => {
  try {

    const {
      name,
      description,
      riskLevel,
      ownerDepartment
    } = req.body;

    const existingResource =
      await Resource.findOne({ name });

    if (existingResource) {
      return res.status(400).json({
        success: false,
        message:
          "Resource already exists"
      });
    }

    const resource =
      await Resource.create({
        name,
        description,
        riskLevel,
        ownerDepartment
      });

    return res.status(201).json({
      success: true,
      resource
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error"
    });

  }
  await createAuditLog({
  actor: req.user.id,
  action: "RESOURCE_CREATED",
  entityType: "RESOURCE",
  entityId: resource._id
});
};



exports.getResources = async (
  req,
  res
) => {
  try {

    const resources =
      await Resource.find();

    return res.json({
      success: true,
      count: resources.length,
      resources
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error"
    });

  }
};