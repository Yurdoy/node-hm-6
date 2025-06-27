import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("World... hold on");
});

app.use((err, req, res, next) => {
  console.error("Error during request handling", err);
  res.status(500).send("Internal server error");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
