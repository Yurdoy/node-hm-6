import express from "express";

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res, next) => {
  try {
    res.send("World... hold on");
  } catch (error) {
    next(error);
  }
});

app.post("/", (req, res) => {
  try {
    const data = req.body;
    if (!data || Object.keys(data).length === 0) {
      return res.status(400).json({ error: "No data provided" });
    }
    res.status(200).json({ message: "Data received", data });
  } catch (error) {
    next(error);
  }
});

app.use((err, req, res, next) => {
  console.error("Error during request handling", err);
  res.status(500).send("Internal server error");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
