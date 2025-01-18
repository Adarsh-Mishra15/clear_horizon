import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";


const app = express();

app.use(cors());

app.use(express.json()); // Limit JSON body size to 16KB
app.use(express.urlencoded({ extended: true})); // Limit URL-encoded data size to 16KB

app.use(express.static("public")); // Serve static assets from the "public" folder

app.use(cookieParser()); // Correctly call cookieParser middleware



// Routes declaration

//healthCheck route Declaration
import healthCheckRoutes from "./routes/healthcheck.routes.js"
app.use("/api/v1/healthcheck", healthCheckRoutes);

// user routes declaration
import userRoutes from "./routes/user.routes.js"
app.use("/api/v1/users", userRoutes);

// test routes declaration
import testRoutes from "./routes/test.routes.js"
app.use("/api/v1/tests", testRoutes);

// 

export default app;