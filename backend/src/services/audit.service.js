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

    try {

      await AuditLog.create({
        actor,
        action,
        entityType,
        entityId,
        details
      });

    } catch (error) {

      console.error(
        "Audit Log Error:",
        error
      );

    }

};

module.exports = {
  createAuditLog
};