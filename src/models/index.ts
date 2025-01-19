import express from "express";
import cors from "cors"; // Import cors middleware
import bookRoutes from "./bookRoutes";

const app = express();

// Middleware
app.use(express.json());

// Enable CORS
app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests from your frontend
  })
);

// Routes
app.use("/api", bookRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to the Library API");
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
