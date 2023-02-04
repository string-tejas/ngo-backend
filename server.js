require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const errorHandler = require("./middleware/errorHandler");

const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");
const cookieParser = require("cookie-parser");
const credentials = require("./middleware/credentials");

const PORT = process.env.PORT || 5000;

// start point
connectDB();

// middlewares
app.use(credentials);
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// routing
// open routes
app.use("/", express.static(path.join(__dirname, "/public")));
app.use("/", require("./routes/root"));
app.use("/auth", require("./routes/auth"));
app.use("/admin", require("./routes/admin"));
app.use("/volunteer", require("./routes/volunteer"));
app.use("/student", require("./routes/student"));
app.use("/institute", require("./routes/institute"));

// protected routes

// page not found
app.all("*", (req, res) => {
    res.status(404);
    if (req.accepts("html")) {
        res.sendFile(path.join(__dirname, "views", "404.html"));
    } else if (req.accepts("json")) {
        res.json({ error: "404 Not Found" });
    } else {
        res.type("txt").send("404 Not Found");
    }
});
app.use(errorHandler);

// start server
mongoose.connection.once("open", () => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
