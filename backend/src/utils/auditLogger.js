const AuditLog = require(
  "../models/AuditLog"
);

const createAuditLog =
  async ({
    actor,
    action,
    entityType,
    entityId,
    details = {}
  }) => {

    await AuditLog.create({
      actor,
      action,
      entityType,
      entityId,
      details
    });

  };

module.exports = {
  createAuditLog
};