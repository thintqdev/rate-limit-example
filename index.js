const express = require("express");
const app = express();
const port = 3000;
const indexRoute = require("./router");
const rateLimit = require("express-rate-limit");


app.use(
  rateLimit({
    windowMs: 30 * 1000,
    max: 5,
    message: "You exceeded 5 requests in 30 seconds limit!",
    headers: true,
  })
);

app.use("/products", indexRoute);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});