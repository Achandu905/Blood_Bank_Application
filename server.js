const express = require("express");
const app = express();
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");
const cors = require("cors");

// dotenv config
dotenv.config();

// middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`server runnig on port ${PORT} in ${process.env.DEV_MODE}`);
});

connectDB();

// Routes
app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/inventory", require("./routes/inventoryRoutes.js"));
app.use("/api/v1/analytics", require("./routes/analyticsRoutes.js"));
app.use("/api/v1/admin", require("./routes/adminRoutes.js"));
