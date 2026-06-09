
require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./src/config/db");
const authRoutes = require("./src/routes/auth.routes");
const resourceRoutes = require(
  "./src/routes/resource.routes"
);
const accessRequestRoutes =
  require(
    "./src/routes/accessRequest.routes"
  );
const managerRoutes = require(
  "./src/routes/manager.routes"
);

const adminRoutes = require(
  "./src/routes/admin.routes"
);

const auditRoutes =
  require(
    "./src/routes/audit.routes"
  );


const app = express();


connectDB();


app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/resources", resourceRoutes);
app.use(
  "/api/requests",
  accessRequestRoutes
);
app.use(
  "/api/manager",
  managerRoutes
);

app.use(
  "/api/admin",
  adminRoutes
);

app.use(
  "/api/audit",
  auditRoutes
);



app.get("/", (req, res) => {
  res.json({
    message: "AccessFlow API Running"
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});



