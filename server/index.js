require('dotenv').config()
const express = require("express"); 
const bodyParser = require("body-parser");
const v1TaskRouter = require("./v1/routes/taskRoutes");

const app = express(); 
const PORT = process.env.SERVER_PORT || 3000; 

app.use(bodyParser.json());
app.use("/api/v1/tasks", v1TaskRouter);

/* Error handler middleware */
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({ message: err.message });
    return;
  });

app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
});