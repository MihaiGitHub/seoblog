// bring in all the packages
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

// bring routes
const blogRoutes = require("./routes/blog");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const tagRoutes = require("./routes/tag");
const formRoutes = require("./routes/form");

// create app
const app = express();

// avoid cors error in development; only for browser to browser communication, not postman etc
if (process.env.NODE_ENV == "development") {
  app.use(cors({ origin: `${process.env.CLIENT_URL}` }));
}

// connect to db
mongoose
  .connect(process.env.DATABASE_CLOUD, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("DB Connected"));

// add middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());

// routes middleware
app.use("/api", blogRoutes);
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", tagRoutes);
app.use("/api", formRoutes);

// use environment port
const port = process.env.PORT || 8000;

// run app
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
