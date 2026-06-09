const AuditLog = require(
  "../models/AuditLog"
);

exports.getAuditLogs =
  async (req, res) => {

    try {

      const logs =
        await AuditLog.find()
          .populate(
            "actor",
            "name email role"
          )
          .sort({
            createdAt: -1
          });

      return res.json({
        success: true,
        count: logs.length,
        logs
      });

    } catch (error) {

      return res.status(500).json({
        success: false
      });

    }

};