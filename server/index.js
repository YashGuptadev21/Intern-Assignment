const express = require("express");
const cors = require("cors");
const gsdpRoutes = require("./routes/gsdp");
const tagRoutes = require("./routes/tags");
const morgan = require("morgan");
const dbConnection = require("./db/connect");
const app = express();
const PORT = 3000;

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/data/gsdp", gsdpRoutes);
app.use("/api/tags", tagRoutes);
dbConnection();

app.get("/", (req, res) => {
  res.send("Server is working");
});
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on localhost ${PORT}`);
});
