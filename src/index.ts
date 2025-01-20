import express from "express";
import cors from "cors"; 
import bookRoutes from "./Model3/bookRoutes";

const app = express();


app.use(express.json());


app.use(
  cors({
    origin: "http://localhost:5173",
  })
);


app.use("/api", bookRoutes);


app.get("/", (req, res) => {
  res.send("Vítejte v API!");
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
