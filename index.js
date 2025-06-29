import express from "express";
import connection from "./db.js";

const app = express();
const port = 3000;

app.use(express.json());

app.get("/products", async (req, res) => {
  const query = "SELECT * FROM products";

  connection.query(query, (error, results) => {
    if (error) {
      console.error("Error fetching products:", err.stack);
      res.status(500).send("Error fetching products");
      return;
    }
    res.json(results);
  });
});

app.post("/products", async (req, res) => {
  const { name, price } = req.body;
  const query = "INSERT INTO products (name, price) VALUES (?, ?)";

  connection.query(query, [name, price], (err, result) => {
    if (err) {
      console.error("Error adding product:", err.stack);
      res.status(500).send("Error adding product");
      return;
    }
    res.status(201).send("Product added successfully");
  });
});

app.use((err, req, res, next) => {
  console.error("Error during request handling", err);
  res.status(500).send("Internal server error");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
